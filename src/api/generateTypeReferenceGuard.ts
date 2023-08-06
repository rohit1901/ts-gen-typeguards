import { isQualifiedName, isTypeReferenceNode, TypeNode } from 'typescript';
import { getEscapedCapitalizedStringLiteral } from '../utils';
import { generateQualifiedNameTypeGuard } from '../generator';

/**
 * Function to generate a type guard for a TypeReferenceNode. Used to generate type guard string for type aliases.
 * @param type - A TypeNode.
 * @param typeName - The name of the type.
 * @param isProperty - Optional boolean to indicate if the type is a property.
 */
export function generateTypeReferenceGuard(
  type: TypeNode,
  typeName: string,
  isProperty?: boolean,
) {
  const typeGuard: string[] = [];
  if (!isTypeReferenceNode(type)) return typeGuard;
  if (isProperty) {
    if (isQualifiedName(type.typeName)) {
      typeGuard.push(generateQualifiedNameTypeGuard(type.typeName, typeName));
      return typeGuard;
    }
    typeGuard.push(
      `is${getEscapedCapitalizedStringLiteral(
        type.typeName.getText(),
      )}(value.${typeName})`,
    );
    return typeGuard;
  }
  typeGuard.push(
    `is${getEscapedCapitalizedStringLiteral(type.typeName.getText())}(value)`,
  );
  return typeGuard;
}
