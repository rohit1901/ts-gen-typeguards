import { isArrayTypeNode, isPropertySignature, TypeElement } from 'typescript';
import {
  generateArrayTypeGuard,
  generateGenericPropertyGuard,
  generateIntersectionTypeGuard,
  generateKeywordGuard,
  generateOptionalPropertyTypeGuard,
  generateTypeReferenceGuard,
  generateUnionTypeGuard,
} from '../api';
import { generateTypeLiteralTypeGuardWithinUnion } from './generateUnionTypeGuardForIntersection';
import {
  buildHasOwnPropertyString,
  getPropertyName,
  isGenericProperty,
} from '../utils';

/**
 * Function to generate a type guard for a TypeElement. Used to generate type guard string for properties.
 * A property (TypeElement) can be either a required or optional property.
 * A property could be a TypeLiteral, a TypeReference, an IntersectionType, or a UnionType.
 * If the property is optional, the type guard will be generated using the generateOptionalPropertyTypeGuard function.
 * If the property is required, the type guard will be generated using the generateTypeLiteralTypeGuard function.
 * @param property - A TypeElement.
 * @param parentName - The name of the parent interface. Its presence signifies that the property is a nested property.
 * @param typeParameterName - The name of the type parameter. Its presence signifies that the property is a generic property.
 */
export function generatePropertyGuard(
  property: TypeElement,
  parentName?: string,
  typeParameterName?: string,
) {
  const typeGuard: string[] = [];
  if (!isPropertySignature(property)) return typeGuard;
  //if(property.questionToken) return;
  const propertyName = getPropertyName(property, parentName);
  // handle required properties in a different way
  typeGuard.push(buildHasOwnPropertyString(property, parentName));
  if (isGenericProperty(property, typeParameterName)) {
    return generateGenericPropertyGuard(
      property,
      parentName,
      typeParameterName,
    );
  }
  if (isArrayTypeNode(property.type)) {
    typeGuard.push(generateArrayTypeGuard(property, propertyName));
  }
  typeGuard.push(
    ...generateTypeLiteralTypeGuardWithinUnion(
      property.type,
      propertyName,
      typeParameterName,
    ),
    ...generateKeywordGuard(property.type, propertyName, true),
    ...generateTypeReferenceGuard(property.type, propertyName, true),
    ...generateIntersectionTypeGuard(property.type, propertyName, true),
    ...generateUnionTypeGuard(property.type, propertyName, true),
  );
  return typeGuard;
}
