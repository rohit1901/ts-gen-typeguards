import {
    EnumDeclaration,
    isIntersectionTypeNode,
    isPropertySignature,
    isQualifiedName,
    isTypeLiteralNode,
    isTypeReferenceNode,
    isUnionTypeNode,
    TypeAliasDeclaration,
} from 'typescript';
import {
    buildGenericFunctionSignature,
    generateIntersectionTypeGuard,
    generateKeywordGuard,
    generateOptionalPropertyTypeGuard,
    generatePropertyGuard,
    generateTypeReferenceGuard,
    generateUnionTypeGuard,
    getQualifiedNameText,
    handleEnumIntersection,
} from '../api';
import {getEscapedCapitalizedStringLiteral} from 'ts-raw-utils';
import {getName, getTypeNameFromTypeParameter, isKeyword} from '../utils';

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
        const typeName = getName(name);
        typeGuardStrings.push(
            buildTypeTypeGuardSignature(definition),
            ...generateIntersectionTypeGuard(type, typeName),
            ...generateTypeWithinTypeLiteralTypeGuard(definition),
            ...generateUnionTypeGuard(type, typeName, undefined, definitions),
            ...generateKeywordGuard(type),
            ...handleEnumIntersection(definition, enums),
            ...generateTypeReferenceGuard(type, typeName, false),
        );
        typeGuard.push(
            typeGuardStrings.filter(p => typeof p === 'string').join('&&') + `)}`,
        );
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
    const {type} = definition;
    const typeParameterName = getTypeNameFromTypeParameter(definition);
    const typeGuardStrings: string[] = [];
    if (!isTypeLiteralNode(type)) {
        return [];
    }
    //NOTE: Return empty string if the definition is not a TypeLiteralNode
    for (const property of type.members) {
        // handle optional properties separately
        if (property.questionToken && isPropertySignature(property))
            typeGuardStrings.push(
                ...generateOptionalPropertyTypeGuard(
                    property,
                    undefined,
                    typeParameterName,
                ),
            );
        else {
            typeGuardStrings.push(
                ...generatePropertyGuard(property, undefined, typeParameterName),
            );
        }
    }
    return typeGuardStrings;
}

/**
 * Build the type guard signature for a type. This includes the type guard function name and the type guard parameter.
 * @example
 * export function isTypeName(value: any): value is TypeName {return(value !== null
 * @param definition - The type definition to process.
 */
function buildTypeTypeGuardSignature(definition: TypeAliasDeclaration): string {
    const isGeneric =
        definition.typeParameters && definition.typeParameters.length > 0;
    const typeName: string = definition.name.escapedText.toString();
    if (isGeneric) {
        return buildGenericFunctionSignature(typeName, definition.typeParameters);
    }
    if (isTypeReferenceNode(definition.type)) {
        if(definition.type.typeArguments && definition.type.typeArguments.length > 0) {
            const functionParams = ['value: any'];
            definition.type.typeArguments.forEach(typeArgument => {
                if(isTypeReferenceNode(typeArgument)) {
                    if(isQualifiedName(typeArgument.typeName)) {
                        const qualifiedNameFunctionAsParam = `is${getEscapedCapitalizedStringLiteral(
                            typeArgument.typeName.left.getText(),
                        )}: (v: any) => v is ${getQualifiedNameText(typeArgument.typeName)}`
                        functionParams.push(qualifiedNameFunctionAsParam);
                    }
                }
                else if(isKeyword(typeArgument.kind)) {
                    const keywordFunctionAsParam = `is${getEscapedCapitalizedStringLiteral(
                        typeArgument.getText(),
                    )}: (v: any) => v is ${typeArgument.getText()}`
                    functionParams.push(keywordFunctionAsParam);
                }
                else if(isTypeLiteralNode(typeArgument) || isIntersectionTypeNode(typeArgument) || isUnionTypeNode(typeArgument)) {
                    functionParams.push(`isCustomType: (val: any) =>  val is ${typeArgument.getText()}`);
                }
            });
            return `export function is${getEscapedCapitalizedStringLiteral(
                typeName,
            )}(${functionParams.join(',')}): value is ${typeName} {return(value !== null`;
        }
    }
    return `export function is${getEscapedCapitalizedStringLiteral(
        typeName,
    )}(value: any): value is ${typeName} {return(value !== null`;
}
