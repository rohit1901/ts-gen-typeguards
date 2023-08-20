import {
  isArrayTypeNode,
  isTypeLiteralNode,
  isTypeReferenceNode,
  PropertySignature,
} from 'typescript';
import {
  getTernaryOperatorResult,
  isKeyword,
  isKeywordTypeSyntaxKind,
  isLiteralType,
  syntaxKindToType,
} from '../utils';
import { capitalize, replaceAll } from 'ts-raw-utils';
import { generatePropertyGuard } from '../api';

/**
 * Generates a type guard string for an array type property. The type guard string checks if the property is an array
 * and if all the items in the array are of the same type. The type of the items in the array is determined by the
 * propertyType parameter. If the propertyType parameter is not provided, the type of the items in the array is
 * determined by the property.type.getText() method.
 * @param property - The property to generate the type guard for.
 * @param propertyName
 */
export function generateArrayTypeGuard(
  property: PropertySignature,
  propertyName?: string,
) {
  if (!isArrayTypeNode(property.type)) return '';
  const arrayCheckName = getTernaryOperatorResult(
    !!propertyName,
    `value.${propertyName}`,
    `value`,
  );
  if (isLiteralType(property.type.elementType.kind))
    return `(Array.isArray(${arrayCheckName}) && ${arrayCheckName}.every((item: any) => item === ${property.type.elementType.getText()}))`;
  if (isTypeReferenceNode(property.type.elementType))
    return `(Array.isArray(${arrayCheckName}) && ${arrayCheckName}.every((item: any) => item === is${capitalize(
      property.type.elementType.getText(),
    )}(item)))`;
  if (isTypeLiteralNode(property.type.elementType)) {
    const guards = `${arrayCheckName}.every((elem: any) => {
            return (${property.type.elementType.members.map(member =>
              generatePropertyGuard(member)
                .map(item => replaceAll(item, 'value', 'elem'))
                .join(' && '),
            )})
        })`;
    return `(Array.isArray(value.${property.name.getText()}) && ${guards})`;
  }
  if (
    isKeyword(property.type.elementType.kind) &&
    isKeywordTypeSyntaxKind(property.type.elementType.kind)
  )
    return `(Array.isArray(${arrayCheckName}) && ${arrayCheckName}.every((item: any) => typeof item === '${syntaxKindToType(
      property.type.elementType.kind,
    )}'))`;
  return `(Array.isArray(${arrayCheckName}))`;
}
