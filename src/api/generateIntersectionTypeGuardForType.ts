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
    TypeLiteralNode,
    TypeNode,
    TypeReferenceNode,
} from 'typescript';
import {
    generateBigIntKeywordTypeGuard,
    generateBooleanKeywordTypeGuard,
    generateNumberKeywordTypeGuard,
    generateObjectKeywordTypeGuard,
    generateOptionalPropertyTypeGuard,
    generateStringKeywordTypeGuard,
    generateSymbolKeywordTypeGuard,
    generateUndefinedKeywordTypeGuard,
    generateUnionTypeGuardForIntersection,
    generateVoidKeywordTypeGuard,
} from '../api';
import {generatePropertyTypeGuard} from './generateTypeLiteralTypeGuard';
import {generateLiteralTypeTypeGuard} from './generateLiteralTypeTypeGuard';
import {
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
    isVoidKeyword,
} from '../utils';
import {
    generateTypeLiteralTypeGuardWithinUnion,
    generateTypeReferenceTypeGuard,
} from './generateUnionTypeGuardForIntersection';

/**
 * Generate an intersection type guard for a given TypeScript type alias.
 *
 * @param type - The TypeAliasDeclaration representing the intersection type.
 * @param name - The name of the type alias.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the intersection.
 * @returns The generated intersection type guard code as a string.
 */
export function generateIntersectionTypeGuardForType(
    {type, name}: TypeAliasDeclaration,
    typeAliases: TypeAliasDeclaration[],
): string {
    if (!isIntersectionTypeNode(type)) {
        return '';
    }

    const typeGuardCode: string[] = [];
    const encounteredPropertyNames = new Set<string>();

    for (const intersectionType of type.types) {
        if (isTypeReferenceNode(intersectionType)) {
            generateTypeReferenceTypeGuards(
                intersectionType,
                typeAliases,
                encounteredPropertyNames,
                typeGuardCode,
            );
        } else if (isTypeLiteralNode(intersectionType)) {
            generateTypeLiteralGuards(
                intersectionType,
                encounteredPropertyNames,
                typeGuardCode,
                typeAliases,
                name,
            );
        }
    }

    return typeGuardCode.join('');
}
/**
 * Generates a type guard condition for an intersection type property.
 *
 * @param {TypeNode} type - The intersection type node.
 * @param {TypeAliasDeclaration[]} typeAliases - Array of type alias declarations for the intersection type.
 * @param {string} [name] - Optional name of the property.
 * @returns {string} The generated type guard condition.
 */
export function generateIntersectionTypeGuardForProperty(
    type: TypeNode,
    typeAliases: TypeAliasDeclaration[],
    name?: string,
): string {
  const typeGuardCode: string[] = [];
  if (!isIntersectionTypeNode(type)) {
    return '';
  }
  if (name) {
    typeGuardCode.push(`!value.hasOwnProperty('${name}')`);
  }
  for (const intersectionType of type.types) {
    if (isIntersectionTypeNode(intersectionType)) {
      typeGuardCode.push(
          generateIntersectionTypeGuardForType(
              factory.createTypeAliasDeclaration(
                  undefined,
                  undefined,
                  undefined,
                  intersectionType,
              ),
              typeAliases,
          ),
      );
    }
    typeGuardCode.push(...processIntersectionTypeWithTypeGuards(
        intersectionType,
        typeAliases,
    ));
  }

  return `if(${typeGuardCode.join(' || ')}) return false;`;
}

/**
 * Generate type guards for a TypeReferenceNode within an intersection type.
 *
 * @param intersectionType - The TypeReferenceNode representing the intersection type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the intersection.
 * @param encounteredPropertyNames - A set to track property names already processed.
 * @param typeGuardCode - The array to store the generated type guards as strings.
 * @param name
 */
function generateTypeReferenceTypeGuards(
    intersectionType: TypeReferenceNode,
    typeAliases: TypeAliasDeclaration[],
    encounteredPropertyNames: Set<string>,
    typeGuardCode: string[],
    name?: PropertyName,
): void {
    const typeLiterals = typeAliases.filter(
        typeAlias =>
            typeAlias.name.getText() === intersectionType.typeName.getText(),
    );

    for (const literals of typeLiterals) {
        if (isTypeLiteralNode(literals.type)) {
            generateTypeLiteralGuards(
                literals.type,
                encounteredPropertyNames,
                typeGuardCode,
                typeAliases,
                name,
            );
        }
    }
}

/**
 * Generate type guards for a TypeLiteralNode within an intersection type.
 *
 * @param typeLiteral - The TypeLiteralNode representing the type literal within the intersection.
 * @param encounteredPropertyNames - A set to track property names already processed.
 * @param typeGuardCode - The array to store the generated type guards as strings.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the intersection.
 * @param name
 */
function generateTypeLiteralGuards(
    typeLiteral: TypeLiteralNode,
    encounteredPropertyNames: Set<string>,
    typeGuardCode: string[],
    typeAliases: TypeAliasDeclaration[],
    name?: PropertyName,
): void {
    for (const member of typeLiteral.members) {
        if (isPropertySignature(member)) {
            if (isIntersectionTypeNode(member.type)) {
                typeGuardCode.push(
                    generateIntersectionTypeGuardForProperty(
                        member.type,
                        typeAliases,
                        member.name.getText(),
                    ),
                );
            } else if (isUnionTypeNode(member.type)) {
                typeGuardCode.push(
                    generateUnionTypeGuardForIntersection(
                        factory.createTypeAliasDeclaration(
                            undefined,
                            factory.createIdentifier(member.name.getText()),
                            undefined,
                            member.type,
                        ),
                        typeAliases,
                    ),
                );
            } else {
                const propName = member.name.getText();
                if (!encounteredPropertyNames.has(propName)) {
                    encounteredPropertyNames.add(propName);
                    typeGuardCode.push(...generateOptionalPropertyTypeGuard(member));
                    typeGuardCode.push(generatePropertyTypeGuard(member, typeAliases));
                }
            }
        }
    }
}
/**
 * Process an intersection type and generate type guard code based on the type's components.
 *
 * @param {TypeNode} intersectionType - The intersection type node to process.
 * @param {TypeAliasDeclaration[]} typeAliases - An array of type alias declarations for reference.
 * @returns {void}
 */
function processIntersectionTypeWithTypeGuards(
    intersectionType: TypeNode,
    typeAliases: TypeAliasDeclaration[],
) {
  const typeGuardCode: string[] = [];
    if (isTypeReferenceNode(intersectionType)) {
        typeGuardCode.push(
            ...generateTypeReferenceTypeGuard(intersectionType, typeAliases),
        );
    } else if (isTypeLiteralNode(intersectionType)) {
        typeGuardCode.push(...generateTypeLiteralTypeGuardWithinUnion(intersectionType));
    } else if (isLiteralTypeNode(intersectionType)) {
        typeGuardCode.push(generateLiteralTypeTypeGuard(intersectionType));
    } else if (isUndefinedKeyword(intersectionType.kind)) {
        typeGuardCode.push(
            generateUndefinedKeywordTypeGuard(intersectionType.kind),
        );
    } else if (isBooleanKeyword(intersectionType.kind)) {
        typeGuardCode.push(generateBooleanKeywordTypeGuard(intersectionType.kind));
    } else if (isStringKeyword(intersectionType.kind)) {
        typeGuardCode.push(generateStringKeywordTypeGuard(intersectionType.kind));
    } else if (isNumberKeyword(intersectionType.kind)) {
        typeGuardCode.push(generateNumberKeywordTypeGuard(intersectionType.kind));
    } else if (isBigIntKeyword(intersectionType.kind)) {
        typeGuardCode.push(generateBigIntKeywordTypeGuard(intersectionType.kind));
    } else if (isSymbolKeyword(intersectionType.kind)) {
        typeGuardCode.push(generateSymbolKeywordTypeGuard(intersectionType.kind));
    } else if (isObjectKeyword(intersectionType.kind)) {
        typeGuardCode.push(generateObjectKeywordTypeGuard(intersectionType.kind));
    } else if (isAnyKeyword(intersectionType.kind)) {
        //skip any keyword
    } else if (isUnknownKeyword(intersectionType.kind)) {
        //skip unknown keyword
    } else if (isNeverKeyword(intersectionType.kind)) {
        //skip never keyword
    } else if (isVoidKeyword(intersectionType.kind)) {
        typeGuardCode.push(generateVoidKeywordTypeGuard(intersectionType.kind));
    } else if (isKeyofKeyword(intersectionType.kind)) {
        //skip keyof keyword for now as it is not supported
    }
    return typeGuardCode;
}
