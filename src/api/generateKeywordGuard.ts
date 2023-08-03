import {
  isLiteralTypeNode,
  LiteralType,
  SyntaxKind,
  TypeNode,
} from 'typescript';
import {getEscapedStringLiteral, getLiteralType, isKeyword, isLiteral, isLiteralType, syntaxKindToType} from '../utils';

/**
 * Generates type guards for the given TypeScript TypeNode, which can be a keyword or a literal Type.
 * If the property propertyName is not provided, the type looks as follows:
 * ```
 * export type Person4 = number;
 * ```
 * @param {TypeNode} type - The TypeScript TypeNode to generate type guards for.
 * @param {string} [typeName] - Optional property name used in the type guard condition.
 * @param isProperty - Optional boolean indicating whether the type is a property type.
 * @returns {string[]} An array of strings representing the generated type guards.
 */
export function generateKeywordGuard(
  type: TypeNode,
  typeName?: string,
  isProperty?: boolean,
): string[] {
  const typeGuard: string[] = [];
  if (!isKeywordType(type.kind)) {
    return typeGuard;
  }
  if (!isProperty) {
    typeGuard.push(generateKeywordGuardForType(type));
    return typeGuard;
  }
  if (isLiteralTypeNode(type)) {
    typeGuard.push(generateLiteralTypeGuard(typeName, type.literal.kind, type.literal.getText()));
    return typeGuard;
  }
  typeGuard.push(generateKeywordTypeGuard(typeName, type.kind));
  return typeGuard;
}

/**
 * Checks if the provided TypeScript TypeNode is a keyword type or a literal type.
 * A keyword type refers to built-in TypeScript types like string, number, boolean, etc.
 * A literal type is a type that represents a specific value, such as string literals, numeric literals, etc.
 *
 * @param {any} kind - The kind property of the TypeScript TypeNode.
 * @returns {boolean} Returns true if the type is a keyword type or a literal type, otherwise false.
 */
function isKeywordType(kind: any): boolean {
  return isKeyword(kind) || isLiteralTypeNode(kind);
}

/**
 * Generates a type guard condition for a literal type node.
 * @param {string} propertyName - The name of the property being type checked.
 * @param {SyntaxKind} literalKind - The kind of the literal type node.
 * @returns {string} The type guard condition as a string.
 */
function generateLiteralTypeGuard(
  propertyName: string,
  literalKind: SyntaxKind,
  literalText?: string,
): string {
  return `typeof value.${propertyName} === '${getEscapedStringLiteral(literalText) ?? getLiteralType(literalKind)}'`;
}

/**
 * Generates a type guard condition for a keyword type node.
 * @param {string} propertyName - The name of the property being type checked.
 * @param {SyntaxKind} keywordKind - The kind of the keyword type node.
 * @returns {string} The type guard condition as a string.
 */
function generateKeywordTypeGuard(
  propertyName: string,
  keywordKind: SyntaxKind,
): string {
  return `typeof value.${propertyName} === '${syntaxKindToType(keywordKind)}'`;
}

/**
 * Generates a type guard condition for a single keyword type.
 * Ex:
 * ```
 * export type Person4 = number;
 * ```
 * @returns {string} The type guard condition as a string.
 * @param type
 */
export function generateKeywordGuardForType(type: TypeNode): string {
  if(isLiteralTypeNode(type) && isLiteral(type.literal.kind)) return `typeof value === '${getEscapedStringLiteral(type.literal.getText())}'`;
  return `typeof value === '${syntaxKindToType(type.kind)}'`;
}
