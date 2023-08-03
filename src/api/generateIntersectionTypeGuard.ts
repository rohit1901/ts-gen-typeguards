import { isIntersectionTypeNode, TypeNode } from 'typescript';
import { generateKeywordGuard } from '../api';
import { generateTypeReferenceGuard } from '../api';

/**
 * Function to generate a type guard for an IntersectionTypeNode.
 * @param type - A TypeNode.
 * @param typeName - The name of the type.
 * @param isProperty - Optional boolean to indicate if the type is a property.
 */
export function generateIntersectionTypeGuard(
  type: TypeNode,
  typeName: string,
  isProperty?: boolean,
) {
  const typeGuard: string[] = [];
  if (!isIntersectionTypeNode(type)) return typeGuard;
  if (!type.types) return typeGuard;
  for (const member of type.types) {
    typeGuard.push(...generateKeywordGuard(member, typeName, isProperty));
    typeGuard.push(...generateTypeReferenceGuard(member, typeName, isProperty));
  }
  return typeGuard;
}

