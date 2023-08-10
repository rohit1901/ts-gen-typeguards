import { PropertySignature } from 'typescript';

/**
 * Generates a type guard string for an array type property.
 * @param property - The property to generate the type guard for.
 */
export function generateArrayTypeGuard(property: PropertySignature) {
  const propertyName = property.name.getText();
  return `Array.isArray(${propertyName})`;
}
