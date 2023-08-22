import {
  EnumDeclaration,
  isIntersectionTypeNode,
  isTypeReferenceNode,
  TypeAliasDeclaration,
  TypeNode,
} from 'typescript';
import { getEscapedCapitalizedStringLiteral } from 'ts-raw-utils';

/**
 * Wrapper function for generating type guards for enums
 * ```
 * export function isAnimal(value: any): value is Animal {
 *   return Object.values(Animal).includes(value);
 * }
 * ```
 */
export function generateEnumTypeGuards(enums: EnumDeclaration[]) {
  const enumGuards: string[] = [];
  for (const definition of enums) {
    enumGuards.push(generateEnumTypeGuard(definition));
  }
  return enumGuards.join('\n');
}

/**
 * Generates a type guard for a single enum definition like:
 * ```
 * export function isAnimal(value: any): value is Animal {
 *  return Object.values(Animal).includes(value);
 *  }
 *  ```
 * @param enumDefinition - The enum definition
 */
export function generateEnumTypeGuard(enumDefinition: EnumDeclaration) {
  const { name } = enumDefinition;
  return `export function is${getEscapedCapitalizedStringLiteral(
    name.getText(),
  )}(value: any): value is ${getEscapedCapitalizedStringLiteral(
    name.getText(),
  )} {
        return Object.values(${getEscapedCapitalizedStringLiteral(
          name.getText(),
        )}).includes(value);
        }`;
}

/**
 * Builds a type guard for an Enum which is an intersection type.
 * @param definition - The type alias definition
 * @param enums - The enum definitions
 */
export function handleEnumIntersection(
  definition: TypeAliasDeclaration,
  enums: EnumDeclaration[],
) {
  const enumGuards: string[] = [];
  if (!isIntersectionTypeNode(definition.type)) return enumGuards;
  for (const refType of definition.type.types) {
    const referenceCheckString = getTypeReferenceCheckForEnum(refType, enums);
    if (referenceCheckString) enumGuards.push(referenceCheckString);
  }
  if (enumGuards.length === 0) return enumGuards;
  return enumGuards;
}

/**
 * Returns check for Enum if the type is a reference
 * @param refType - The type reference node
 * @param enums - The enum definitions
 */
function getTypeReferenceCheckForEnum(
  refType: TypeNode,
  enums: EnumDeclaration[],
) {
  if (!isTypeReferenceNode(refType)) return;
  const enumDefinition = enums.find(
    d => d.name.getText() === refType.typeName.getText(),
  );
  if (!enumDefinition) return;
  return `is${getEscapedCapitalizedStringLiteral(
    enumDefinition.name.getText(),
  )}(value)`;
}
