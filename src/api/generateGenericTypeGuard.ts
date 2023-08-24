import {isPropertySignature, NodeArray, TypeElement, TypeParameterDeclaration,} from 'typescript';
import {buildHasOwnPropertyString, getPropertyName} from '../utils';
import {capitalize} from 'ts-raw-utils';

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
 * Builds the generic function signature for a generic type guard.
 *
 * This function generates a TypeScript type guard function signature for a generic type. The resulting type guard function can be used to narrow down the type of a value based on the provided type guard function. The generated signature includes generic type parameters, making it suitable for type checking and inference.
 *
 * @example
 * // For a generic type `Array<T>`
 * const isArray = buildGenericFunctionSignature('Array', [typeParametersNode]);
 * // Resulting signature: `export function isArray<T>(value: any, guard: (val: any) => val is T[]): value is Array<T> { ... }`
 *
 * @param objectName - The name of the object to generate the type guard for.
 * @param typeParameters - The type parameters of the object.
 * @param typeArguments
 * @returns A string representing the generic function signature for the type guard.
 */
export function buildGenericFunctionSignature(
  objectName: string,
  typeParameters?: NodeArray<TypeParameterDeclaration>,
  typeArguments?: string,
) {
  const genericNames = generateGenericParameterList(typeParameters);
  const genericNamesWithConstraints =
    generateGenericParameterListWithConstraints(typeParameters);
  if(typeArguments && typeArguments !== '') {
    return `export function is${objectName}<${genericNamesWithConstraints}>(value: any, ${typeArguments}): value is ${objectName}<${typeArguments}>{return(typeof value === "object" &&
      value !== null`;
  }
  return `export function is${objectName}<${genericNamesWithConstraints}>(value: any, ${getGenericFunctionParameters(
    typeParameters,
  )}): value is ${objectName}<${genericNames}>{return(typeof value === "object" &&
    value !== null`;
}

/**
 * Builds the generic function signature for a generic type guard.
 * @example
 * // For a generic type `Array<T>`
 * Result: T
 * @param typeParameters - The type parameters of the object.
 */
export function generateGenericParameterList(
  typeParameters?: NodeArray<TypeParameterDeclaration>,
): string {
  return typeParameters?.map(p => `${p.name.getText()}`).join(',');
}

/**
 * Builds the generic function signature for a generic type guard. This is used to generate the type guard signature.
 * @example
 * // For a generic type `Array<T extends K>`
 * Result: T extends K
 * @param typeParameters
 */
export function generateGenericParameterListWithConstraints(
  typeParameters?: NodeArray<TypeParameterDeclaration>,
): string {
  return typeParameters
    ?.map(
      p =>
        `${p.name.getText()} ${
          p.constraint ? 'extends ' + p.constraint?.getText() : ''
        }`,
    )
    .join(',');
}

/**
 * Build the generic function parameters for a generic type guard. This is used to generate the type guard signature.
 * @example
 * //for a type Type<T, K>
 * isT: (val: any) => val is T, isK: (val: any) => val is K
 * @param typeParameters - The type parameters of the object.
 * @returns A string of generic function parameters like isT: (val: any) => val is T.
 */
export function getGenericFunctionParameters(
  typeParameters?: NodeArray<TypeParameterDeclaration>,
) {
  return typeParameters?.map(
      parameter =>
        `is${capitalize(
          parameter.name.getText(),
        )}: (val: any) => val is ${parameter.name.getText()}`,
    )
    .join(',');
}
