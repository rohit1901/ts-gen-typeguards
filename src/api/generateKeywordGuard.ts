import { isLiteralTypeNode, SyntaxKind, TypeNode } from 'typescript';
import {
  getLiteralType,
  isAnyKeyword,
  isKeyword,
  isLiteralType,
  isNeverKeyword,
  isUnknownKeyword,
  syntaxKindToType,
} from '../utils';

/**
 * Generates type guards for the given TypeScript TypeNode, which can be a keyword or a literal Type.
 * In case of any, unknown or never keyword, the type guard condition is not generated as it is already checked using the hasOwnProperty check.
 * If the property propertyName is not provided, the type looks as follows:
 * @example
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
    typeGuard.push(
      generateLiteralTypeGuard(
        typeName,
        type.literal.kind,
        type.literal.getText(),
      ),
    );
    return typeGuard;
  }
  typeGuard.push(generateKeywordTypeGuard(typeName, type.kind));
  return typeGuard;
}

/**
 * Generates a type guard condition for a single keyword type.
 * The generated condition checks if a given value conforms to the specified keyword type.
 *
 * @example
 * ```typescript
 * const isPerson4 = generateKeywordGuardForType(factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword));
 * const result = isPerson4(42); // true
 * ```
 *
 * @param {TypeNode} type - The TypeScript keyword type node to generate the type guard for.
 * @returns {string} The type guard condition as a string.
 */
export function generateKeywordGuardForType(type: TypeNode): string {
  //NOTE: In case of unknown, never or any keyword, we don't need to check the type as it is already checked using the hasOwnProperty check.
  if (
    isUnknownKeyword(type.kind) ||
    isNeverKeyword(type.kind) ||
    isAnyKeyword(type.kind)
  ) {
    console.info(
      'INFO: Unknown, never or any keyword found. Skipping typeguard for',
      type.getText(),
    );
    return;
  }
  if (isLiteralType(type.kind)) return `value === ${type.getText()}`;
  return `typeof value === '${syntaxKindToType(type.kind)}'`;
}

/**
 * Checks if the provided TypeScript TypeNode is a keyword type or a literal type.
 * A keyword type refers to built-in TypeScript types like string, number, boolean, etc.
 * A literal type is a type that represents a specific value, such as string literals, numeric literals, etc.
 *
 * @param {any} kind - The kind property of the TypeScript TypeNode.
 * @returns {boolean} Returns true if the type is a keyword type or a literal type, otherwise false.
 */
export function isKeywordType(kind: any): boolean {
  return isKeyword(kind) || isLiteralTypeNode(kind);
}

/**
 * Generates a type guard condition for a literal type node.
 * @param {string} propertyName - The name of the property being type checked.
 * @param {SyntaxKind} literalKind - The kind of the literal type node.
 * @param literalText
 * @returns {string} The type guard condition as a string.
 */
export function generateLiteralTypeGuard(
  propertyName: string,
  literalKind: SyntaxKind,
  literalText?: string,
): string {
  function getText(literalText?: string) {
    if (typeof literalText === 'string') {
      return literalText;
    }
    return;
  }

  return `value.${propertyName} === ${
    getText(literalText) ?? getLiteralType(literalKind)
  }`;
}

/**
 * Generates a type guard condition for a keyword type node.
 * @param type
 * @param {string} propertyName - The name of the property being type checked.
 * @param {SyntaxKind} keywordKind - The kind of the keyword type node.
 * @returns {string} The type guard condition as a string.
 */
export function generateKeywordTypeGuard(
  propertyName: string,
  keywordKind: SyntaxKind,
): string {
  //NOTE: In case of unknown, never or any keyword, we don't need to check the type as it is already checked using the hasOwnProperty check.
  if (
    isUnknownKeyword(keywordKind) ||
    isNeverKeyword(keywordKind) ||
    isAnyKeyword(keywordKind)
  ) {
    console.info(
      'INFO: Unknown, never or any keyword found. Skipping typeguard for',
      propertyName,
    );
    return;
    //return generateAnyUnknownNeverKeywordGuard(type);
  }
  return `typeof value.${propertyName} === '${syntaxKindToType(keywordKind)}'`;
}
