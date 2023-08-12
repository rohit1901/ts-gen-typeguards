// Generate type guards for optional properties
import {
  factory,
  isArrayTypeNode,
  isIntersectionTypeNode,
  isLiteralTypeNode, isOptionalTypeNode,
  isQualifiedName,
  isTupleTypeNode,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertySignature,
  SyntaxKind,
} from 'typescript';
import { capitalize, getEscapedStringLiteral, isKeyword } from '../utils';
import { generateTypeLiteralTypeGuardWithinUnion } from './generateUnionTypeGuardForIntersection';
import { generateArrayTypeGuard, generateIntersectionTypeGuard } from './index';
import { getQualifiedNameText } from './generateQualifiedNameTypeGuard';

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
  property: PropertySignature,
  parentName?: string,
): string[] {
  const { questionToken, name, type } = property;
  if (!questionToken) return [];
  const typeGuardCode: string[] = [];
  // check if the type is a TypeReference
  if (isTypeReferenceNode(type)) {
    if (isQualifiedName(type.typeName)) {
      typeGuardCode.push(
        createTypeguardString(
          parentName ?? name.getText(),
          `value.${parentName ?? name.getText()} === ${getQualifiedNameText(
            type.typeName,
          )}`,
          false,
        ),
      );
    } else {
      typeGuardCode.push(
        createTypeguardString(
          parentName ?? name.getText(),
          capitalize(type.getText()),
          true,
        ),
      );
    }
  } else if (isKeyword(type.kind) && type.kind !== SyntaxKind.LiteralType) {
    typeGuardCode.push(
      createTypeguardString(
        parentName ?? name.getText(),
        `typeof value.${
          parentName ?? name.getText()
        } === '${getEscapedStringLiteral(type.getText())}'`,
        false,
      ),
    );
  } else if (isLiteralTypeNode(type)) {
    typeGuardCode.push(
      createTypeguardString(
        parentName ?? name.getText(),
        `value.${parentName ?? name.getText()} === ${type.getText()}`,
        false,
      ),
    );
  } else if (isUnionTypeNode(type)) {
    for (const member of type.types) {
      // push typeguard for each member of the union type
    }
  } else if (isIntersectionTypeNode(type)) {
    typeGuardCode.push(
      createTypeguardString(
        name.getText(),
        generateIntersectionTypeGuard(type, name.getText(), true).join(' && '),
        false,
      ),
    );
  } else if (isArrayTypeNode(type)) {
    typeGuardCode.push(
      createTypeguardString(
        parentName ?? name.getText(),
        generateArrayTypeGuard(property, parentName ?? name.getText()),
      ),
    );
  } else if (isTupleTypeNode(type)) {
    // return typeguard for tuple type
  } else if (isTypeLiteralNode(type)) {
    typeGuardCode.push(
      createTypeguardString(
        parentName ?? name.getText(),
        generateTypeLiteralTypeGuardWithinUnion(
          type,
          parentName ?? name.getText(),
        ).join(''),
        false,
      ),
    );
  }
  else {
    console.error('Unsupported type', name.getText(), type.getText());
  }
  return typeGuardCode;
}
/**
 * Creates a conditional expression string for a type guard based on a property's type check.
 *
 * @param {string} propertyName - The name of the property to check.
 * @param {string} text - The type guard condition text.
 * @param {boolean} [isTypeReference] - Whether the type guard condition should use a type reference check.
 * @returns {string} The conditional expression string for the type guard.
 */
function createTypeguardString(
  propertyName: string,
  text: string,
  isTypeReference?: boolean,
) {
  if (isTypeReference)
    return `(typeof value.${propertyName} === 'undefined' || is${text}(value.${propertyName}))`;
  return `(typeof value.${propertyName} === 'undefined' || ${text})`;
}
