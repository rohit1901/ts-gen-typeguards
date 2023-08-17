import {
  isPropertySignature,
  isTypeReferenceNode,
  TypeElement,
} from 'typescript';

/**
 * Function to check if a property is a generic property. A generic property is a property that has a type of TypeReferenceNode
 * and the type name is the same as the type parameter name.
 * @param property - A TypeElement
 * @param typeParameterName - The name of the generic type parameter
 */
export function isGenericProperty(
  property: TypeElement,
  typeParameterName: string,
): boolean {
  return (
    isPropertySignature(property) &&
    isTypeReferenceNode(property.type) &&
    typeParameterName === property.type.typeName.getText()
  );
}
