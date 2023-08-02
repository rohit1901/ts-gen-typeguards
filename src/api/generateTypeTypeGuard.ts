import {
  EnumDeclaration,
  factory,
  isEnumDeclaration,
  isIntersectionTypeNode,
  isLiteralTypeNode,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  KeywordSyntaxKind,
  SyntaxKind,
  TypeAliasDeclaration,
  TypeElement,
} from 'typescript';
import {
  generateKeywordGuard,
  generateKeywordGuardForType,
  generatePropertyGuard,
  generateUnionTypeGuard,
  handleEnumIntersection,
} from '../api';
import {
  getEscapedCapitalizedStringLiteral,
  getMembersFromTypeAlias,
  isKeywordTypeSyntaxKind,
  removeDuplicateTypeElements,
  createFakeTypeElement,
  syntaxKindToType,
} from '../utils';

/**
 * Generate a set of type guard functions based on provided TypeAliasDeclarations.
 * @param definitions - An array of TypeAliasDeclarations.
 * @param enums - An array of EnumDeclarations
 * @returns A string containing the generated type guard functions.
 */
export function generateTypeTypeGuard(
  definitions: TypeAliasDeclaration[],
  enums: EnumDeclaration[],
): string {
  const typeGuard: string[] = [];
  for (const definition of definitions) {
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
    typeGuardStrings.push(...generateFakeTypeElement(newDefinition));
    typeGuardStrings.push(...handleEnumIntersection(definition, enums));
    typeGuard.push(typeGuardStrings.join('&&') + `)}`);
  }
  return typeGuard.join('\n');
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
    return '';
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
 * NOTE: If the property is a KeywordTypeSyntaxKind, the function creates a fake TypeElement and adds it to the members array.
 * @param {TypeAliasDeclaration} definition - The TypeAliasDeclaration to process.
 * @param {TypeAliasDeclaration[]} definitions - An array of TypeAliasDeclarations to check for intersection.
 * @returns {TypeAliasDeclaration} - A new TypeAliasDeclaration with the properties merged from intersection types, if applicable.
 */
function handleIntersectionTypes(
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

/**
 * Generates fake type guards for properties with a custom brand of 'fake' in a given TypeAliasDeclaration.
 *
 * @param {TypeAliasDeclaration} typeAlias - The TypeAliasDeclaration to process and generate fake type guards.
 * @returns {string[]} - An array of strings representing the fake type guards for properties with the 'fake' brand.
 */
function generateFakeTypeElement(typeAlias: TypeAliasDeclaration): string[] {
  // Function logic to generate fake type guards for properties with a custom brand of 'fake'.

  const typeGuardStrings: string[] = [];

  // Check if the typeAlias has a TypeLiteralNode type.
  if (!isTypeLiteralNode(typeAlias.type)) {
    return typeGuardStrings;
  }

  // Iterate through each property in the TypeLiteralNode.
  for (const property of typeAlias.type.members) {
    if (property._typeElementBrand === 'fake') {
      // If the property has the 'fake' brand, generate a keyword type guard for its custom brand and add it to the array.
      typeGuardStrings.push(
        generateKeywordGuardForType(property._declarationBrand),
      );
    }
  }

  // Return the array of generated fake type guards.
  return typeGuardStrings;
}
