// Generate type guards for optional properties
import { PropertySignature } from 'typescript';

import { generatePropertyGuard } from './index';

/**
 * TODO: Add support for the following:
 * export type OptionalUser<T> = {
 *     k?: simple;
 *     name?: string;
 *     nested?: {
 *         nestedName?: KeywordUser<T>;
 *     }
 *     nestedArray?: simple[];
 *     nestedArrayKeyword?: string[];
 * }
 * Here the typeguard for the property nestedName should be:
 * ```
 * (typeof value.nested.nestedName === 'undefined' || isKeywordUser<T>(value.nested.nestedName, isT))
 */
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
  typeParameterName?: string,
): string[] {
  const { questionToken, name } = property;
  if (!questionToken) return [];
  const typeGuardCode: string[] = [];
  typeGuardCode.push(
    createTypeguardString(
      parentName ?? name.getText(),
      generatePropertyGuard(property, parentName, typeParameterName)
        .filter(value => typeof value === 'string')
        .join('||'),
    ),
  );
  return typeGuardCode.filter(value => value !== '');
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
  if (text === '') return '';
  if (isTypeReference)
    return `(typeof value.${propertyName} === 'undefined' || is${text}(value.${propertyName}))`;
  return `(typeof value.${propertyName} === 'undefined' || ${text})`;
}
