import {
  InterfaceDeclaration,
  TypeElement,
  TypeParameterDeclaration,
} from 'typescript';

/**
 * Check if value is a string and is equal to "type"
 * @param value - A value to check
 */
export function strings(value: any): value is 'type' {
  return typeof value === 'string' && value === 'type';
}

/**
 * Get the type name from the type parameter of an interface definition
 * @param definition - An interface definition
 */
export function getTypeNameFromTypeParameter(
  definition: InterfaceDeclaration,
): string | undefined {
  return definition.typeParameters && definition.typeParameters.length > 0
    ? definition.typeParameters[0].name.escapedText.toString()
    : undefined;
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
  return parentName
    ? `${parentName}.${property.name.getText()}`
    : property.name.getText();
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
  const hasOwnPropertyString = parentName ? `value.${parentName}` : `value`;
  return `${hasOwnPropertyString}.hasOwnProperty('${property.name.getText()}')`;
}
