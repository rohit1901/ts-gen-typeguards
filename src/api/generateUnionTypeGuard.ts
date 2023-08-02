import { isUnionTypeNode, TypeNode } from 'typescript';
import { generateKeywordGuard } from '../api';
import { generateTypeReferenceGuard } from '../api';

export function generateUnionTypeGuard(type: TypeNode, propertyName: string) {
  const typeGuard: string[] = [];
  if (!isUnionTypeNode(type)) return typeGuard;
  if (!type.types) return typeGuard;
  for (const member of type.types) {
    typeGuard.push(...generateKeywordGuard(member, propertyName));
    typeGuard.push(...generateTypeReferenceGuard(member, propertyName));
  }
  return [`(${typeGuard.join('||')})`];
}
