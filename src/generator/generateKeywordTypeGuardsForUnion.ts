import {SyntaxKind} from "typescript";
import {
    isBigIntKeyword,
    isBooleanKeyword,
    isNumberKeyword,
    isObjectKeyword,
    isStringKeyword,
    isSymbolKeyword,
    isUndefinedKeyword,
    isVoidKeyword
} from "../utils";

export function generateStringKeywordTypeGuard(kind: SyntaxKind): string {
    if (isStringKeyword(kind)) {
        return `(typeof value !== 'string')`;
    }
    return '';
}

export function generateNumberKeywordTypeGuard(kind: SyntaxKind): string {
    if (isNumberKeyword(kind)) {
        return `(typeof value !== 'number')`;
    }
    return '';
}

export function generateBigIntKeywordTypeGuard(kind: SyntaxKind): string {
    if (isBigIntKeyword(kind)) {
        return `(typeof value !== 'bigint')`;
    }
    return ''
}

export function generateSymbolKeywordTypeGuard(kind: SyntaxKind): string {
    if (isSymbolKeyword(kind)) {
        return `(typeof value !== 'symbol')`;
    }
    return '';
}

export function generateObjectKeywordTypeGuard(kind: SyntaxKind): string {
    if (isObjectKeyword(kind)) {
        return `(typeof value !== 'object' && value !== null)`;
    }
}

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

export function generateVoidKeywordTypeGuard(kind: SyntaxKind): string {
    if (isVoidKeyword(kind)) {
        return `(value !== undefined)`;
    }
}

export function generateKeyofKeywordTypeGuard(kind: SyntaxKind): string {
    //TODO: fix this function to generate the correct type guard
    /*if(isKeyofKeyword(kind)) {
        return `(typeof value !== keyof)`;
    }
    */
    return '';
}

export function generateBooleanKeywordTypeGuard(type: SyntaxKind): string {
    if (isBooleanKeyword(type)) {
        return `(typeof value !== 'boolean')`;
    }
    return ''
}

export function generateUndefinedKeywordTypeGuard(type: SyntaxKind): string {
    if (isUndefinedKeyword(type)) {
        return `(value !== undefined)`;
    }
    return ''
}