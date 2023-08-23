import {
  isQualifiedName,
  isTypeReferenceNode,
  TypeNode, TypeReferenceNode,
} from 'typescript';
import {
} from '../utils';
import {
  generateQualifiedNameTypeGuard,
} from '../api';
import { getEscapedCapitalizedStringLiteral } from 'ts-raw-utils';
/**
 * Generates a type guard for a TypeReferenceNode. Used to generate type guard string for type aliases.
 * @param type - A TypeNode.
 * @param typeName - The name of the type.
 * @param isProperty - Optional boolean to indicate if the type is a property.
 * @param typeParameters
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
          isProperty?typeName:undefined,
      ),
    );
    return typeGuard;
  }
  if (isProperty) {
    // Generate type guard for property
    typeGuard.push(
      `is${getEscapedCapitalizedStringLiteral(
        type.typeName.getText(),
      )}${buildTypeArguments(type)}(value.${typeName})`,
    );
    return typeGuard;
  }
  // Generate type guard for non-property
  typeGuard.push(
    `is${getEscapedCapitalizedStringLiteral(type.typeName.getText())}${
        buildTypeArguments(type)
    }(value)`,
  );
  return typeGuard;
}

/**
 * Generates strings for TypeArguments if a TypeReferenceNode has them.
 * TypeArguments look like:
 * ```
 * <T>
 * <T, U>
 * <string>
 * ```
 * Result:
 * - <T>
 * - <T, U>
 * - <string>
 * @param typeReference - A TypeReferenceNode from which TypeArguments will be extracted.
 */
function buildTypeArguments(typeReference: TypeReferenceNode) {
  const typeArguments= typeReference.typeArguments?.map((typeArgument) => {
    if (isTypeReferenceNode(typeArgument)) {
      return typeArgument.typeName.getText();
    }
    return typeArgument.getText();
  }).join(', ');
  if(typeArguments) return `<${typeArguments}>`;
  return '';
}
function buildGenericParameterList(genericNames?: string) {
  if(genericNames) {
    `<${genericNames}>`
  }
  return ''
}
