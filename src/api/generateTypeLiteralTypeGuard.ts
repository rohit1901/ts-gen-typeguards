// Generate type guards for literal types
import {
  isPropertySignature,
  isTypeReferenceNode,
  PropertySignature,
  TypeAliasDeclaration,
  TypeLiteralNode,
} from 'typescript';
import { isPrimitiveSyntaxKind, syntaxKindToType } from '../utils';
import { generateUnionTypeGuardForProperty } from '../api';
import { generateIntersectionTypeGuardForProperty } from '../api';
import {
  getEscapedCapitalizedStringLiteral,
  getEscapedStringLiteral,
} from 'ts-raw-utils';

/**
 * Generates a type guard for a property based on its TypeScript PropertySignature.
 *
 * @param {PropertySignature} propertySignature - The TypeScript PropertySignature representing the property.
 * @param {TypeAliasDeclaration[]} typeAliases - An array of TypeScript TypeAliasDeclaration(s) used for generating the type guard.
 * @returns {string} The generated type guard code as a string.
 */
export function generatePropertyTypeGuard(
  { questionToken, name, type }: PropertySignature,
  typeAliases: TypeAliasDeclaration[],
): string {
  const propType = syntaxKindToType(type.kind);
  const typeGuardCode: string[] = [];
  if (isTypeReferenceNode(type) && !questionToken) {
    typeGuardCode.push(
      `if (!value.hasOwnProperty('${getEscapedStringLiteral(
        name.getText(),
      )}') || !is${getEscapedCapitalizedStringLiteral(
        type.typeName.getText(),
      )}(value.${getEscapedStringLiteral(name.getText())})) {`,
    );
    typeGuardCode.push(`    return false;\n`);

    typeGuardCode.push(`}\n`);
  } else if (isPrimitiveSyntaxKind(type.kind) && !questionToken) {
    typeGuardCode.push(
      `if (!value.hasOwnProperty('${getEscapedStringLiteral(
        name.getText(),
      )}') || typeof value.${getEscapedStringLiteral(
        name.getText(),
      )} !== '${propType}') {`,
    );
    typeGuardCode.push(`    return false;\n`);

    typeGuardCode.push(`}\n`);
  }
  typeGuardCode.push(
    generateUnionTypeGuardForProperty(type, typeAliases, name?.getText()),
    generateIntersectionTypeGuardForProperty(
      type,
      typeAliases,
      name?.getText(),
    ),
  );
  return typeGuardCode.join('');
}
/**
 * Generates TypeScript type guards for a given TypeLiteralNode by iterating through its members
 * and generating type guards for property signatures.
 *
 * @param {TypeLiteralNode} typeLiteral - The TypeLiteralNode representing the type to generate type guards for.
 * @param {TypeAliasDeclaration[]} typeAliases - An array of TypeAliasDeclaration objects to reference type aliases.
 * @param {string} [parentName] - Optional parent name to use in the type guard names.
 * @returns {string[]} An array of strings containing the generated type guard code for the property signatures.
 */
export function generateTypeLiteralTypeGuard(
  typeLiteral: TypeLiteralNode,
  typeAliases: TypeAliasDeclaration[],
  parentName?: string,
): string[] {
  const typeGuardCode: string[] = [];
  typeLiteral.members.forEach(member => {
    if (isPropertySignature(member)) {
      typeGuardCode.push(generatePropertyTypeGuard(member, typeAliases));
    }
  });
  return typeGuardCode;
}
