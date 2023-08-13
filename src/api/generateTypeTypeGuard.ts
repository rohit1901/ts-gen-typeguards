import {EnumDeclaration, Identifier, isTypeLiteralNode, TypeAliasDeclaration,} from 'typescript';
import {
    generateIntersectionTypeGuard,
    generateKeywordGuard,
    generatePropertyGuard,
    generateUnionTypeGuard,
    handleEnumIntersection,
} from '../api';
import {getEscapedCapitalizedStringLiteral,} from '../utils';

/**
 * Generate a set of type guard functions based on provided TypeAliasDeclarations.
 * @param definitions - An array of TypeAliasDeclarations.
 * @param enums - An array of EnumDeclarations
 * @returns A string containing the generated type guard functions.
 */
export function generateTypeTypeGuard(
    definitions: TypeAliasDeclaration[],
    enums: EnumDeclaration[],
): string {
    const typeGuard: string[] = [];
    for (const definition of definitions) {
        const typeGuardStrings: string[] = [];
        const {name, type} = definition;
        const typeName = name ? name.getText() : undefined;
        const typeGuardName = getEscapedCapitalizedStringLiteral(typeName);
        typeGuardStrings.push(`export function is${getEscapedCapitalizedStringLiteral(
            typeGuardName,
        )}(value: any): value is ${typeName} {return(typeof value === "object" &&
    value !== null`);
        typeGuardStrings.push(...generateIntersectionTypeGuard(type, typeName));
        typeGuardStrings.push(
            ...generateTypeWithinTypeLiteralTypeGuard(definition),
        );
        typeGuardStrings.push(
            ...generateUnionTypeGuard(type, typeName, undefined, definitions),
        );
        typeGuardStrings.push(...generateKeywordGuard(type));
        typeGuardStrings.push(...handleEnumIntersection(definition, enums));
        typeGuard.push(typeGuardStrings.join('&&') + `)}`);
    }
    return typeGuard.join('\n');
}

/**
 * Generate type guards for a TypeAliasDeclaration with a TypeLiteralNode.
 * @param definition - The TypeAliasDeclaration to process.
 * @returns An array of strings containing the type guard statements for the TypeLiteralNode properties.
 */
export function generateTypeWithinTypeLiteralTypeGuard(
    definition: TypeAliasDeclaration,
) {
    const {name, type} = definition;
    const parentName = getName(name);
    const typeGuardStrings: string[] = [];
    if (!isTypeLiteralNode(type)) {
        return '';
    }
    //NOTE: Return empty string if the definition is not a TypeLiteralNode
    for (const property of type.members) {
        typeGuardStrings.push(...generatePropertyGuard(property));
    }
    return typeGuardStrings;
}

/**
 * Gets the name from an Identifier object.
 * This function takes an Identifier object and extracts the name
 * from it. An Identifier can represent a variable, function,
 * class, or other named entity in TypeScript code.
 * @param name - The Identifier object to extract the name from.
 */
function getName(name: Identifier): string {
    if (!name) return;
    if (name.hasOwnProperty('escapedText')) {
        return name.escapedText.toString();
    }
    return name.getText();
}
