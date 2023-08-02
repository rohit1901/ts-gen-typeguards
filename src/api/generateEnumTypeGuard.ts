import {
  EnumDeclaration,
  isEnumMember,
  isIntersectionTypeNode,
  isTypeReferenceNode,
  TypeAliasDeclaration,
} from 'typescript';
import { getEscapedCapitalizedStringLiteral } from '../utils';

/**
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
export function handleEnumIntersection(
  definition: TypeAliasDeclaration,
  enums: EnumDeclaration[],
) {
  const enumGuardsString = `export function is${getEscapedCapitalizedStringLiteral(
    definition.name.getText(),
  )}(value: any): value is ${getEscapedCapitalizedStringLiteral(
    definition.name.getText(),
  )} { return `;
  const enumGuards: string[] = [];
  if (!isIntersectionTypeNode(definition.type)) return [];
  for (const refType of definition.type.types) {
    if (isTypeReferenceNode(refType)) {
      const enumDefinition = enums.find(
        d => d.name.getText() === refType.typeName.getText(),
      );
      if (enumDefinition)
        enumGuards.push(
          `is${getEscapedCapitalizedStringLiteral(
            enumDefinition.name.getText(),
          )}(value)`,
        );
    }
  }
  if (enumGuards.length === 0) return [];
  //return enumGuardsString + (enumGuards.join('&&')) + '}';
  return enumGuards;
}
