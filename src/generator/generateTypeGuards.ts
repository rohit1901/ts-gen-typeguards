// Generate type guards for a given interface, type, or enum
import {
  generateIntersectionTypeGuard,
  generateOptionalPropertyTypeGuard,
  generateUniqueTypeGuardsFromTypeLiteral,
  generateUnionTypeGuard,
} from "./";
import {
  isPropertySignature,
  isTypeLiteralNode,
  NodeArray,
  TypeAliasDeclaration,
} from "typescript";
import { getEscapedCapitalizedStringLiteral, syntaxKindToType } from "@utils";

/**
 * Generates the type guard header for the type guard function.
 * The generated type guard function will be in the format:
 * export function is{typeName}(value: any): value is {typeName} {
 *     if (typeof value !== 'object' || value === null) { return false; }
 * }
 *
 * @param typeName The name of the type for which the type guard is being generated.
 * @param shouldBeExported A boolean indicating whether the type guard function should be exported.
 *                         Set to `true` if the function should be exported, `false` otherwise.
 * @returns The generated type guard header as a string.
 */
function generateTypeGuardHeader(
  typeName: string,
  shouldBeExported: boolean,
): string {
  const exportKeyword = shouldBeExported ? "export " : "";
  return `\n${exportKeyword}function is${typeName}(value: any): value is ${typeName} {\n    if (typeof value !== 'object' || value === null) { return false; }\n`;
}

/**
 * Function generates type guards for the provided type aliases and interfaces.
 * These type guards enable runtime type checking for objects based on their defined types.
 * The function takes an array of type alias declarations or a node array containing interfaces and type aliases
 * as input and returns the generated type guards code as a string.
 * The generated code can be used to validate data at runtime and ensure it adheres to the defined TypeScript types.
 * @param typeAliases
 * @returns string
 */
export function generateTypeGuards(
  typeAliases: TypeAliasDeclaration[],
): string {
  const typeGuardCode: string[] = [];
  const set = new Set<string>();
  for (const typeAlias of typeAliases) {
    const { modifiers, name, type } = typeAlias;
    const propSet = new Set<string>();
    if (set.has(name.getText())) return;
    set.add(name.getText());
    const shouldBeExported = modifiers?.some(
      (modifier) => syntaxKindToType(modifier.kind) === "export",
    );
    const typeGuardName = getEscapedCapitalizedStringLiteral(name.getText());
    typeGuardCode.push(
      generateTypeGuardHeader(typeGuardName, shouldBeExported),
    );
    typeGuardCode.push(generateIntersectionTypeGuard(typeAlias, typeAliases));
    typeGuardCode.push(generateUnionTypeGuard(typeAlias, typeAliases));
    generateUniqueTypeGuardsFromTypeLiteral(
      type,
      propSet,
      typeGuardCode,
      typeAliases,
    );
    typeGuardCode.push(`\n    return true;\n}\n`);
  }

  return typeGuardCode.join("\n");
  /*let typeGuards = '';

    for (const typeName in typeAliases) {
        const definition = typeAliases[typeName];

        if (definition.kind === 'union') {
            typeGuards += generateUnionTypeGuard(typeName, definition);
        } else if (definition.kind === 'intersection') {
            typeGuards += generateIntersectionTypeGuard(typeName, definition);
        } else if (definition.kind === 'alias') {
            typeGuards += generateTypeAliasGuard(typeName, definition);
        } else if (definition.kind === 'conditional') {
            typeGuards += generateConditionalTypeGuard(typeName, definition);
        } else if (definition.kind === 'indexedAccess') {
            typeGuards += generateIndexedAccessTypeGuard(typeName, definition);
        } else if (definition.kind === 'mapped') {
            typeGuards += generateMappedTypeGuard(typeName, definition);
        } else if (definition.kind === 'recursive') {
            typeGuards += generateRecursiveTypeGuard(typeName, definition);
        } else if (definition.kind === 'inherited') {
            typeGuards += generateInheritedTypeGuard(typeName, definition);
        } else if (definition.kind === 'function') {
            typeGuards += generateFunctionSignatureGuard(typeName, definition);
        } else if (definition.kind === 'literal') {
            typeGuards += generateLiteralTypeGuard(typeName, definition);
        } else if (definition.kind === 'optionalProperty') {
            typeGuards += generateOptionalPropertyTypeGuard({} as PropertySignature);
        } else if (definition.kind === 'readonlyProperty') {
            typeGuards += generateReadonlyPropertyTypeGuard(typeName, definition);
        } else if (definition.kind === 'enum') {
            typeGuards += generateEnumTypeGuard(typeName, definition);
        } else if (definition.kind === 'any') {
            typeGuards += generateAnyTypeGuard(typeName);
        } else if (definition.kind === 'unknown') {
            typeGuards += generateUnknownTypeGuard(typeName);
        } else if (definition.kind === 'typeAssertion') {
            typeGuards += generateTypeAssertionGuard(typeName, definition);
        } else {
            typeGuards += generateTypeGuard(typeName, definition);
        }
    }*/
}
