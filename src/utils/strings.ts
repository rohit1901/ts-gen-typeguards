import {
  Identifier,
  InterfaceDeclaration,
  TypeAliasDeclaration,
  TypeElement,
} from 'typescript';
import {getTernaryOperatorResult} from "./fileOps";

/**
 * Check if value is a string and is equal to "type"
 * @param value - A value to check
 */
export function isString(value: any): value is 'type' {
  return typeof value === 'string' && value === 'type';
}

/**
 * Get the type name from the type parameter of an interface definition
 * @param definition - An interface definition
 */
export function getTypeNameFromTypeParameter(
  definition: InterfaceDeclaration | TypeAliasDeclaration,
): string | undefined {
    if (!definition.typeParameters) return;
    return definition.typeParameters[0].name.escapedText.toString();
  /*return getTernaryOperatorResult(definition.typeParameters && definition.typeParameters.length > 0
      , definition.typeParameters[0].name.escapedText.toString()
      ,undefined);*/
}

/**
 * Get the property name from a TypeElement. If the property is a nested property, the parentName is used to build the full property name.
 * @param property - A TypeElement representing a property
 * @param parentName - Optional. The name of the parent property.
 */
export function getPropertyName(
  property: TypeElement,
  parentName?: string,
): string {
  if(!!parentName) return `${parentName}.${property.name.getText()}`;
  return property.name.getText();
}

/**
 * Build the typeguard text for checking if a property exists on an object.
 * @example
 * property.hasOwnProperty('name')
 * @param property - A TypeElement representing a property
 * @param parentName - Optional. The name of the parent property.
 */
export function buildHasOwnPropertyString(
  property: TypeElement,
  parentName?: string,
): string {
  const hasOwnPropertyString =  getTernaryOperatorResult(!!parentName, `value.${parentName}`, `value`);
  return `${hasOwnPropertyString}.hasOwnProperty('${property.name.getText()}')`;
}

/**
 * Gets the name from an Identifier object.
 * This function takes an Identifier object and extracts the name
 * from it. An Identifier can represent a variable, function,
 * class, or other named entity in TypeScript code.
 * @param name - The Identifier object to extract the name from.
 */
export function getName(name: Identifier): string {
  if (!name) return;
  if (name.hasOwnProperty('escapedText')) {
    return name.escapedText.toString();
  }
  return name.getText();
}
