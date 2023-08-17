import {
  isPropertySignature,
  NodeArray,
  TypeElement,
  TypeParameterDeclaration,
} from 'typescript';
import { buildHasOwnPropertyString, getPropertyName } from '../utils';

/**
 * Generate a generic type guard for a given property. This is used for nested properties as well.
 * @example
 * //for a type Type<T>
 * export function isType<T>(val: any, guard: (val: any) => val is T): value is Type<T>{return(typeof value === "object" && value !== null
 * //for a property name
 * property.hasOwnProperty('name') && guard(value.name)
 * //for a nested property name
 * property.hasOwnProperty('name') && property.name.hasOwnProperty('nested') && guard(value.name.nested)
 * @param property - The property to generate the type guard for.
 * @param parentName - The computed name of the property.
 */
export function generateGenericPropertyGuard(
  property: TypeElement,
  parentName?: string,
) {
  if (!isPropertySignature(property)) return [];
  return [
    buildHasOwnPropertyString(property, parentName),
    `guard(value.${getPropertyName(property, parentName)})`,
  ];
}

/**
 * Build the generic function signature for a generic type guard.
 * @example
 * export function isType<T>(val: any, guard: (val: any) => val is T): value is Type<T>{return(typeof value === "object" && value !== null
 * //for a type Type<T>
 * @param objectName - The name of the object to generate the type guard for.
 * @param typeParameters - The type parameters of the object.
 */
export function buildGenericFunctionSignature(
  objectName: string,
  typeParameters: NodeArray<TypeParameterDeclaration>,
) {
  const parameter = typeParameters[0];
  return `export function is${objectName}<${parameter.name.getText()}>(val: any, guard: (val: any) => val is ${parameter.name.getText()}): value is ${objectName}<${parameter.name.getText()}>{return(typeof value === "object" &&
    value !== null`;
}
