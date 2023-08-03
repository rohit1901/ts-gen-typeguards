import {
  factory,
  isIntersectionTypeNode,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  TypeAliasDeclaration,
  TypeElement,
  TypeNode,
} from 'typescript';
import { getMembersFromTypeAlias } from './getMembersFromTypeAlias';
import { isKeywordTypeSyntaxKind } from './isKeyword';
import {
  createFakeTypeElement,
  removeDuplicateTypeElements,
} from './typeElementUtils';

/**
 * Processes a given TypeAliasDeclaration to handle intersection types.
 * It merges the properties from related TypeAliasDeclarations if the type is an intersection type and
 * checks each type in the intersection and extracts their properties to create a new TypeAliasDeclaration
 * with a TypeLiteralNode containing all the merged properties.
 * NOTE: If the property is a KeywordTypeSyntaxKind, the function creates a fake TypeElement and adds it to the members array.
 * @param {TypeAliasDeclaration} definition - The TypeAliasDeclaration to process.
 * @param {TypeAliasDeclaration[]} definitions - An array of TypeAliasDeclarations to check for intersection.
 * @returns {TypeAliasDeclaration} - A new TypeAliasDeclaration with the properties merged from intersection types, if applicable.
 */
export function handleIntersectionTypesForTypeAlias(
  definition: TypeAliasDeclaration,
  definitions: TypeAliasDeclaration[],
): TypeAliasDeclaration {
  // Function logic to handle intersection types and merge properties from related TypeAliasDeclarations.
  // It processes each type in the intersection and extracts their properties to create a new TypeAliasDeclaration
  // with a TypeLiteralNode containing all the merged properties.

  const { name, type } = definition;
  const members: TypeElement[] = [];

  // Check if the type is an intersection type.
  if (!isIntersectionTypeNode(type)) {
    return definition;
  }

  // Iterate through each type in the intersection.
  for (const typeNode of type.types) {
    if (isTypeReferenceNode(typeNode)) {
      // If it's a TypeReferenceNode, find the related TypeAliasDeclaration and process it.
      const foundMember = definitions.find(
        d => d.name.getText() === typeNode.typeName.getText(),
      );
      if (foundMember) {
        if (isTypeLiteralNode(foundMember.type)) {
          // If the related type is a TypeLiteralNode, merge its members into the current members array.
          members.push(...foundMember.type.members);
        } else {
          // If the related type is not a TypeLiteralNode, recursively process it.
          members.push(...getMembersFromTypeAlias(foundMember, definitions));
        }
      }
    } else if (isUnionTypeNode(typeNode)) {
      // TODO: Handle UnionTypeNode, if needed.
      // NOTE: Will most probably not be the case, since we are handling intersection types here.
    } else if (isTypeLiteralNode(typeNode)) {
      // If it's a TypeLiteralNode, merge its members into the current members array.
      members.push(...typeNode.members);
    } else if (isKeywordTypeSyntaxKind(typeNode.kind)) {
      // If it's a KeywordTypeSyntaxKind, create a fake TypeElement and add it to the members array.
      members.push(createFakeTypeElement(typeNode.kind));
    } else {
      // Throw an error for unhandled typeNode kind.
      throw new Error(`Unhandled typeNode kind: ${typeNode.kind}`);
    }
  }

  // Create a new TypeAliasDeclaration with the merged properties from intersection types.
  return factory.createTypeAliasDeclaration(
    definition.modifiers,
    definition.name,
    definition.typeParameters,
    factory.createTypeLiteralNode(removeDuplicateTypeElements(members)),
  );
}
export function handleIntersectionTypesForTypeNode(
  type: TypeNode,
  definitions?: TypeAliasDeclaration[],
) {
  // Function logic to handle intersection types and merge properties from related TypeAliasDeclarations.
  // It processes each type in the intersection and extracts their properties to create a new TypeAliasDeclaration
  // with a TypeLiteralNode containing all the merged properties.

  const members: TypeElement[] = [];

  // Check if the type is an intersection type.
  if (!isIntersectionTypeNode(type)) {
    return type;
  }

  // Iterate through each type in the intersection.
  for (const typeNode of type.types) {
    if (isTypeReferenceNode(typeNode)) {
      // If it's a TypeReferenceNode, find the related TypeAliasDeclaration and process it.
      const foundMember = definitions?.find(
        d => d.name.getText() === typeNode.typeName.getText(),
      );
      if (foundMember) {
        if (isTypeLiteralNode(foundMember.type)) {
          // If the related type is a TypeLiteralNode, merge its members into the current members array.
          members.push(...foundMember.type.members);
        } else {
          // If the related type is not a TypeLiteralNode, recursively process it.
          members.push(...getMembersFromTypeAlias(foundMember, definitions));
        }
      }
    } else if (isUnionTypeNode(typeNode)) {
      // TODO: Handle UnionTypeNode, if needed.
      // NOTE: Will most probably not be the case, since we are handling intersection types here.
    } else if (isTypeLiteralNode(typeNode)) {
      // If it's a TypeLiteralNode, merge its members into the current members array.
      members.push(...typeNode.members);
    } else if (isKeywordTypeSyntaxKind(typeNode.kind)) {
      // If it's a KeywordTypeSyntaxKind, create a fake TypeElement and add it to the members array.
      members.push(createFakeTypeElement(typeNode.kind));
    } else {
      // Throw an error for unhandled typeNode kind.
      throw new Error(`Unhandled typeNode kind: ${typeNode.kind}`);
    }
  }

  // Create a new TypeLiteral with the merged properties from intersection types.
  return factory.createTypeLiteralNode(removeDuplicateTypeElements(members));
}
