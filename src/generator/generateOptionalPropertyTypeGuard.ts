// Generate type guards for optional properties
import {
  isArrayTypeNode,
  isIntersectionTypeNode,
  isLiteralTypeNode,
  isTupleTypeNode,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertySignature,
} from 'typescript';
import { capitalize, isKeyword } from '../utils';
import {
  generateTypeLiteralTypeGuard,
  generateTypeReferenceTypeGuard,
} from './generateUnionTypeGuard';

/**
 * Generates Typeguards for an Optional property which could be of the following types:
 * - LiteralType
 * - TypeReference
 * - UnionType
 * - IntersectionType
 * - KeywordType
 * - ArrayType
 * - TupleType
 * - TypeLiteral
 * The would look like:
 * ```
 * (value.property === 'undefined' || isLiteralType(value.property))
 * ```
 */
export function generateOptionalPropertyTypeGuard(
  { questionToken, name, type }: PropertySignature,
  parentName?: string,
): string[] {
  if (!questionToken) return [];
  const typeGuardCode: string[] = [];
  if (isLiteralTypeNode(type)) {
    typeGuardCode.push(
      createTypeguardString(
        name.getText(),
        `value.${name.getText()} === ${type.getText()}`,
        false,
      ),
    );
  } else if (isTypeReferenceNode(type)) {
    typeGuardCode.push(
      createTypeguardString(name.getText(), capitalize(type.getText()), true),
    );
    // return typeguard for type reference
  } else if (isUnionTypeNode(type)) {
    // return typeguard for union type
  } else if (isIntersectionTypeNode(type)) {
    // return typeguard for intersection type
  } else if (isKeyword(type.kind)) {
    typeGuardCode.push(
      createTypeguardString(
        name.getText(),
        `typeof value.${name.getText()} === '${type.getText()}'`,
        false,
      ),
    );
    // return typeguard for keyword type
  } else if (isArrayTypeNode(type)) {
    // return typeguard for array type
  } else if (isTupleTypeNode(type)) {
    // return typeguard for tuple type
  } else if (isTypeLiteralNode(type)) {
    const text = generateTypeLiteralTypeGuard(type, parentName).join('');
    console.log('text', text, parentName);
    typeGuardCode.push(createTypeguardString(name.getText(), text));
  } else {
    console.error('Unsupported type', name, type.getText());
  }
  return typeGuardCode;
}
function createTypeguardString(
  propertyName: string,
  text: string,
  isTypeReference?: boolean,
) {
  if (isTypeReference)
    return `(typeof value.${propertyName} === 'undefined' || is${text}(value.${propertyName}))`;
  return `(typeof value.${propertyName} === 'undefined' || ${text})`;
}
