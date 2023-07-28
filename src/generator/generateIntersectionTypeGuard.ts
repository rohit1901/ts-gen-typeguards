import {
  factory,
  IntersectionTypeNode,
  isIntersectionTypeNode,
  isLiteralTypeNode,
  isPropertySignature,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertyName,
  TypeAliasDeclaration,
  TypeLiteralNode,
  TypeNode,
  TypeReferenceNode,
} from "typescript";
import {
  generateOptionalPropertyTypeGuard,
  generateUniqueTypeGuardsFromTypeLiteral,
  generateUnionTypeGuard,
  generateUndefinedKeywordTypeGuard,
  generateBooleanKeywordTypeGuard,
  generateStringKeywordTypeGuard,
  generateNumberKeywordTypeGuard,
  generateBigIntKeywordTypeGuard,
  generateSymbolKeywordTypeGuard,
  generateObjectKeywordTypeGuard,
  generateVoidKeywordTypeGuard,
} from "./";
import { generatePropertyTypeGuard } from "./generateTypeLiteralTypeGuard";
import { generateLiteralTypeTypeGuard } from "./generateLiteralTypeTypeGuard";
import {
  isAnyKeyword,
  isBigIntKeyword,
  isBooleanKeyword,
  isKeyofKeyword,
  isNeverKeyword,
  isNumberKeyword,
  isObjectKeyword,
  isStringKeyword,
  isSymbolKeyword,
  isUndefinedKeyword,
  isUnknownKeyword,
  isVoidKeyword,
} from "../utils";
import {
  generateTypeLiteralTypeGuard,
  generateTypeReferenceTypeGuard,
} from "./generateUnionTypeGuard";
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
  name?: PropertyName,
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
        name,
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
  name?: PropertyName,
): void {
  for (const member of typeLiteral.members) {
    if (isPropertySignature(member)) {
      if (isIntersectionTypeNode(member.type)) {
        generateIntersectionTypeGuardForProperty(
          member.type,
          typeAliases,
          member.name.getText(),
        );
      } else if (isUnionTypeNode(member.type)) {
        generateUnionTypeGuard(
          factory.createTypeAliasDeclaration(
            undefined,
            factory.createIdentifier(member.name.getText()),
            undefined,
            member.type,
          ),
          typeAliases,
        );
      } else {
        const propName = member.name.getText();
        if (!encounteredPropertyNames.has(propName)) {
          encounteredPropertyNames.add(propName);
          typeGuardCode.push(
            generateOptionalPropertyTypeGuard(member, typeAliases),
          );
          typeGuardCode.push(generatePropertyTypeGuard(member, typeAliases));
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
  name?: PropertyName,
): void {
  for (const intersectionMember of intersectionType.types) {
    if (isTypeReferenceNode(intersectionMember)) {
      generateTypeReferenceTypeGuards(
        intersectionMember,
        typeAliases,
        encounteredPropertyNames,
        typeGuardCode,
        name,
      );
    } else if (isTypeLiteralNode(intersectionMember)) {
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
export function generateIntersectionTypeGuardForProperty(
  type: TypeNode,
  typeAliases: TypeAliasDeclaration[],
  name?: string,
): string {
  const typeGuardCode: string[] = [];
  if (!isIntersectionTypeNode(type)) {
    return "";
  }
  if (name) {
    typeGuardCode.push(`!value.hasOwnProperty('${name}')`);
  }
  for (const intersectionType of type.types) {
    if (isIntersectionTypeNode(intersectionType)) {
      typeGuardCode.push(
        generateIntersectionTypeGuard(
          factory.createTypeAliasDeclaration(
            undefined,
            undefined,
            undefined,
            intersectionType,
          ),
          typeAliases,
        ),
      );
    }
    processIntersectionTypeWithTypeGuards(
      intersectionType,
      typeAliases,
      typeGuardCode,
    );
  }

  return `if(${typeGuardCode.join(" || ")}) return false;`;
}
function processIntersectionTypeWithTypeGuards(
  intersectionType: TypeNode,
  typeAliases: TypeAliasDeclaration[],
  typeGuardCode: string[],
) {
  if (isTypeReferenceNode(intersectionType)) {
    generateTypeReferenceTypeGuard(
      intersectionType,
      typeAliases,
      typeGuardCode,
    );
  } else if (isTypeLiteralNode(intersectionType)) {
    generateTypeLiteralTypeGuard(intersectionType, typeGuardCode);
  } else if (isLiteralTypeNode(intersectionType)) {
    typeGuardCode.push(generateLiteralTypeTypeGuard(intersectionType));
  } else if (isUndefinedKeyword(intersectionType.kind)) {
    typeGuardCode.push(
      generateUndefinedKeywordTypeGuard(intersectionType.kind),
    );
  } else if (isBooleanKeyword(intersectionType.kind)) {
    typeGuardCode.push(generateBooleanKeywordTypeGuard(intersectionType.kind));
  } else if (isStringKeyword(intersectionType.kind)) {
    typeGuardCode.push(generateStringKeywordTypeGuard(intersectionType.kind));
  } else if (isNumberKeyword(intersectionType.kind)) {
    typeGuardCode.push(generateNumberKeywordTypeGuard(intersectionType.kind));
  } else if (isBigIntKeyword(intersectionType.kind)) {
    typeGuardCode.push(generateBigIntKeywordTypeGuard(intersectionType.kind));
  } else if (isSymbolKeyword(intersectionType.kind)) {
    typeGuardCode.push(generateSymbolKeywordTypeGuard(intersectionType.kind));
  } else if (isObjectKeyword(intersectionType.kind)) {
    typeGuardCode.push(generateObjectKeywordTypeGuard(intersectionType.kind));
  } else if (isAnyKeyword(intersectionType.kind)) {
    //skip any keyword
  } else if (isUnknownKeyword(intersectionType.kind)) {
    //skip unknown keyword
  } else if (isNeverKeyword(intersectionType.kind)) {
    //skip never keyword
  } else if (isVoidKeyword(intersectionType.kind)) {
    typeGuardCode.push(generateVoidKeywordTypeGuard(intersectionType.kind));
  } else if (isKeyofKeyword(intersectionType.kind)) {
    //skip keyof keyword for now as it is not supported
  }
}
