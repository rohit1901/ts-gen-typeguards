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
