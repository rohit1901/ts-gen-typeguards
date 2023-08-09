// Generate type guards for literal types
import {
  isIntersectionTypeNode,
  isPropertySignature,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertySignature,
  TypeAliasDeclaration,
  TypeLiteralNode,
  TypeNode,
} from 'typescript';
import {
  getEscapedCapitalizedStringLiteral,
  getEscapedStringLiteral,
  isPrimitiveSyntaxKind,
  syntaxKindToType,
} from '../utils';
import { generateUnionTypeGuardForProperty } from './generateUnionTypeGuard';
import { generateOptionalPropertyTypeGuard } from './generateOptionalPropertyTypeGuard';
import { generateIntersectionTypeGuardForProperty } from './generateIntersectionTypeGuard';

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
  } else if (isUnionTypeNode(type)) {
    typeGuardCode.push(
      generateUnionTypeGuardForProperty(type, typeAliases, name?.getText()),
    );
  } else if (isIntersectionTypeNode(type)) {
    typeGuardCode.push(
      generateIntersectionTypeGuardForProperty(
        type,
        typeAliases,
        name?.getText(),
      ),
    );
  }
  return typeGuardCode.join('');
}

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
