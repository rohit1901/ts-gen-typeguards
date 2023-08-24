import {
    factory,
    isIntersectionTypeNode,
    isLiteralTypeNode,
    isPropertySignature,
    isTypeLiteralNode,
    isTypeReferenceNode,
    isUnionTypeNode,
    PropertyName,
    TypeAliasDeclaration,
    TypeNode,
    TypeReferenceNode,
} from 'typescript';
import {generateLiteralTypeTypeGuard} from './generateLiteralTypeTypeGuard';
import {
    isAnyKeyword,
    isBigIntKeyword,
    isBooleanKeyword,
    isNumberKeyword,
    isObjectKeyword,
    isStringKeyword,
    isSymbolKeyword,
    isUndefinedKeyword,
    isUnknownKeyword,
    isVoidKeyword,
} from '../utils';
import {
    generateBigIntKeywordTypeGuard,
    generateBooleanKeywordTypeGuard,
    generateNumberKeywordTypeGuard,
    generateObjectKeywordTypeGuard,
    generateStringKeywordTypeGuard,
    generateSymbolKeywordTypeGuard,
    generateUndefinedKeywordTypeGuard,
    generateVoidKeywordTypeGuard,
} from './generateKeywordTypeGuardsForUnion';
import {generateIntersectionTypeGuardForType} from './generateIntersectionTypeGuardForType';
import {generatePropertyGuard} from '../api';
import {capitalize} from 'ts-raw-utils';

/**
 * Generate a union type guard for a given TypeScript type alias.
 *
 * @param type - The TypeAliasDeclaration representing the union type.
 * @param name
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the union.
 * @returns The generated union type guard code as a string.
 */
export function generateUnionTypeGuardForIntersection(
    {type}: TypeAliasDeclaration,
    typeAliases: TypeAliasDeclaration[],
    name?: PropertyName,
): string {
    if (!isUnionTypeNode(type)) {
        return '';
    }
    const typeGuardCode: string[] = [];
    for (const unionType of type.types) {
        typeGuardCode.push(
            ...processUnionTypeWithTypeGuards(unionType, typeAliases),
        );
    }

    return `if(${typeGuardCode.join(' || ')}) return false;`;
}

/**
 * Generate a type guard for a TypeReferenceNode within a union type.
 *
 * @param typeRefNode - The TypeReferenceNode representing the union member type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the union.
 */
export function generateTypeReferenceTypeGuard(
    typeRefNode: TypeReferenceNode,
    typeAliases: TypeAliasDeclaration[],
): string[] {
    const typeGuardCode = [];
    const typeAlias = typeAliases.find(
        typeAlias => typeAlias.name.getText() === typeRefNode.typeName.getText(),
    );
    if (typeAlias) {
        typeGuardCode.push(generateTypeAliasGuardExpression(typeAlias));
    }
    return typeGuardCode;
}

/**
 * Generates a type guard for the properties of a TypeLiteralNode within a union type.
 *
 * This function takes a TypeLiteralNode representing a member of a union type and generates a type guard
 * for the properties of that type. The generated type guard ensures that an object adheres to the structure
 * defined by the TypeLiteralNode.
 *
 * @param typeLiteral - The TypeLiteralNode representing the union member type literal.
 * @param parentName - An optional name of the parent type for better error reporting.
 * @param typeParameterName
 * @returns An array containing a single string element representing the generated type guard.
 * If no properties are found, an empty array is returned.
 *
 * @example
 * //Given a TypeLiteralNode representing an interface:
 * interface Person {
 *    name: string;
 *    age: number;
 * }
 *
 * const typeGuard = generateTypeLiteralTypeGuard(personTypeLiteral, 'Person');
 *
 * // The generated type guard for the Person interface will be:
 * // ['(typeof value === "object" && value !== null && typeof value.name === "string" && typeof value.age === "number")']
 *
 * @example
 * // Given a TypeLiteralNode representing an empty interface:
 * interface Empty {}
 *
 * const typeGuard = generateTypeLiteralTypeGuard(emptyTypeLiteral, 'Empty');
 *
 * // The generated type guard for the Empty interface will be an empty array:
 * // []
 */
export function generateTypeLiteralTypeGuardWithinUnion(
    typeLiteral: TypeNode,
    parentName?: string,
    typeParameterName?: string,
): string[] {
    if (!isTypeLiteralNode(typeLiteral)) return [];
    const propertyGuards: string[] = [];
    for (const member of typeLiteral.members) {
        if (isPropertySignature(member)) {
            propertyGuards.push(
                ...generatePropertyGuard(member, parentName, typeParameterName),
            );
        }
    }

    if (propertyGuards.length > 0) {
        return [`(${propertyGuards.join(' && ')})`];
    }

    return [`(${propertyGuards.join('')})`];
}

/**
 * Generate a type guard for a TypeAliasDeclaration within a union type.
 *
 * @param typeAlias - The TypeAliasDeclaration representing the union member type alias.
 * @returns The generated type guard code as a string.
 */
export function generateTypeAliasGuardExpression(
    typeAlias: TypeAliasDeclaration,
): string {
    return `!is${capitalize(typeAlias.name.getText())}(value)`;
}

/**
 * Generate the type guard code for a LiteralTypeNode. This is used to add a check for the property name
 * @returns The generated type guard code for the property as a string.
 * @param type
 * @param typeAliases
 * @param name
 */
export function generateUnionTypeGuardForProperty(
    type: TypeNode,
    typeAliases: TypeAliasDeclaration[],
    name?: string,
): string {
    const typeGuardCode: string[] = [];
    if (!isUnionTypeNode(type)) {
        return '';
    }
    if (name) {
        typeGuardCode.push(`!value.hasOwnProperty('${name}')`);
    }
    for (const unionType of type.types) {
        if (isIntersectionTypeNode(unionType)) {
            typeGuardCode.push(
                generateIntersectionTypeGuardForType(
                    factory.createTypeAliasDeclaration(
                        undefined,
                        undefined,
                        undefined,
                        unionType,
                    ),
                    typeAliases,
                ),
            );
        }
        processUnionTypeWithTypeGuards(unionType, typeAliases);
    }

    return `if(${typeGuardCode.join(' || ')}) return false;`;
}

/**
 * Processes the given union type node and generates type guards based on its individual members.
 *
 * @param {TypeNode} unionType - The union type node to be processed.
 * @param {TypeAliasDeclaration[]} typeAliases - An array of type alias declarations for resolving type references.
 * @returns {string[]} - An array of type guard code snippets generated for the given union type node.
 *
 * @example
 * const unionTypeNode = getTypeNodeFromSomewhere();
 * const typeAliasesArray = getTypeAliasesFromSomewhere();
 * const typeGuardCodeSnippets = [];
 * processUnionTypeWithTypeGuards(unionTypeNode, typeAliasesArray, typeGuardCodeSnippets);
 *
 * @description
 * This function examines the provided `unionType` node and generates type guards for its individual members.
 * It handles various cases like type references, type literals, literal types, keyword types, etc., and collects
 * the generated type guard code snippets into the `typeGuardCode` array.
 * `any` and `unknown` keywords are treated as an object type.
 * If a keyword type like `never`, or `keyof` is encountered, it is skipped as it doesn't require
 * a specific type guard.
 * The generated type guard code snippets can be later used for runtime type checks or other purposes.
 */
function processUnionTypeWithTypeGuards(
    unionType: TypeNode,
    typeAliases: TypeAliasDeclaration[],
): string[] {
    const typeGuardCode: string[] = [];
    if (isTypeReferenceNode(unionType)) {
        typeGuardCode.push(
            ...generateTypeReferenceTypeGuard(unionType, typeAliases),
        );
    } else if (isTypeLiteralNode(unionType)) {
        typeGuardCode.push(...generateTypeLiteralTypeGuardWithinUnion(unionType));
    } else if (isLiteralTypeNode(unionType)) {
        typeGuardCode.push(generateLiteralTypeTypeGuard(unionType));
    } else if (isUndefinedKeyword(unionType.kind)) {
        typeGuardCode.push(generateUndefinedKeywordTypeGuard(unionType.kind));
    } else if (isBooleanKeyword(unionType.kind)) {
        typeGuardCode.push(generateBooleanKeywordTypeGuard(unionType.kind));
    } else if (isStringKeyword(unionType.kind)) {
        typeGuardCode.push(generateStringKeywordTypeGuard(unionType.kind));
    } else if (isNumberKeyword(unionType.kind)) {
        typeGuardCode.push(generateNumberKeywordTypeGuard(unionType.kind));
    } else if (isBigIntKeyword(unionType.kind)) {
        typeGuardCode.push(generateBigIntKeywordTypeGuard(unionType.kind));
    } else if (isSymbolKeyword(unionType.kind)) {
        typeGuardCode.push(generateSymbolKeywordTypeGuard(unionType.kind));
    } else if (isObjectKeyword(unionType.kind)) {
        typeGuardCode.push(generateObjectKeywordTypeGuard(unionType.kind));
    } else if (isAnyKeyword(unionType.kind)) {
        typeGuardCode.push(generateObjectKeywordTypeGuard(unionType.kind));
    } else if (isUnknownKeyword(unionType.kind)) {
        typeGuardCode.push(generateObjectKeywordTypeGuard(unionType.kind));
    } else if (isVoidKeyword(unionType.kind)) {
        typeGuardCode.push(generateVoidKeywordTypeGuard(unionType.kind));
    }
    return typeGuardCode;
}
