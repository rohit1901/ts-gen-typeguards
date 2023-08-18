import {
  isPropertySignature,
  NodeArray,
  TypeElement,
  TypeParameterDeclaration,
} from 'typescript';
import {
  buildHasOwnPropertyString,
  capitalize,
  getPropertyName,
} from '../utils';

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
 * @param genericName
 */
export function generateGenericPropertyGuard(
  property: TypeElement,
  parentName?: string,
  genericName?: string,
) {
  if (!isPropertySignature(property) || !genericName) return [];
  return [
    buildHasOwnPropertyString(property, parentName),
    `is${genericName}(value.${getPropertyName(property, parentName)})`,
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
  const genericName = parameter.name.getText();
  return `export function is${objectName}<${genericName}>(val: any, is${capitalize(
    genericName,
  )}: (val: any) => val is ${genericName}): value is ${objectName}<${genericName}>{return(typeof value === "object" &&
    value !== null`;
}
