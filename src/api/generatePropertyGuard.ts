import {
  isArrayTypeNode,
  isPropertySignature,
  isTypeParameterDeclaration,
  TypeElement,
} from 'typescript';
import {
  generateArrayTypeGuard,
  generateIntersectionTypeGuard,
  generateKeywordGuard,
  generateOptionalPropertyTypeGuard,
  generateTypeReferenceGuard,
  generateUnionTypeGuard,
} from '../api';
import { generateTypeLiteralTypeGuardWithinUnion } from './generateUnionTypeGuardForIntersection';
import { isTypeParameter, syntaxKindToType } from '../utils';

/**
 * Function to generate a type guard for a TypeElement. Used to generate type guard string for properties.
 * A property (TypeElement) can be either a required or optional property.
 * A property could be a TypeLiteral, a TypeReference, an IntersectionType, or a UnionType.
 * If the property is optional, the type guard will be generated using the generateOptionalPropertyTypeGuard function.
 * If the property is required, the type guard will be generated using the generateTypeLiteralTypeGuard function.
 * @param property - A TypeElement.
 * @param parentName - The name of the parent interface. Its presence signifies that the property is a nested property.
 */
export function generatePropertyGuard(
  property: TypeElement,
  parentName?: string,
) {
  const typeGuard: string[] = [];
  if (!isPropertySignature(property)) return typeGuard;
  const propertyName = parentName
    ? `${parentName}.${property.name.getText()}`
    : property.name.getText();
  const hasOwnPropertyString = parentName ? `value.${parentName}` : `value`;
  // handle optional properties separately
  if (property.questionToken)
    return generateOptionalPropertyTypeGuard(property, propertyName);
  // handle required properties in a different way
  typeGuard.push(
    `${hasOwnPropertyString}.hasOwnProperty('${property.name.getText()}')`,
  );
  if (isArrayTypeNode(property.type))
    typeGuard.push(generateArrayTypeGuard(property, propertyName));
  typeGuard.push(
    ...generateTypeLiteralTypeGuardWithinUnion(property.type, propertyName),
  );
  typeGuard.push(...generateKeywordGuard(property.type, propertyName, true));
  typeGuard.push(
    ...generateTypeReferenceGuard(property.type, propertyName, true),
  );
  typeGuard.push(
    ...generateIntersectionTypeGuard(property.type, propertyName, true),
  );
  typeGuard.push(...generateUnionTypeGuard(property.type, propertyName, true));
  return typeGuard;
}
