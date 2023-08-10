import {
  isTypeLiteralNode,
  isUnionTypeNode,
  TypeAliasDeclaration,
  TypeNode,
} from 'typescript';
import {
  generateIntersectionTypeGuard,
  generateKeywordGuard,
  generatePropertyGuard,
} from '../api';
import { generateTypeReferenceGuard } from '../api';
import {
  handleIntersectionTypesForTypeNode,
} from '../utils';

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
    );
    typeGuard.push(...generateKeywordGuard(newMember, typeName, isProperty));
    typeGuard.push(
      ...generateTypeReferenceGuard(newMember, typeName, isProperty),
    );
    if (isTypeLiteralNode(newMember)) {
      for (const prop of newMember.members) {
        typeGuard.push(...generatePropertyGuard(prop));
      }
    }
  }
  return [`(${typeGuard.join('||')})`];
}
