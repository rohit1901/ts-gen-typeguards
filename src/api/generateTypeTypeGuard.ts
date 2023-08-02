import {
  factory,
  isIntersectionTypeNode,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  KeywordSyntaxKind,
  SyntaxKind,
  TypeAliasDeclaration,
  TypeElement,
} from "typescript";
import {
  generateKeywordGuard,
  generatePropertyGuard,
  generateUnionTypeGuard,
} from "../api";
import {
  getEscapedCapitalizedStringLiteral,
  getMembersFromTypeAlias,
  isKeywordTypeSyntaxKind,
  removeDuplicateTypeElements,
} from "../utils";

/**
 * Generate a set of type guard functions based on provided TypeAliasDeclarations.
 * @param definitions - An array of TypeAliasDeclarations.
 * @returns A string containing the generated type guard functions.
 */
export function generateTypeTypeGuard(
  definitions: TypeAliasDeclaration[],
): string {
  const typeGuard: string[] = [];
  for (let definition of definitions) {
    const typeGuardStrings: string[] = [];
    const newDefinition = handleIntersectionTypes(definition, definitions);
    const { name, type } = newDefinition;
    const typeName = name.getText();
    const typeGuardName = getEscapedCapitalizedStringLiteral(typeName);
    typeGuardStrings.push(`export function is${getEscapedCapitalizedStringLiteral(
      typeGuardName,
    )}(value: any): value is ${typeName} {return(typeof value === "object" &&
    value !== null`);
    typeGuardStrings.push(...generateTypeLiteralTypeGuard(newDefinition));
    typeGuardStrings.push(...generateUnionTypeGuard(type, typeName));
    typeGuardStrings.push(...generateKeywordGuard(type));
    typeGuard.push(typeGuardStrings.join("&&") + `)}`);
  }
  return typeGuard.join("\n");
}

/**
 * Generate type guards for a TypeAliasDeclaration with a TypeLiteralNode.
 * @param definition - The TypeAliasDeclaration to process.
 * @returns An array of strings containing the type guard statements for the TypeLiteralNode properties.
 */
function generateTypeLiteralTypeGuard(definition: TypeAliasDeclaration) {
  const { name, type } = definition;
  const typeName = name.getText();
  const typeGuardStrings: string[] = [];
  if (!isTypeLiteralNode(type)) {
    return "";
  }
  //NOTE: Return empty string if the definition is not a TypeLiteralNode
  for (const property of type.members) {
    typeGuardStrings.push(...generatePropertyGuard(property, typeName));
  }
  return typeGuardStrings;
}

/**
 * Processes a given TypeAliasDeclaration to handle intersection types.
 * It merges the properties from related TypeAliasDeclarations if the type is an intersection type and
 * checks each type in the intersection and extracts their properties to create a new TypeAliasDeclaration
 * with a TypeLiteralNode containing all the merged properties.
 * @param definition - The TypeAliasDeclaration to process.
 * @param definitions - An array of TypeAliasDeclarations to check for intersection.
 * @returns A new TypeAliasDeclaration with the properties merged from intersection types, if applicable.
 */
function handleIntersectionTypes(
  definition: TypeAliasDeclaration,
  definitions: TypeAliasDeclaration[],
): TypeAliasDeclaration {
  const { name, type } = definition;
  const members: TypeElement[] = [];
  if (!isIntersectionTypeNode(type)) {
    return definition;
  }

  for (const typeNode of type.types) {
    if (isTypeReferenceNode(typeNode)) {
      const foundMember = definitions.find(
        (d) => d.name.getText() === typeNode.typeName.getText(),
      );
      if (isTypeLiteralNode(foundMember.type)) {
        members.push(...foundMember.type.members);
      } else {
        members.push(...getMembersFromTypeAlias(foundMember, definitions));
      }
    } else if (isUnionTypeNode(typeNode)) {
      //NOTE: Will most probably not be the case
    } else if (isTypeLiteralNode(typeNode)) {
      members.push(...typeNode.members);
    } else if (isKeywordTypeSyntaxKind(typeNode.kind)) {
      const elem = factory.createKeywordTypeNode(typeNode.kind);
      //TODO: check here for ```export type keywordType = number & string```
    } else {
      throw new Error(`Unhandled typeNode kind: ${typeNode.kind}`);
    }
  }
  return factory.createTypeAliasDeclaration(
    definition.modifiers,
    definition.name,
    definition.typeParameters,
    factory.createTypeLiteralNode(removeDuplicateTypeElements(members)),
  );
}
