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
 * @example
 * export type Person = {
 *  name: string;
 * }
 * export type Employee = {
 *  person?: Person;
 * }
 * ```
 * (value.person === 'undefined' || isPerson(value.person))
 * ```
 */
export function generateOptionalPropertyTypeGuard(
  { questionToken, name, type }: PropertySignature,
  parentName?: string,
): string[] {
  if (!questionToken) return [];
  const typeGuardCode: string[] = [];
  // check if the type is a TypeReference
  if (isTypeReferenceNode(type)) {
    typeGuardCode.push(
      createTypeguardString(name.getText(), capitalize(type.getText()), true),
    );
  } else if (isKeyword(type.kind)) {
    typeGuardCode.push(
      createTypeguardString(
        name.getText(),
        `typeof value.${name.getText()} === ${type.getText()}`,
        false,
      ),
    );
  } else if (isLiteralTypeNode(type)) {
    typeGuardCode.push(
      createTypeguardString(
        name.getText(),
        `value.${name.getText()} === ${type.getText()}`,
        false,
      ),
    );
  } else if (isUnionTypeNode(type)) {
    for (const member of type.types) {
      // push typeguard for each member of the union type
    }
  } else if (isIntersectionTypeNode(type)) {
    for (const member of type.types) {
      // push typeguard for each member of the intersection type
    }
    // return typeguard for intersection type
  } else if (isArrayTypeNode(type)) {
    // return typeguard for array type
  } else if (isTupleTypeNode(type)) {
    // return typeguard for tuple type
  } else if (isTypeLiteralNode(type)) {
    // return typeguard for TypeLiteral
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
