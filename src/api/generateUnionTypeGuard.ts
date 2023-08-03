import { isUnionTypeNode, TypeNode } from 'typescript';
import { generateKeywordGuard } from '../api';
import { generateTypeReferenceGuard } from '../api';

/**
 * Generates a type guard for a union type.
 * @param type - The type to generate a type guard for.
 * @param typeName - The name of the type.
 * @param isProperty - Optional. Whether the type is a property.
 */
export function generateUnionTypeGuard(
  type: TypeNode,
  typeName: string,
  isProperty?: boolean,
) {
  const typeGuard: string[] = [];
  if (!isUnionTypeNode(type)) return typeGuard;
  if (!type.types) return typeGuard;
  for (const member of type.types) {
    typeGuard.push(...generateKeywordGuard(member, typeName, isProperty));
    typeGuard.push(...generateTypeReferenceGuard(member, typeName, isProperty));
  }
  return [`(${typeGuard.join('||')})`];
}
