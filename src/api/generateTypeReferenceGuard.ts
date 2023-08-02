import { isTypeReferenceNode, TypeNode } from 'typescript';
import { getEscapedCapitalizedStringLiteral } from '../utils';

export function generateTypeReferenceGuard(
  type: TypeNode,
  propertyName: string,
) {
  const typeGuard: string[] = [];
  if (!isTypeReferenceNode(type)) return typeGuard;
  typeGuard.push(
    `is${getEscapedCapitalizedStringLiteral(
      type.typeName.getText(),
    )}(value.${propertyName})`,
  );
  return typeGuard;
}
