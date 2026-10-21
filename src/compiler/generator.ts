import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

export type DiagnosticSeverity = 'error' | 'warning';

export interface GeneratorDiagnostic {
  severity: DiagnosticSeverity;
  message: string;
  file?: string;
  line?: number;
  character?: number;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GenerateResult {
  files: GeneratedFile[];
  diagnostics: GeneratorDiagnostic[];
  emitted: boolean;
}

export interface GenerateTypeGuardsOptions {
  entrypoints: string[];
  outputPath?: string;
  emit?: boolean;
  compilerOptions?: ts.CompilerOptions;
}

interface DeclarationInfo {
  name: string;
  node: ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.EnumDeclaration;
  sourceFile: ts.SourceFile;
}

class GeneratorContext {
  readonly diagnostics: GeneratorDiagnostic[] = [];
  readonly declarations = new Map<string, DeclarationInfo>();
  readonly emitted = new Set<string>();
  readonly output: string[] = [];
  readonly imports = new Map<string, Set<string>>();

  constructor(
    readonly program: ts.Program,
    readonly checker: ts.TypeChecker,
    readonly outputPath: string,
  ) {}

  addDiagnostic(diagnostic: GeneratorDiagnostic) {
    this.diagnostics.push(diagnostic);
  }

  addImport(name: string, sourceFileName: string) {
    const specifier = getImportSpecifier(this.outputPath, sourceFileName);
    const names = this.imports.get(specifier) ?? new Set<string>();
    names.add(name);
    this.imports.set(specifier, names);
  }
}

const defaultCompilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.CommonJS,
  strict: true,
  esModuleInterop: true,
  skipLibCheck: true,
};

export function generateTypeGuards(
  options: GenerateTypeGuardsOptions,
): GenerateResult {
  const outputPath = path.resolve(options.outputPath ?? 'out/typeGuards.ts');
  const compilerOptions = {
    ...defaultCompilerOptions,
    ...options.compilerOptions,
  };
  const program = ts.createProgram(options.entrypoints, compilerOptions);
  const checker = program.getTypeChecker();
  const context = new GeneratorContext(program, checker, outputPath);

  collectDeclarations(program, context);

  const entrypointFiles = new Set(
    options.entrypoints.map(entrypoint => path.resolve(entrypoint)),
  );

  for (const sourceFile of program.getSourceFiles()) {
    if (isExternalSourceFile(sourceFile)) continue;
    if (!entrypointFiles.has(path.resolve(sourceFile.fileName))) continue;

    for (const statement of sourceFile.statements) {
      if (!isSupportedDeclaration(statement)) continue;
      if (!isExported(statement)) continue;

      const name = statement.name.text;
      context.addImport(name, sourceFile.fileName);
      ensureDeclaration(name, context);
    }
  }

  const content = renderModule(context);
  const file: GeneratedFile = { path: outputPath, content };

  if (options.emit ?? false) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, content, 'utf8');
  }

  return {
    files: [file],
    diagnostics: context.diagnostics,
    emitted: options.emit ?? false,
  };
}

function collectDeclarations(
  program: ts.Program,
  context: GeneratorContext,
): void {
  for (const sourceFile of program.getSourceFiles()) {
    if (isExternalSourceFile(sourceFile)) continue;

    for (const statement of sourceFile.statements) {
      if (!isSupportedDeclaration(statement)) continue;

      const name = statement.name.text;
      const existing = context.declarations.get(name);

      if (existing && existing.node !== statement) {
        context.addDiagnostic({
          severity: 'error',
          message: `Duplicate declaration name "${name}"; type guard generation is ambiguous.`,
          file: sourceFile.fileName,
          line: sourceFile.getLineAndCharacterOfPosition(statement.getStart()).line + 1,
          character: sourceFile.getLineAndCharacterOfPosition(statement.getStart()).character + 1,
        });
        continue;
      }

      context.declarations.set(name, {
        name,
        node: statement,
        sourceFile,
      });
    }
  }
}

function ensureDeclaration(name: string, context: GeneratorContext): string {
  const functionName = getGuardFunctionName(name);

  if (context.emitted.has(name)) return functionName;

  const declaration = context.declarations.get(name);
  if (!declaration) {
    context.addDiagnostic({
      severity: 'error',
      message: `Cannot resolve type reference "${name}".`,
    });
    return functionName;
  }

  context.emitted.add(name);
  context.addImport(name, declaration.sourceFile.fileName);

  if (ts.isInterfaceDeclaration(declaration.node)) {
    generateInterfaceGuard(declaration.node, context);
  } else if (ts.isTypeAliasDeclaration(declaration.node)) {
    generateTypeAliasGuard(declaration.node, context);
  } else if (ts.isEnumDeclaration(declaration.node)) {
    generateEnumGuard(declaration.node, context);
  }

  return functionName;
}

function generateInterfaceGuard(
  node: ts.InterfaceDeclaration,
  context: GeneratorContext,
): void {
  const name = node.name.text;

  if (node.typeParameters?.length) {
    addUnsupportedDiagnostic(node, `Generic interface "${name}"`, context);
    return;
  }

  const conditions: string[] = ['__isObjectValue(value)'];

  for (const heritageClause of node.heritageClauses ?? []) {
    for (const heritageType of heritageClause.types) {
      conditions.push(
        typeExpression(heritageType, 'value', context),
      );
    }
  }

  for (const member of node.members) {
    if (!ts.isPropertySignature(member)) {
      addUnsupportedDiagnostic(member, 'Interface member', context);
      continue;
    }

    if (member.name.kind === ts.SyntaxKind.ComputedPropertyName) {
      addUnsupportedDiagnostic(member, 'Computed property name', context);
      continue;
    }

    if (!member.type) {
      addUnsupportedDiagnostic(member, 'Property without a type', context);
      continue;
    }

    const propertyName = member.name.getText();
    const propertyKey = JSON.stringify(propertyName);
    const propertyAccessor = `value[${propertyKey}]`;
    const propertyExpression = typeExpression(
      member.type,
      propertyAccessor,
      context,
    );

    conditions.push(`__hasOwn(value, ${propertyKey})`);

    if (member.questionToken) {
      conditions.pop();
      conditions.push(
        `(!__hasOwn(value, ${propertyKey}) || ${propertyExpression})`,
      );
    } else {
      conditions.push(propertyExpression);
    }
  }

  emitGuardFunction(name, conditions, context);
}

function generateTypeAliasGuard(
  node: ts.TypeAliasDeclaration,
  context: GeneratorContext,
): void {
  const name = node.name.text;

  if (node.typeParameters?.length) {
    addUnsupportedDiagnostic(node, `Generic type alias "${name}"`, context);
    return;
  }

  emitGuardFunction(name, [typeExpression(node.type, 'value', context)], context);
}

function generateEnumGuard(
  node: ts.EnumDeclaration,
  context: GeneratorContext,
): void {
  const name = node.name.text;
  const expression = `(Object.values(${name}) as unknown[]).includes(value)`;

  context.output.push(
    `export function ${getGuardFunctionName(name)}(value: unknown): value is ${name} {`,
    `  return ${expression};`,
    '}',
    '',
  );
}

function emitGuardFunction(
  typeName: string,
  conditions: string[],
  context: GeneratorContext,
): void {
  const functionName = getGuardFunctionName(typeName);
  const body = conditions.length ? conditions.join(' &&\n    ') : 'true';

  context.output.push(
    `export function ${functionName}(value: unknown): value is ${typeName} {`,
    '  return (',
    `    ${body},`,
    '  );',
    '}',
    '',
  );
}

function typeExpression(
  node: ts.TypeNode,
  accessor: string,
  context: GeneratorContext,
): string {
  if (ts.isKeywordTypeNode(node)) {
    return keywordExpression(node.kind, accessor);
  }

  if (ts.isLiteralTypeNode(node)) {
    return literalExpression(node, accessor, context);
  }

  if (ts.isUnionTypeNode(node)) {
    return `(${node.types
      .map(member => typeExpression(member, accessor, context))
      .join(' || ')})`;
  }

  if (ts.isIntersectionTypeNode(node)) {
    return `(${node.types
      .map(member => typeExpression(member, accessor, context))
      .join(' && ')})`;
  }

  if (ts.isArrayTypeNode(node)) {
    const itemExpression = typeExpression(node.elementType, 'item', context);
    return `(Array.isArray(${accessor}) && ${accessor}.every((item) => (${itemExpression})))`;
  }

  if (ts.isTupleTypeNode(node)) {
    if (node.elements.some(element => ts.isOptionalTypeNode(element) || ts.isRestTypeNode(element))) {
      addUnsupportedDiagnostic(node, 'Tuple with optional or rest elements', context);
      return 'false';
    }

    const elementExpressions = node.elements.map((element, index) =>
      typeExpression(element, `${accessor}[${index}]`, context),
    );

    return `(Array.isArray(${accessor}) && ${accessor}.length === ${node.elements.length} && ${elementExpressions.join(' && ')})`;
  }

  if (ts.isTypeLiteralNode(node)) {
    const conditions: string[] = [`__isObjectValue(${accessor})`];

    for (const member of node.members) {
      if (!ts.isPropertySignature(member) || !member.type) {
        addUnsupportedDiagnostic(member, 'Object literal member', context);
        continue;
      }

      const propertyName = member.name.getText();
      const propertyKey = JSON.stringify(propertyName);
      const propertyAccessor = `${accessor}[${propertyKey}]`;
      const propertyExpression = typeExpression(
        member.type,
        propertyAccessor,
        context,
      );

      if (member.questionToken) {
        conditions.push(
          `(!__hasOwn(${accessor}, ${propertyKey}) || ${propertyExpression})`,
        );
      } else {
        conditions.push(`__hasOwn(${accessor}, ${propertyKey})`);
        conditions.push(propertyExpression);
      }
    }

    return `(${conditions.join(' && ')})`;
  }

  if (ts.isParenthesizedTypeNode(node)) {
    return typeExpression(node.type, accessor, context);
  }

  if (ts.isTypeReferenceNode(node)) {
    return typeReferenceExpression(node, accessor, context);
  }

  addUnsupportedDiagnostic(node, `Type construct "${ts.SyntaxKind[node.kind]}"`, context);
  return 'false';
}

function typeReferenceExpression(
  node: ts.TypeReferenceNode,
  accessor: string,
  context: GeneratorContext,
): string {
  if (!ts.isIdentifier(node.typeName)) {
    addUnsupportedDiagnostic(node, 'Qualified type reference', context);
    return 'false';
  }

  const typeName = node.typeName.text;

  if (typeName === 'Array' && node.typeArguments?.length === 1) {
    const itemExpression = typeExpression(
      node.typeArguments[0],
      'item',
      context,
    );
    return `(Array.isArray(${accessor}) && ${accessor}.every((item) => (${itemExpression})))`;
  }

  if (node.typeArguments?.length) {
    addUnsupportedDiagnostic(node, `Generic type reference "${typeName}"`, context);
    return 'false';
  }

  if (typeName === 'Date') {
    return `(${accessor} instanceof Date)`;
  }

  if (typeName === 'RegExp') {
    return `(${accessor} instanceof RegExp)`;
  }

  if (context.declarations.has(typeName)) {
    return `${ensureDeclaration(typeName, context)}(${accessor})`;
  }

  addUnsupportedDiagnostic(node, `Unresolved type reference "${typeName}"`, context);
  return 'false';
}

function keywordExpression(kind: ts.SyntaxKind, accessor: string): string {
  switch (kind) {
    case ts.SyntaxKind.StringKeyword:
      return `typeof ${accessor} === 'string'`;
    case ts.SyntaxKind.NumberKeyword:
      return `typeof ${accessor} === 'number'`;
    case ts.SyntaxKind.BooleanKeyword:
      return `typeof ${accessor} === 'boolean'`;
    case ts.SyntaxKind.BigIntKeyword:
      return `typeof ${accessor} === 'bigint'`;
    case ts.SyntaxKind.SymbolKeyword:
      return `typeof ${accessor} === 'symbol'`;
    case ts.SyntaxKind.UndefinedKeyword:
      return `${accessor} === undefined`;
    case ts.SyntaxKind.NullKeyword:
      return `${accessor} === null`;
    case ts.SyntaxKind.ObjectKeyword:
      return `__isObjectValue(${accessor})`;
    case ts.SyntaxKind.AnyKeyword:
    case ts.SyntaxKind.UnknownKeyword:
      return 'true';
    case ts.SyntaxKind.NeverKeyword:
      return 'false';
    default:
      return 'false';
  }
}

function literalExpression(
  node: ts.LiteralTypeNode,
  accessor: string,
  context: GeneratorContext,
): string {
  const literal = node.literal;

  if (
    ts.isStringLiteral(literal) ||
    ts.isNumericLiteral(literal) ||
    ts.isBigIntLiteral(literal) ||
    ts.isLiteralTypeNode(literal)
  ) {
    return `${accessor} === ${literal.getText()}`;
  }

  if (literal.kind === ts.SyntaxKind.TrueKeyword) {
    return `${accessor} === true`;
  }

  if (literal.kind === ts.SyntaxKind.FalseKeyword) {
    return `${accessor} === false`;
  }

  if (literal.kind === ts.SyntaxKind.NullKeyword) {
    return `${accessor} === null`;
  }

  if (
    ts.isPrefixUnaryExpression(literal) &&
    literal.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(literal.operand)
  ) {
    return `${accessor} === -${literal.operand.text}`;
  }

  addUnsupportedDiagnostic(node, 'Literal type', context);
  return 'false';
}

function renderModule(context: GeneratorContext): string {
  const importLines = [...context.imports.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([specifier, names]) => {
      const sortedNames = [...names].sort().join(', ');
      return `import type { ${sortedNames} } from '${specifier}';`;
    });

  return [
    '// Generated by ts-gen-typeguards. Do not edit.',
    '',
    ...importLines,
    importLines.length ? '' : null,
    'function __hasOwn(value: object, key: string): boolean {',
    '  return Object.prototype.hasOwnProperty.call(value, key);',
    '}',
    '',
    'function __isObjectValue(value: unknown): value is Record<string, unknown> {',
    '  return typeof value === \'object\' && value !== null;',
    '}',
    '',
    ...context.output,
  ]
    .filter(line => line !== null)
    .join('\n');
}

function getGuardFunctionName(typeName: string): string {
  return `is${typeName.charAt(0).toUpperCase()}${typeName.slice(1)}`;
}

function getImportSpecifier(outputPath: string, sourceFileName: string): string {
  const directory = path.dirname(outputPath);
  const withoutExtension = sourceFileName.replace(/\.tsx?$/, '');
  const relativePath = path
    .relative(directory, withoutExtension)
    .split(path.sep)
    .join('/');

  return relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
}

function isSupportedDeclaration(
  statement: ts.Statement,
): statement is ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.EnumDeclaration {
  return (
    ts.isInterfaceDeclaration(statement) ||
    ts.isTypeAliasDeclaration(statement) ||
    ts.isEnumDeclaration(statement)
  );
}

function isExported(statement: ts.Statement): boolean {
  return (
    (ts.getCombinedModifierFlags(statement) & ts.ModifierFlags.Export) !== 0
  );
}

function isExternalSourceFile(sourceFile: ts.SourceFile): boolean {
  return (
    sourceFile.isDeclarationFile ||
    sourceFile.fileName.includes('node_modules') ||
    sourceFile.fileName.includes('/lib.')
  );
}

function addUnsupportedDiagnostic(
  node: ts.Node,
  subject: string,
  context: GeneratorContext,
): void {
  const sourceFile = node.getSourceFile();
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(
    node.getStart(),
  );

  context.addDiagnostic({
    severity: 'error',
    message: `${subject} is not supported.`,
    file: sourceFile.fileName,
    line: line + 1,
    character: character + 1,
  });
}
