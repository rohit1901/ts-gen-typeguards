import {
  isPropertySignature,
  isTypeLiteralNode,
  TypeElement,
} from 'typescript';
import { generateKeywordGuard } from '../api';
import { generateTypeReferenceGuard } from '../api';
import { generateIntersectionTypeGuard, generateUnionTypeGuard } from '../api';
import { generateOptionalPropertyTypeGuard } from '../generator';
import { generateTypeLiteralTypeGuard } from '../generator/generateUnionTypeGuard';

/**
 * Function to generate a type guard for a TypeElement. Used to generate type guard string for properties.
 * @param property - A TypeElement.
 * @param parentName
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
  if (parentName) {
    typeGuard.push(
      `value.${parentName}.hasOwnProperty('${property.name.getText()}')`,
    );
  } else {
    typeGuard.push(`value.hasOwnProperty('${propertyName}')`);
  }
  if (property.questionToken)
    return generateOptionalPropertyTypeGuard(property, parentName);
  if (isTypeLiteralNode(property.type))
    typeGuard.push(
      ...generateTypeLiteralTypeGuard(property.type, propertyName),
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
