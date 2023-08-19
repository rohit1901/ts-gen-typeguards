import { SyntaxKind } from 'typescript';
import {
  isBigIntKeyword,
  isBooleanKeyword,
  isNumberKeyword,
  isObjectKeyword,
  isStringKeyword,
  isSymbolKeyword,
  isUndefinedKeyword,
  isVoidKeyword,
} from '../utils';

/**
 * Generates a type guard for the string keyword.
 *
 * @param {SyntaxKind} kind - The syntax kind to check.
 * @returns {string} The generated type guard code.
 */
export function generateStringKeywordTypeGuard(kind: SyntaxKind): string {
  if (isStringKeyword(kind)) {
    return `(typeof value !== 'string')`;
  }
  return '';
}
/**
 * Generates a type guard for the number keyword.
 *
 * @param {SyntaxKind} kind - The syntax kind to check.
 * @returns {string} The generated type guard code.
 */
export function generateNumberKeywordTypeGuard(kind: SyntaxKind): string {
  if (isNumberKeyword(kind)) {
    return `(typeof value !== 'number')`;
  }
  return '';
}
/**
 * Generates a type guard for the bigint keyword.
 *
 * @param {SyntaxKind} kind - The syntax kind to check.
 * @returns {string} The generated type guard code.
 */
export function generateBigIntKeywordTypeGuard(kind: SyntaxKind): string {
  if (isBigIntKeyword(kind)) {
    return `(typeof value !== 'bigint')`;
  }
  return '';
}
/**
 * Generates a type guard for the symbol keyword.
 *
 * @param {SyntaxKind} kind - The syntax kind to check.
 * @returns {string} The generated type guard code.
 */

export function generateSymbolKeywordTypeGuard(kind: SyntaxKind): string {
  if (isSymbolKeyword(kind)) {
    return `(typeof value !== 'symbol')`;
  }
  return '';
}
/**
 * Generates a type guard for the object keyword.
 *
 * @param {SyntaxKind} kind - The syntax kind to check.
 * @returns {string} The generated type guard code.
 */
export function generateObjectKeywordTypeGuard(kind: SyntaxKind): string {
  if (isObjectKeyword(kind)) {
    return `(typeof value !== 'object' && value !== null)`;
  }
}
/**
 * Generates a type guard for the 'any' keyword.
 * NOTE: any keyword is not a type guard and typeguard should not be generated for it.
 */
export function generateAnyKeywordTypeGuard(kind: SyntaxKind) {
  //NOTE: any keyword is not a type guard and typeguard should not be generated for it
  return;
}

/**
 * NOTE: If `someType` is defined as `export someType = unknown`, then the type is `unknown`,
 * which is a special top type in TypeScript. Unlike regular types, `unknown` represents an unknown value
 * and is not assignable to any other type without a proper type assertion or narrowing.
 *
 * To create a type guard for `unknown`, you can use a function like this:
 *
 * ```typescript
 * export type someType = unknown;
 *
 * // Type guard function for someType
 * function isSomeType(value: any): value is someType {
 *   return typeof value !== 'undefined' && value !== null;
 * }
 * ```
 *
 * In this case, the type guard `isSomeType` checks that the `value` is neither `undefined` nor `null`,
 * which narrows the type to `someType`. The `typeof value !== 'undefined'` condition is necessary
 * because `undefined` is also considered to be of type `unknown`, so we need to exclude it explicitly.
 *
 * Remember that when working with `unknown`, you should handle it carefully, and type assertions
 * might be needed to use it as a specific type once you are certain about its actual type.
 */
export function generateUnknownKeywordTypeGuard(kind: SyntaxKind) {
  return;
}

export function generateNeverKeywordTypeGuard(kind: SyntaxKind) {
  //NOTE: never keyword is not a type guard and typeguard should not be generated for it
  return;
}
/**
 * Generates a type guard for the void keyword.
 *
 * @param {SyntaxKind} kind - The syntax kind to check.
 * @returns {string} The generated type guard code.
 */
export function generateVoidKeywordTypeGuard(kind: SyntaxKind): string {
  if (isVoidKeyword(kind)) {
    return `(value !== undefined)`;
  }
}
/**
 * Generates a type guard for the keyof keyword.
 *
 * @param {SyntaxKind} kind - The syntax kind to check.
 * @returns {string} The generated type guard code.
 */
export function generateKeyofKeywordTypeGuard(kind: SyntaxKind): string {
  //TODO: fix this function to generate the correct type guard
  /*if(isKeyofKeyword(kind)) {
        return `(typeof value !== keyof)`;
    }
    */
  return '';
}
/**
 * Generates a type guard for the boolean keyword.
 *
 * @returns {string} The generated type guard code.
 * @param type
 */
export function generateBooleanKeywordTypeGuard(type: SyntaxKind): string {
  if (isBooleanKeyword(type)) {
    return `(typeof value !== 'boolean')`;
  }
  return '';
}
/**
 * Generates a type guard for the undefined keyword.
 *
 * @returns {string} The generated type guard code.
 * @param type
 */
export function generateUndefinedKeywordTypeGuard(type: SyntaxKind): string {
  if (isUndefinedKeyword(type)) {
    return `(value !== undefined)`;
  }
  return '';
}
