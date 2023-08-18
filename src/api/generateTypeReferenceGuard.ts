import { isQualifiedName, isTypeReferenceNode, TypeNode } from 'typescript';
import {
  getEscapedCapitalizedStringLiteral,
  getTernaryOperatorResult,
} from '../utils';
import { generateQualifiedNameTypeGuard } from '../api';

/**
 * Generates a type guard for a TypeReferenceNode. Used to generate type guard string for type aliases.
 * @param type - A TypeNode.
 * @param typeName - The name of the type.
 * @param isProperty - Optional boolean to indicate if the type is a property.
 * @returns An array of type guard strings.
 *
 * @example
 * // For type alias `Person` with property `name`
 * const typeNode = factory.createTypeReferenceNode('Person', []);
 * const typeName = 'name';
 * const typeGuards = generateTypeReferenceGuard(typeNode, typeName, true);
 * // Result: ['isPerson(value.name)']
 *
 * @example
 * // For type alias `Point`
 * const typeNode = factory.createTypeReferenceNode('Point', []);
 * const typeName = 'point';
 * const typeGuards = generateTypeReferenceGuard(typeNode, typeName);
 * // Result: ['isPoint(value)']
 */
export function generateTypeReferenceGuard(
  type: TypeNode,
  typeName: string,
  isProperty?: boolean,
) {
  const typeGuard: string[] = [];
  if (!isTypeReferenceNode(type)) return typeGuard;
  // Enums: Check if the typeName is a qualified name
  if (isQualifiedName(type.typeName)) {
    typeGuard.push(
      generateQualifiedNameTypeGuard(
        type.typeName,
        getTernaryOperatorResult(isProperty, typeName),
      ),
    );
    return typeGuard;
  }
  if (isProperty) {
    // Generate type guard for property
    typeGuard.push(
      `is${getEscapedCapitalizedStringLiteral(
        type.typeName.getText(),
      )}(value.${typeName})`,
    );
    return typeGuard;
  }
  // Generate type guard for non-property
  typeGuard.push(
    `is${getEscapedCapitalizedStringLiteral(type.typeName.getText())}(value)`,
  );
  return typeGuard;
}
