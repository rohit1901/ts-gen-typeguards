import {getEscapedCapitalizedStringLiteral} from 'ts-raw-utils';
import {isQualifiedName, isTypeReferenceNode, QualifiedName, TypeNode, TypeReferenceNode} from 'typescript';

/**
 * Function to generate a type guard for a QualifiedName.
 * A QualifiedName is used to represent a qualified name, e.g. `A.B` in the following code:
 * ```
 * namespace A {
 *  export const B = 1;
 *  export const C = B;
 *  export const D = A.B;
 *  export const E = A.C;
 *  export const F = A.D;
 *  export const G = A.E;
 *  export const H = A.F;
 *  export const I = A.G;
 *  }
 *  ```
 *  where `A.B` is a QualifiedName.
 * @param type - A QualifiedName.
 * @param typeName - The name of the type.
 */
export function generateQualifiedNameTypeGuard(
  type: QualifiedName,
  typeName?: string,
) {
  const v = typeName ? `value.${typeName}` : 'value';
  return `${v} === ${type.left.getText()}.${type.right.getText()}`;
}

/**
 * Function to get the text of a QualifiedName.
 * Example: `A.B` returns `A.B`.
 * @param type
 */
export function getQualifiedNameText(type: QualifiedName) {
  return `${type.left.getText()}.${type.right.getText()}`;
}

/**
 * Function to get the type guard string for a QualifiedName.
 * @param typeArgument - A TypeReferenceNode with a QualifiedName.
 */
export function getTypeArgumentStringForQualifiedName(typeArgument: TypeNode) {
  if(!isTypeReferenceNode(typeArgument)) return;
  if(!isQualifiedName(typeArgument.typeName)) return;
  return `is${getEscapedCapitalizedStringLiteral(
      typeArgument.typeName.left.getText(),
  )}: (v: any) => v is ${getQualifiedNameText(
      typeArgument.typeName,
  )}`;
}

/**
 * Function to get the type argument for a QualifiedName type.
 * @param typeArgument - A TypeReferenceNode with a QualifiedName.
 */
export function getParametersForQualifiedName(typeArgument: TypeNode) {
  if (isTypeReferenceNode(typeArgument)) {
    if (isQualifiedName(typeArgument.typeName)) {
      return typeArgument.typeName.left.getText();
    }
    return typeArgument.typeName.getText();
  }
  return;
}

/**
 * Function to get the type argument for a Keyword type.
 * @param type
 * @param typeName
 */
export function getTypeReferenceGuardForQualifiedName(type: TypeReferenceNode, typeName: string) {
  // Enums: Check if the typeName is a qualified name
  if (!isQualifiedName(type.typeName)) return;
  return generateQualifiedNameTypeGuard(
      type.typeName,
      typeName,
  )
}
