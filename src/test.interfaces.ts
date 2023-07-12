import * as ts from 'typescript';
import * as fs from 'fs';

const printer: ts.Printer = ts.createPrinter();

// Path to your source file
const sourceFilePath = './data.ts';

// Create a Program instance from the source file
const program = ts.createProgram([sourceFilePath], {});
const sourceFile = program.getSourceFile(sourceFilePath);

// Generate type guard for an interface
//TODO: add recursive search and reference
function generateInterfaceTypeGuard(interfaceNode: ts.InterfaceDeclaration): string {
    const interfaceName = interfaceNode.name.text;
    const properties = interfaceNode.members.filter(ts.isPropertySignature);

    const typeGuardCode = `
    export function is${interfaceName}(value: any): value is ${interfaceName} {
      if (typeof value !== 'object' || value === null) {
        return false;
      }

      ${properties
        .map((property) => {
            if (ts.isIdentifier(property.name)) {
                return `
              if (!value.hasOwnProperty('${property.name.text}') || typeof value.${property.name.text} !== '${getTypeString(property.type)}') {
                return false;
              }
            `;
            } else if (ts.isStringLiteral(property.name)) {
                return `
              if (!value.hasOwnProperty('${property.name.text}') || typeof value['${property.name.text}'] !== '${getTypeString(property.type)}') {
                return false;
              }
            `;
            } else {
                // Computed property name
                return `
              const propName = ${printer.printNode(ts.EmitHint.Unspecified, property.name, sourceFile)};
              if (!value.hasOwnProperty(propName) || typeof value[propName] !== '${getTypeString(property.type)}') {
                return false;
              }
            `;
            }
        })
        .join('')}

      return true;
    }
  `;
    return typeGuardCode;
}


// Generate type guard for a type
//TODO: update
function generateTypeTypeGuard(typeNode: ts.TypeAliasDeclaration): string {
    const typeName = typeNode.name.text;

    const typeGuardCode = `
    export function is${typeName}(value: any): value is ${typeName} {
      // Add your type guard logic here
      // Check if value matches the type
      // Return true if the value matches the type, false otherwise
    }
  `;
    return typeGuardCode;
}

// Generate type guard for an enum
function generateEnumTypeGuard(enumNode: ts.EnumDeclaration): string {
    const enumName = enumNode.name.text;
    const enumMembers = enumNode.members;

    const typeGuardCode = `
    export function is${enumName}(value: any): value is ${enumName} {
      return ${enumMembers
        .map((member) => {
            if (ts.isIdentifier(member.name)) {
                return `value === ${enumName}.${member.name.text}`;
            } else if (ts.isStringLiteral(member.name)) {
                return `value === '${member.name.text}'`;
            } else if (ts.isNumericLiteral(member.name)) {
                return `value === ${member.name.text}`;
            } else {
                return false;
            }
        })
        .filter(Boolean)
        .join(' || ')}
    }
  `;
    return typeGuardCode;
}



// Generate type guards for the extracted interfaces, types, and enums
function generateTypeGuards(interfaces: ts.InterfaceDeclaration[], types: ts.TypeAliasDeclaration[], enums: ts.EnumDeclaration[]): void {
    for (const interfaceNode of interfaces) {
        const typeGuardCode = generateInterfaceTypeGuard(interfaceNode);
        fs.writeFileSync(`./out/is${interfaceNode.name.text}.ts`, typeGuardCode);
    }

    for (const typeNode of types) {
        const typeGuardCode = generateTypeTypeGuard(typeNode);
        fs.writeFileSync(`./out/is${typeNode.name.text}.ts`, typeGuardCode);
    }

    for (const enumNode of enums) {
        const typeGuardCode = generateEnumTypeGuard(enumNode);
        fs.writeFileSync(`./out/is${enumNode.name.text}.ts`, typeGuardCode);
    }
}

// Generate type guards for the source file
function generateTypeGuardsForSourceFile(): void {
    const interfaces: ts.InterfaceDeclaration[] = [];
    const types: ts.TypeAliasDeclaration[] = [];
    const enums: ts.EnumDeclaration[] = [];

    ts.forEachChild(sourceFile, (node) => {
        if (ts.isInterfaceDeclaration(node)) {
            interfaces.push(node);
        } else if (ts.isTypeAliasDeclaration(node)) {
            types.push(node);
        } else if (ts.isEnumDeclaration(node)) {
            enums.push(node);
        }
    });

    generateTypeGuards(interfaces, types, enums);
}

// Run the type guard generation
generateTypeGuardsForSourceFile();

// Helper function to get the type string from a TypeScript type
function getTypeString(type: ts.TypeNode | undefined): string {
    if (type) {
        const printer = ts.createPrinter();
        return printer.printNode(ts.EmitHint.Unspecified, type, sourceFile);
    }
    return 'any';
}
