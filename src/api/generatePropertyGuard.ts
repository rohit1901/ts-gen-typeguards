import { getEscapedCapitalizedStringLiteral } from 'ts-raw-utils';
import {
  isArrayTypeNode,
  isPropertySignature,
  TypeElement,
  TypeReferenceNode,
} from 'typescript';

import {
  buildGenericParameterList,
  buildTypeArgumentsForTypeReference,
  generateArrayTypeGuard,
  generateGenericPropertyGuard,
  generateIntersectionTypeGuard,
  generateKeywordGuard,
  generateTypeReferenceGuard,
  generateUnionTypeGuard,
} from '../api';
import {
  buildHasOwnPropertyString,
  getPropertyName,
  isGenericProperty,
} from '../utils';
import { generateTypeLiteralTypeGuardWithinUnion } from './generateUnionTypeGuardForIntersection';

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
  return typeGuard.filter(v => typeof v === 'string');
}

/**
 * Function to get the type guard function string for a property of a TypeReferenceNode.
 * @param typeName - The name of the type.
 * @param type - A TypeReferenceNode with a property.
 */
export function getTypeReferencePropertyFunctionSignature(
  typeName: string,
  type: TypeReferenceNode,
) {
  const functionParams = [`value.${typeName}`, buildGenericParameterList(type)]
    .filter(p => typeof p === 'string')
    .join(',');
  return `is${getEscapedCapitalizedStringLiteral(
    type.typeName.getText(),
  )}${buildTypeArgumentsForTypeReference(type)}(${functionParams})`;
}
