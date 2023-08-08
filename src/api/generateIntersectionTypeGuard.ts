import { isIntersectionTypeNode, TypeNode } from 'typescript';
import { generateKeywordGuard } from '../api';
import { generateTypeReferenceGuard } from '../api';

/**
 * Generates a type guard for an IntersectionTypeNode.
 *
 * This function takes a TypeNode representing an intersection type, the name of the type,
 * and an optional boolean flag to indicate if the type is a property. It generates and
 * returns an array of type guard code snippets for the provided intersection type.
 *
 * @param type - A TypeNode representing an IntersectionTypeNode.
 * @param typeName - The name of the intersection type.
 * @param isProperty - Optional boolean flag indicating if the type is a property.
 *
 * @returns An array of strings representing type guard code snippets for the intersection type.
 *
 * @example
 * // Example usage with a type intersection
 * const intersectionType: IntersectionTypeNode = ...;
 * const typeName = 'MyIntersection';
 * const isProperty = true;
 * const typeGuardSnippets = generateIntersectionTypeGuard(intersectionType, typeName, isProperty);
 * // typeGuardSnippets will contain an array of type guard code snippets.
 *
 * @remarks
 * This function generates type guard code snippets for each member type within the intersection.
 * It uses helper functions generateKeywordGuard and generateTypeReferenceGuard to compose
 * the type guard snippets.
 * If the provided type is not an IntersectionTypeNode or if the type does not have any member
 * types, an empty array is returned.
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
