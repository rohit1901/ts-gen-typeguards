import { isPropertySignature, TypeElement } from 'typescript';
import { generateKeywordGuard } from '../api';
import { generateTypeReferenceGuard } from '../api';
import { generateIntersectionTypeGuard, generateUnionTypeGuard } from '../api';

/**
 * Function to generate a type guard for a TypeElement. Used to generate type guard string for properties.
 * @param property - A TypeElement.
 */
export function generatePropertyGuard(
  property: TypeElement,
) {
  const typeGuard: string[] = [];
  if (!isPropertySignature(property)) return typeGuard;
  const propertyName = property.name.getText() ?? undefined;
  if (propertyName) {
    typeGuard.push(`value.hasOwnProperty('${propertyName}')`);
  }
  typeGuard.push(...generateKeywordGuard(property.type, propertyName, true));
  typeGuard.push(...generateTypeReferenceGuard(property.type, propertyName, true));
  typeGuard.push(...generateIntersectionTypeGuard(property.type, propertyName, true));
  typeGuard.push(...generateUnionTypeGuard(property.type, propertyName, true));
  return typeGuard;
}
