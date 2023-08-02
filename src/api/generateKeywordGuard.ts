import {isLiteralTypeNode, LiteralType, SyntaxKind, TypeNode} from "typescript";
import { getLiteralType, isKeyword, syntaxKindToType } from "../utils";

/**
 * Generates type guards for the given TypeScript TypeNode, which can be a keyword or a literal Type.
 * If the property propertyName is not provided, the type looks as follows:
 * ```
 * export type Person4 = number;
 * ```
 * @param {TypeNode} type - The TypeScript TypeNode to generate type guards for.
 * @param {string} [propertyName] - Optional property name used in the type guard condition.
 * @returns {string[]} An array of strings representing the generated type guards.
 */
export function generateKeywordGuard(type: TypeNode, propertyName?: string): string[] {
  const typeGuard: string[] = [];
  if (!isKeywordType(type.kind)) {
    return typeGuard;
  }
  if (!propertyName) {
    typeGuard.push(generateKeywordGuardForType(type.kind));
    return typeGuard;
  }
  if (isLiteralTypeNode(type)) {
    typeGuard.push(generateLiteralTypeGuard(propertyName, type.literal.kind));
    return typeGuard;
  }
  typeGuard.push(generateKeywordTypeGuard(propertyName, type.kind));
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
function generateLiteralTypeGuard(propertyName: string, literalKind: SyntaxKind): string {
  return `typeof value.${propertyName} === '${getLiteralType(literalKind)}'`;
}

/**
 * Generates a type guard condition for a keyword type node.
 * @param {string} propertyName - The name of the property being type checked.
 * @param {SyntaxKind} keywordKind - The kind of the keyword type node.
 * @returns {string} The type guard condition as a string.
 */
function generateKeywordTypeGuard(propertyName: string, keywordKind: SyntaxKind): string {
  return `typeof value.${propertyName} === '${syntaxKindToType(keywordKind)}'`;
}

/**
 * Generates a type guard condition for a single keyword type.
 * Ex:
 * ```
 * export type Person4 = number;
 * ```
 * @param {SyntaxKind} keywordKind - The kind of the keyword type.
 * @returns {string} The type guard condition as a string.
 */
function generateKeywordGuardForType(keywordKind: SyntaxKind): string {
  return `typeof value === '${syntaxKindToType(keywordKind)}'`;
}



