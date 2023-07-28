// Generate type guards for literal types
import {
  factory,
  isIntersectionTypeNode,
  isPropertySignature,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertySignature,
  TypeAliasDeclaration,
  TypeNode,
} from "typescript";
import {
  getEscapedCapitalizedStringLiteral,
  getEscapedStringLiteral,
  getMembersFromTypeAlias,
  isKeywordSyntaxKind,
  isPrimitiveSyntaxKind,
  syntaxKindToType,
} from "../utils";
import {
  generateUnionTypeGuard,
  generateUnionTypeGuardForProperty,
} from "./generateUnionTypeGuard";
import { generateOptionalPropertyTypeGuard } from "./generateOptionalPropertyTypeGuard";
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
      generateUnionTypeGuardForProperty(type, typeAliases, name?.getText()),
    );
  }
  return typeGuardCode.join("");
}
/**
 * Generates unique type guards for a given TypeLiteral node by iterating through its properties.
 *
 * @param {TypeNode} type - The TypeNode to analyze.
 * @param {Set<string>} propSet - A Set to track the properties already processed to avoid duplicates.
 * @param {string[]} typeGuardCode - An array to store the generated type guards.
 * @param {TypeAliasDeclaration[]} typeAliases - An array of TypeAliasDeclaration to consider when generating type guards.
 */

export function generateUniqueTypeGuardsFromTypeLiteral(
  type: TypeNode,
  propSet: Set<string>,
  typeGuardCode: string[],
  typeAliases: TypeAliasDeclaration[],
) {
  if (isTypeLiteralNode(type)) {
    const properties = type.members;
    for (const property of properties) {
      if (propSet.has(property.name.getText())) {
        return;
      }
      propSet.add(property.name.getText());
      if (isPropertySignature(property)) {
        typeGuardCode.push(
          generateOptionalPropertyTypeGuard(property, typeAliases),
        );
        typeGuardCode.push(generatePropertyTypeGuard(property, typeAliases));
      }
    }
  }
}
