import {
  EnumDeclaration,
  factory,
  InterfaceDeclaration,
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
  handleIntersectionTypesForTypeAlias,
} from '../utils';

/**
 * Generate a set of type guard functions based on provided TypeAliasDeclarations.
 * @param definitions - An array of TypeAliasDeclarations.
 * @param enums - An array of EnumDeclarations
 * @param interfaces
 * @returns A string containing the generated type guard functions.
 */
export function generateTypeTypeGuard(
  definitions: TypeAliasDeclaration[],
  enums: EnumDeclaration[],
  interfaces: InterfaceDeclaration[],
): string {
  const typeGuard: string[] = [];
  for (const definition of definitions) {
    const typeGuardStrings: string[] = [];
    const newDefinition = handleIntersectionTypesForTypeAlias(
      definition,
      definitions,
      enums,
      interfaces,
    );
    const { name, type } = newDefinition;
    const typeName = name.getText();
    const typeGuardName = getEscapedCapitalizedStringLiteral(typeName);
    typeGuardStrings.push(`export function is${getEscapedCapitalizedStringLiteral(
      typeGuardName,
    )}(value: any): value is ${typeName} {return(typeof value === "object" &&
    value !== null`);
    typeGuardStrings.push(...generateTypeLiteralTypeGuard(newDefinition));
    typeGuardStrings.push(
      ...generateUnionTypeGuard(type, typeName, undefined, definitions),
    );
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
    typeGuardStrings.push(...generatePropertyGuard(property));
  }
  return typeGuardStrings;
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
