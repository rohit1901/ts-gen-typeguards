import {
    TypeAliasDeclaration,
    isUnionTypeNode,
    isTypeReferenceNode,
    isTypeLiteralNode,
    TypeLiteralNode,
    PropertySignature,
    UnionTypeNode, isPropertySignature, TypeReferenceNode,
} from "typescript";
import {generateOptionalPropertyTypeGuard} from "./generateOptionalPropertyTypeGuard";
import {generateLiteralTypeGuard} from "./generateLiteralTypeGuard";

/**
 * Generate a union type guard for a given TypeScript type alias.
 *
 * @param type - The TypeAliasDeclaration representing the union type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the union.
 * @returns The generated union type guard code as a string.
 */
export function generateUnionTypeGuard(
    { type }: TypeAliasDeclaration,
    typeAliases: TypeAliasDeclaration[]
): string {
    if (!isUnionTypeNode(type)) {
        return "";
    }

    const typeGuardCode: string[] = [];
    for (const unionType of type.types) {
        if (isTypeReferenceNode(unionType)) {
            generateTypeReferenceTypeGuard(unionType, typeAliases, typeGuardCode);
        } else if (isTypeLiteralNode(unionType)) {
            generateTypeLiteralTypeGuard(unionType, typeGuardCode);
        }
    }

    return typeGuardCode.join(" || ");
}

/**
 * Generate a type guard for a TypeReferenceNode within a union type.
 *
 * @param typeRefNode - The TypeReferenceNode representing the union member type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the union.
 * @param typeGuardCode - The array to store the generated type guard code as strings.
 */
function generateTypeReferenceTypeGuard(
    typeRefNode: TypeReferenceNode,
    typeAliases: TypeAliasDeclaration[],
    typeGuardCode: string[]
): void {
    const typeAlias = typeAliases.find((typeAlias) => typeAlias.name.getText() === typeRefNode.typeName.getText());
    if (typeAlias) {
        typeGuardCode.push(generateTypeAliasTypeGuard(typeAlias));
    }
}

/**
 * Generate a type guard for a TypeLiteralNode within a union type.
 *
 * @param typeLiteral - The TypeLiteralNode representing the union member type literal.
 * @param typeGuardCode - The array to store the generated type guard code as strings.
 */
function generateTypeLiteralTypeGuard(typeLiteral: TypeLiteralNode, typeGuardCode: string[]): void {
    const propertyGuards: string[] = [];
    for (const member of typeLiteral.members) {
        if (isPropertySignature(member)) {
            propertyGuards.push(generatePropertyTypeGuard(member));
        }
    }
    if (propertyGuards.length > 0) {
        typeGuardCode.push(`(${propertyGuards.join(" && ")})`);
    }
}

/**
 * Generate a type guard for a TypeAliasDeclaration within a union type.
 *
 * @param typeAlias - The TypeAliasDeclaration representing the union member type alias.
 * @returns The generated type guard code as a string.
 */
function generateTypeAliasTypeGuard(typeAlias: TypeAliasDeclaration): string {
    return `value === '${typeAlias.name.getText()}'`;
}

/**
 * Generate the type guard code for a property (PropertySignature).
 *
 * @param property - The PropertySignature representing the property.
 * @returns The generated type guard code for the property as a string.
 */
function generatePropertyTypeGuard(property: PropertySignature): string {
    // TODO: Implement the generation of the property type guard code
    // Example implementation for Point type:
    return `isPoint(value)`;
}