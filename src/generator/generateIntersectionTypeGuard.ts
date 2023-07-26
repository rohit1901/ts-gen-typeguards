import {
  IntersectionTypeNode,
  isIntersectionTypeNode,
  isPropertySignature,
  isTypeLiteralNode,
  isTypeReferenceNode,
  TypeAliasDeclaration,
  TypeLiteralNode,
  TypeReferenceNode,
} from "typescript";
import {
  generateOptionalPropertyTypeGuard,
  generateTypeLiteralTypeGuard,
} from "./";
/**
 * Generate an intersection type guard for a given TypeScript type alias.
 *
 * @param type - The TypeAliasDeclaration representing the intersection type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the intersection.
 * @returns The generated intersection type guard code as a string.
 */
export function generateIntersectionTypeGuard(
  { type }: TypeAliasDeclaration,
  typeAliases: TypeAliasDeclaration[],
): string {
  if (!isIntersectionTypeNode(type)) {
    return "";
  }

  const typeGuardCode: string[] = [];
  const encounteredPropertyNames = new Set<string>();

  for (const intersectionType of type.types) {
    if (isTypeReferenceNode(intersectionType)) {
      generateTypeReferenceTypeGuards(
        intersectionType,
        typeAliases,
        encounteredPropertyNames,
        typeGuardCode,
      );
    } else if (isTypeLiteralNode(intersectionType)) {
      generateTypeLiteralGuards(
        intersectionType,
        encounteredPropertyNames,
        typeGuardCode,
        typeAliases,
      );
    }
  }

  return typeGuardCode.join("");
}
/**
 * Generate type guards for a TypeReferenceNode within an intersection type.
 *
 * @param intersectionType - The TypeReferenceNode representing the intersection type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the intersection.
 * @param encounteredPropertyNames - A set to track property names already processed.
 * @param typeGuardCode - The array to store the generated type guards as strings.
 */
function generateTypeReferenceTypeGuards(
  intersectionType: TypeReferenceNode,
  typeAliases: TypeAliasDeclaration[],
  encounteredPropertyNames: Set<string>,
  typeGuardCode: string[],
): void {
  const typeLiterals = typeAliases.filter(
    (typeAlias) =>
      typeAlias.name.getText() === intersectionType.typeName.getText(),
  );

  for (const literals of typeLiterals) {
    if (isTypeLiteralNode(literals.type)) {
      generateTypeLiteralGuards(
        literals.type,
        encounteredPropertyNames,
        typeGuardCode,
        typeAliases,
      );
    }
  }
}
/**
 * Generate type guards for a TypeLiteralNode within an intersection type.
 *
 * @param typeLiteral - The TypeLiteralNode representing the type literal within the intersection.
 * @param encounteredPropertyNames - A set to track property names already processed.
 * @param typeGuardCode - The array to store the generated type guards as strings.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the intersection.
 */
function generateTypeLiteralGuards(
  typeLiteral: TypeLiteralNode,
  encounteredPropertyNames: Set<string>,
  typeGuardCode: string[],
  typeAliases: TypeAliasDeclaration[],
): void {
  for (const member of typeLiteral.members) {
    if (isPropertySignature(member)) {
      if (isIntersectionTypeNode(member.type)) {
        generateIntersectionTypeGuards(
          member.type,
          encounteredPropertyNames,
          typeGuardCode,
          typeAliases,
        );
      } else {
        const propName = member.name.getText();
        if (!encounteredPropertyNames.has(propName)) {
          encounteredPropertyNames.add(propName);
          typeGuardCode.push(generateOptionalPropertyTypeGuard(member));
          typeGuardCode.push(generateTypeLiteralTypeGuard(member));
        }
      }
    }
  }
}
/**
 * Generate type guards for an IntersectionTypeNode within an intersection type.
 *
 * @param intersectionType - The IntersectionTypeNode representing the intersection type within an intersection.
 * @param encounteredPropertyNames - A set to track property names already processed.
 * @param typeGuardCode - The array to store the generated type guards as strings.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the intersection.
 */
function generateIntersectionTypeGuards(
  intersectionType: IntersectionTypeNode,
  encounteredPropertyNames: Set<string>,
  typeGuardCode: string[],
  typeAliases: TypeAliasDeclaration[],
): void {
  for (const intersectionMember of intersectionType.types) {
    if (isTypeReferenceNode(intersectionMember)) {
      // TODO: handle intersection type reference
      generateTypeReferenceTypeGuards(
        intersectionMember,
        typeAliases,
        encounteredPropertyNames,
        typeGuardCode,
      );
    } else if (isTypeLiteralNode(intersectionMember)) {
      // TODO: handle intersection type literal
      generateTypeLiteralGuards(
        intersectionMember,
        encounteredPropertyNames,
        typeGuardCode,
        typeAliases,
      );
    } else {
      // TODO: handle other types
    }
  }
}
