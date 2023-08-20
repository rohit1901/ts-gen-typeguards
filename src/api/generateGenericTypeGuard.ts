import {
  isPropertySignature,
  NodeArray,
  TypeElement,
  TypeParameterDeclaration,
} from 'typescript';
import { buildHasOwnPropertyString, getPropertyName } from '../utils';
import { capitalize } from 'ts-raw-utils';
/**
 * Generate a generic type guard for a given property. This is used for nested properties as well.
 * @example
 * //for a TypeAliasDeclaration like Type<T>
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
 * @returns A string of the generic function signature like export function isType<T>(val: any, guard: (val: any) => val is T): value is Type<T>.
 */
export function buildGenericFunctionSignature(
  objectName: string,
  typeParameters: NodeArray<TypeParameterDeclaration>,
) {
  const genericNames = typeParameters.map(p => p.name.getText()).join(',');
  return `export function is${objectName}<${genericNames}>(val: any, ${getGenericFunctionParameters(
    typeParameters,
  )}): value is ${objectName}<${genericNames}>{return(typeof value === "object" &&
    value !== null`;
}

/**
 * Build the generic function parameters for a generic type guard. This is used to generate the type guard signature.
 * @example
 * //for a type Type<T, K>
 * isT: (val: any) => val is T, isK: (val: any) => val is K
 * @param typeParameters - The type parameters of the object.
 * @returns A string of generic function parameters like isT: (val: any) => val is T.
 */
function getGenericFunctionParameters(
  typeParameters: NodeArray<TypeParameterDeclaration>,
) {
  return typeParameters
    .map(
      parameter =>
        `is${capitalize(
          parameter.name.getText(),
        )}: (val: any) => val is ${parameter.name.getText()}`,
    )
    .join(',');
}
