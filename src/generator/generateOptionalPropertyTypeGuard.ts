// Generate type guards for optional properties
import {
  factory,
  isArrayTypeNode,
  isIntersectionTypeNode,
  isLiteralTypeNode,
  isQualifiedName,
  isTupleTypeNode,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertySignature,
  SyntaxKind,
} from 'typescript';
import {
  capitalize,
  getEscapedStringLiteral,
  getLiteralType,
  isKeyword,
} from '../utils';
import {
  generateTypeLiteralTypeGuard,
  generateTypeReferenceTypeGuard,
} from './generateUnionTypeGuard';
import {
  generateIntersectionTypeGuard,
  generateKeywordGuard,
  generateTypeReferenceGuard,
} from '../api';
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
  { questionToken, name, type }: PropertySignature,
  parentName?: string,
): string[] {
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
    // return typeguard for array type
  } else if (isTupleTypeNode(type)) {
    // return typeguard for tuple type
  } else if (isTypeLiteralNode(type)) {
    typeGuardCode.push(
      createTypeguardString(
        parentName ?? name.getText(),
        generateTypeLiteralTypeGuard(type, parentName ?? name.getText()).join(
          '',
        ),
        false,
      ),
    );
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
