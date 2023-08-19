import {
  factory,
  isArrayTypeNode,
  isTypeLiteralNode,
  isUnionTypeNode,
  TypeAliasDeclaration,
  TypeNode,
} from 'typescript';
import {
  generateArrayTypeGuard,
  generateIntersectionTypeGuard,
  generateKeywordGuard,
  generatePropertyGuard,
  generateTypeReferenceGuard,
} from '../api';
import { handleIntersectionTypesForTypeNode } from '../utils';

/**
 * Generates a type guard for a property based on its TypeScript PropertySignature.
 * @param newMember
 * @param typeGuard
 */
function generatePropertyTypeGuard(newMember: TypeNode, typeGuard: string[]) {
  const typeGuardCode: string[] = [];
  if (isTypeLiteralNode(newMember)) {
    for (const prop of newMember.members) {
      typeGuard.push(...generatePropertyGuard(prop));
    }
  }
  return typeGuardCode;
}

/**
 * Generates a type guard for a union type.
 * @param type - The type to generate a type guard for.
 * @param typeName - The name of the type.
 * @param definitions - An array of TypeAliasDeclarations to find related types.
 * @param isProperty - Optional. Whether the type is a property.
 */
export function generateUnionTypeGuard(
  type: TypeNode,
  typeName: string,
  isProperty?: boolean,
  definitions?: TypeAliasDeclaration[],
) {
  const typeGuard: string[] = [];
  if (!isUnionTypeNode(type)) return typeGuard;
  if (!type.types) return typeGuard;
  for (const member of type.types) {
    const newMember = handleIntersectionTypesForTypeNode(member, definitions);
    typeGuard.push(
      ...generateIntersectionTypeGuard(newMember, typeName, isProperty),
      ...generateKeywordGuard(newMember, typeName, isProperty),
      ...generateTypeReferenceGuard(newMember, typeName, isProperty),
    );
    if (isArrayTypeNode(newMember)) {
      typeGuard.push(
        generateArrayTypeGuard(
          factory.createPropertySignature(
            undefined,
            undefined,
            undefined,
            newMember,
          ),
        ),
      );
    }
    typeGuard.push(...generatePropertyTypeGuard(newMember, typeGuard));
  }
  return [`(${typeGuard.join('||')})`];
}
