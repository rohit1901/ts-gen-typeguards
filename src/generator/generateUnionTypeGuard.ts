import {
    isLiteralTypeNode,
    isPropertySignature,
    isTypeLiteralNode,
    isTypeReferenceNode,
    isUnionTypeNode,
    PropertySignature,
    TypeAliasDeclaration,
    TypeLiteralNode,
    TypeReferenceNode,
} from "typescript";
import {generateLiteralTypeTypeGuard} from "./generateLiteralTypeTypeGuard";
import {
    capitalize,
    isAnyKeyword,
    isBigIntKeyword,
    isBooleanKeyword,
    isKeyofKeyword,
    isNeverKeyword,
    isNumberKeyword,
    isObjectKeyword,
    isStringKeyword,
    isSymbolKeyword,
    isUndefinedKeyword,
    isUnknownKeyword,
    isVoidKeyword
} from "../utils";
import {
    generateAnyKeywordTypeGuard,
    generateBigIntKeywordTypeGuard, generateBooleanKeywordTypeGuard,
    generateKeyofKeywordTypeGuard,
    generateNeverKeywordTypeGuard,
    generateNumberKeywordTypeGuard,
    generateObjectKeywordTypeGuard,
    generateStringKeywordTypeGuard,
    generateSymbolKeywordTypeGuard, generateUndefinedKeywordTypeGuard,
    generateUnknownKeywordTypeGuard,
    generateVoidKeywordTypeGuard
} from "./generateKeywordTypeGuardsForUnion";

/**
 * Generate a union type guard for a given TypeScript type alias.
 *
 * @param type - The TypeAliasDeclaration representing the union type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the union.
 * @returns The generated union type guard code as a string.
 */
export function generateUnionTypeGuard(
    {type}: TypeAliasDeclaration,
    typeAliases: TypeAliasDeclaration[]
): string {
    if (!isUnionTypeNode(type)) {
        return '';
    }

    const typeGuardCode: string[] = [];

    for (const unionType of type.types) {
        if (isTypeReferenceNode(unionType)) {
            generateTypeReferenceTypeGuard(unionType, typeAliases, typeGuardCode);
        } else if (isTypeLiteralNode(unionType)) {
            generateTypeLiteralTypeGuard(unionType, typeGuardCode);
        } else if (isLiteralTypeNode(unionType)) {
            typeGuardCode.push(generateLiteralTypeTypeGuard(unionType));
        } else if (isUndefinedKeyword(unionType.kind)) {
            typeGuardCode.push(generateUndefinedKeywordTypeGuard(unionType.kind));
        } else if (isBooleanKeyword(unionType.kind)) {
            typeGuardCode.push(generateBooleanKeywordTypeGuard(unionType.kind));
        }
        else if (isStringKeyword(unionType.kind)) {
            typeGuardCode.push(generateStringKeywordTypeGuard(unionType.kind));
        }
        else if (isNumberKeyword(unionType.kind)) {
            typeGuardCode.push(generateNumberKeywordTypeGuard(unionType.kind));
        }

        else if (isBigIntKeyword(unionType.kind)) {
            typeGuardCode.push(generateBigIntKeywordTypeGuard(unionType.kind));
        }

        else if (isSymbolKeyword(unionType.kind)) {
            typeGuardCode.push(generateSymbolKeywordTypeGuard(unionType.kind));
        }

        else if (isObjectKeyword(unionType.kind)) {
            typeGuardCode.push(generateObjectKeywordTypeGuard(unionType.kind));
        }

        else if (isAnyKeyword(unionType.kind)) {
            //skip any keyword
        }

        else if (isUnknownKeyword(unionType.kind)) {
            //skip unknown keyword
        }

        else if (isNeverKeyword(unionType.kind)) {
            //skip never keyword
        }

        else if (isVoidKeyword(unionType.kind)) {
            typeGuardCode.push(generateVoidKeywordTypeGuard(unionType.kind));
        }

        else if (isKeyofKeyword(unionType.kind)) {
            //skip keyof keyword for now as it is not supported
        }


    }

    return `if(${typeGuardCode.join(' || ')}) return false;`;
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
    return `!is${capitalize(typeAlias.name.getText())}(value)`;
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