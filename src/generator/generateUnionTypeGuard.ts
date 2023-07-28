import {
  factory,
  isIntersectionTypeNode,
  isLiteralTypeNode,
  isPropertySignature,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertyName,
  PropertySignature,
  TypeAliasDeclaration,
  TypeLiteralNode,
  TypeNode,
  TypeReferenceNode,
} from "typescript";
import { generateLiteralTypeTypeGuard } from "./generateLiteralTypeTypeGuard";
import {
  capitalize,
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
  syntaxKindToType,
} from "../utils";
import {
  generateBigIntKeywordTypeGuard,
  generateBooleanKeywordTypeGuard,
  generateNumberKeywordTypeGuard,
  generateObjectKeywordTypeGuard,
  generateStringKeywordTypeGuard,
  generateSymbolKeywordTypeGuard,
  generateUndefinedKeywordTypeGuard,
  generateVoidKeywordTypeGuard,
} from "./generateKeywordTypeGuardsForUnion";
import { generateIntersectionTypeGuard } from "./generateIntersectionTypeGuard";

/**
 * Processes the given union type node and generates type guards based on its individual members.
 *
 * @param {TypeNode} unionType - The union type node to be processed.
 * @param {TypeAliasDeclaration[]} typeAliases - An array of type alias declarations for resolving type references.
 * @param {string[]} typeGuardCode - An array that collects the generated type guard code snippets.
 * @returns {void}
 *
 * @example
 * const unionTypeNode = getTypeNodeFromSomewhere();
 * const typeAliasesArray = getTypeAliasesFromSomewhere();
 * const typeGuardCodeSnippets = [];
 * processUnionTypeWithTypeGuards(unionTypeNode, typeAliasesArray, typeGuardCodeSnippets);
 *
 * @description
 * This function examines the provided `unionType` node and generates type guards for its individual members.
 * It handles various cases like type references, type literals, literal types, keyword types, etc., and collects
 * the generated type guard code snippets into the `typeGuardCode` array.
 * If a keyword type like `any`, `unknown`, `never`, or `keyof` is encountered, it is skipped as it doesn't require
 * a specific type guard.
 * The generated type guard code snippets can be later used for runtime type checks or other purposes.
 */
function processUnionTypeWithTypeGuards(
  unionType: TypeNode,
  typeAliases: TypeAliasDeclaration[],
  typeGuardCode: string[],
) {
  if (isTypeReferenceNode(unionType)) {
    generateTypeReferenceTypeGuard(unionType, typeAliases, typeGuardCode);
  } else if (isTypeLiteralNode(unionType)) {
    generateTypeLiteralTypeGuard(unionType, typeGuardCode);
  } else if (isLiteralTypeNode(unionType)) {
    typeGuardCode.push(generateLiteralTypeTypeGuard(unionType));
  } else if (isUndefinedKeyword(unionType.kind)) {
    typeGuardCode.push(generateUndefinedKeywordTypeGuard(unionType.kind));
  } else if (isBooleanKeyword(unionType.kind)) {
    typeGuardCode.push(generateBooleanKeywordTypeGuard(unionType.kind));
  } else if (isStringKeyword(unionType.kind)) {
    typeGuardCode.push(generateStringKeywordTypeGuard(unionType.kind));
  } else if (isNumberKeyword(unionType.kind)) {
    typeGuardCode.push(generateNumberKeywordTypeGuard(unionType.kind));
  } else if (isBigIntKeyword(unionType.kind)) {
    typeGuardCode.push(generateBigIntKeywordTypeGuard(unionType.kind));
  } else if (isSymbolKeyword(unionType.kind)) {
    typeGuardCode.push(generateSymbolKeywordTypeGuard(unionType.kind));
  } else if (isObjectKeyword(unionType.kind)) {
    typeGuardCode.push(generateObjectKeywordTypeGuard(unionType.kind));
  } else if (isAnyKeyword(unionType.kind)) {
    //skip any keyword
  } else if (isUnknownKeyword(unionType.kind)) {
    //skip unknown keyword
  } else if (isNeverKeyword(unionType.kind)) {
    //skip never keyword
  } else if (isVoidKeyword(unionType.kind)) {
    typeGuardCode.push(generateVoidKeywordTypeGuard(unionType.kind));
  } else if (isKeyofKeyword(unionType.kind)) {
    //skip keyof keyword for now as it is not supported
  }
}

/**
 * Generate a union type guard for a given TypeScript type alias.
 *
 * @param type - The TypeAliasDeclaration representing the union type.
 * @param name
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the union.
 * @returns The generated union type guard code as a string.
 */
export function generateUnionTypeGuard(
  { type }: TypeAliasDeclaration,
  typeAliases: TypeAliasDeclaration[],
  name?: PropertyName,
): string {
  if (!isUnionTypeNode(type)) {
    return "";
  }
  const typeGuardCode: string[] = [];
  for (const unionType of type.types) {
    processUnionTypeWithTypeGuards(unionType, typeAliases, typeGuardCode);
  }

  return `if(${typeGuardCode.join(" || ")}) return false;`;
}

/**
 * Generate a type guard for a TypeReferenceNode within a union type.
 *
 * @param typeRefNode - The TypeReferenceNode representing the union member type.
 * @param typeAliases - An array of TypeAliasDeclaration containing type aliases used in the union.
 * @param typeGuardCode - The array to store the generated type guard code as strings.
 */
export function generateTypeReferenceTypeGuard(
  typeRefNode: TypeReferenceNode,
  typeAliases: TypeAliasDeclaration[],
  typeGuardCode: string[],
): void {
  const typeAlias = typeAliases.find(
    (typeAlias) => typeAlias.name.getText() === typeRefNode.typeName.getText(),
  );
  if (typeAlias) {
    typeGuardCode.push(generateTypeAliasTypeGuard(typeAlias));
  }
}

/**
 * Generate a type guard for a TypeLiteralNode within a union type.
 *
 * @param typeLiteral - The TypeLiteralNode representing the union member type literal.
 * @param typeGuardCode - The array to store the generated type guard code as strings.
 */
export function generateTypeLiteralTypeGuard(
  typeLiteral: TypeLiteralNode,
  typeGuardCode: string[],
): void {
  const propertyGuards: string[] = [];
  for (const member of typeLiteral.members) {
    if (isPropertySignature(member)) {
      //TODO: check here if the property is optional
    }
  }
  if (propertyGuards.length > 0) {
    typeGuardCode.push(`(${propertyGuards.join(" && ")})`);
  }
}

/**
 * Generate a type guard for a TypeAliasDeclaration within a union type.
 *
 * @param typeAlias - The TypeAliasDeclaration representing the union member type alias.
 * @returns The generated type guard code as a string.
 */
export function generateTypeAliasTypeGuard(typeAlias: TypeAliasDeclaration): string {
  return `!is${capitalize(typeAlias.name.getText())}(value)`;
}

/**
 * Generate the type guard code for a LiteralTypeNode. This is used to add a check for the property name
 * @returns The generated type guard code for the property as a string.
 * @param type
 * @param typeAliases
 * @param name
 */
export function generateUnionTypeGuardForProperty(
  type: TypeNode,
  typeAliases: TypeAliasDeclaration[],
  name?: string,
): string {
  const typeGuardCode: string[] = [];
  if (!isUnionTypeNode(type)) {
    return "";
  }
  if (name) {
    typeGuardCode.push(`!value.hasOwnProperty('${name}')`);
  }
  for (const unionType of type.types) {
    if (isIntersectionTypeNode(unionType)) {
      typeGuardCode.push(
        generateIntersectionTypeGuard(
          factory.createTypeAliasDeclaration(
            undefined,
            undefined,
            undefined,
            unionType,
          ),
          typeAliases,
        ),
      );
    }
    processUnionTypeWithTypeGuards(unionType, typeAliases, typeGuardCode);
  }

  return `if(${typeGuardCode.join(" || ")}) return false;`;
}
