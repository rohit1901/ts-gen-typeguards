// Generate type guards for a given interface, type, or enum
import {
    generateAnyTypeGuard,
    generateConditionalTypeGuard,
    generateEnumTypeGuard,
    generateFunctionSignatureGuard,
    generateIndexedAccessTypeGuard,
    generateInheritedTypeGuard,
    generateIntersectionTypeGuard,
    generateLiteralTypeGuard,
    generateMappedTypeGuard,
    generateOptionalPropertyTypeGuard,
    generateReadonlyPropertyTypeGuard,
    generateRecursiveTypeGuard,
    generateTypeAliasGuard,
    generateTypeAssertionGuard,
    generateTypeGuard,
    generateUnionTypeGuard,
    generateUnknownTypeGuard
} from "./";

export function generateTypeGuards(input: string): string {
    const types = JSON.parse(input);

    let typeGuards = '';

    for (const typeName in types) {
        const definition = types[typeName];

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
            typeGuards += generateOptionalPropertyTypeGuard(typeName, definition);
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
    }

    return typeGuards;
}