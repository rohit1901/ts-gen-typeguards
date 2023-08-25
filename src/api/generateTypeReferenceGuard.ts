import { getEscapedCapitalizedStringLiteral } from 'ts-raw-utils';
import {
  isIntersectionTypeNode,
  isQualifiedName,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode, TypeAliasDeclaration,
  TypeNode,
  TypeReferenceNode,
} from 'typescript';

import {
  generateQualifiedNameTypeGuard,
  getParametersForQualifiedName,
  getTypeArgumentStringForKeyword,
  getTypeArgumentStringForQualifiedName,
  getTypeReferenceGuardForQualifiedName,
  getTypeReferencePropertyFunctionSignature
} from '../api';

/**
 * Generates a type guard for a TypeReferenceNode. Used to generate type guard string for type aliases.
 * @param type - A TypeNode.
 * @param typeName - The name of the type.
 * @param isProperty - Optional boolean to indicate if the type is a property.
 * @param typeParameters
 * @returns An array of type guard strings.
 *
 * @example
 * // For type alias `Person` with property `name`
 * const typeNode = factory.createTypeReferenceNode('Person', []);
 * const typeName = 'name';
 * const typeGuards = generateTypeReferenceGuard(typeNode, typeName, true);
 * // Result: ['isPerson(value.name)']
 *
 * @example
 * // For type alias `Point`
 * const typeNode = factory.createTypeReferenceNode('Point', []);
 * const typeName = 'point';
 * const typeGuards = generateTypeReferenceGuard(typeNode, typeName);
 * // Result: ['isPoint(value)']
 */
export function generateTypeReferenceGuard(
  type: TypeNode,
  typeName: string,
  isProperty?: boolean,
) {
  const typeGuard: string[] = [];
  if (!isTypeReferenceNode(type)) return typeGuard;
  if(isQualifiedName(type.typeName)) return [getTypeReferenceGuardForQualifiedName(type, isProperty ? typeName : undefined)];
  if(isProperty) return [getTypeReferencePropertyFunctionSignature(typeName, type)];
  if (type.typeArguments && type.typeArguments.length > 0) {
    type.typeArguments.forEach(typeArgument => {
      if (isQualifiedName(typeArgument)) {
        typeGuard.push(
          generateQualifiedNameTypeGuard(
            typeArgument,
            typeArgument.left.getText(),
          ),
        );
        return typeGuard;
      }
    });
  }
  const functionParams = ['value'];
  functionParams.push(buildGenericParameterList(type));
  // Generate type guard for non-property
  typeGuard.push(
    `is${getEscapedCapitalizedStringLiteral(
      type.typeName.getText(),
    )}${buildTypeArgumentsForTypeReference(type)}(${functionParams.filter(p => typeof p === 'string').join(',')})`,
  );
  return typeGuard;
}

/**
 * Generates strings for TypeArguments if a TypeReferenceNode has them.
 * TypeArguments look like:
 * ```
 * <T>
 * <T, U>
 * <string>
 * ```
 * Result:
 * - <T>
 * - <T, U>
 * - <string>
 * @param typeReference - A TypeReferenceNode from which TypeArguments will be extracted.
 */
export function buildTypeArgumentsForTypeReference(typeReference: TypeReferenceNode) {
  const typeArguments = typeReference.typeArguments
    ?.map(typeArgument => {
      if (isTypeReferenceNode(typeArgument)) {
        return typeArgument.typeName.getText();
      }
      return typeArgument.getText();
    })
    .join(', ');
  if (typeArguments) return `<${typeArguments}>`;
  return '';
}

/**
 * Builds a comma-separated list of type guards based on the provided type reference's type arguments.
 * If a type argument is a TypeReferenceNode, it generates a type guard using its type name.
 * If a type argument is a complex type like a TypeLiteralNode, IntersectionTypeNode, or UnionTypeNode,
 * it generates a type guard using the placeholder 'CustomType'.
 *
 * @param {TypeReferenceNode} typeReference - The type reference node containing type arguments.
 * @param {string} [functionParameter] - An optional parameter for generating function parameters.
 * @returns {string} A comma-separated list of type guards for the type arguments.
 * @example
 * // Given a type reference with type arguments
 * // TypeReference: ShapeWithProperty<{ type: 'circle'; radius: number }>
 * const typeReference = getTypeReferenceNode(); // Type reference node
 * const result = buildGenericParameterList(typeReference);
 * // Result: "isShapeWithProperty,isCustomType"
 */
export function buildGenericParameterList(typeReference: TypeReferenceNode) {
  const typeArguments = typeReference.typeArguments?.map(typeArgument => {
    return getParametersForQualifiedName(typeArgument) ?? getCustomTypeParametersForSignature(typeArgument) ?? typeArgument.getText();
  });
  return (
    typeArguments
      ?.map(
        typeArgument => `is${getEscapedCapitalizedStringLiteral(typeArgument)}`,
      )
      .filter(v => typeof v === 'string')
      .join(',')
  );
}

/**
 * Function to generate a type guard signature for a TypeAliasDeclaration which has a TypeReferenceNode.
 * Within the type guard signature, the type guard signatures for the type arguments are generated for
 * TypeReferenceNodes with QualifiedNames, TypeLiteralNodes, IntersectionTypeNodes, or UnionTypeNodes.
 * @param definition - A TypeAliasDeclaration to generate a type guard signature for.
 */
export function buildTypeReferenceFuntionSignature(definition: TypeAliasDeclaration) {
  if(!isTypeReferenceNode(definition.type)) return '';
  const typeName: string = definition.name.escapedText.toString();
  if (
      definition.type.typeArguments &&
      definition.type.typeArguments.length > 0
  ) {
    const functionParams = ['value: any'];
    definition.type.typeArguments.forEach(typeArgument => {
      functionParams.push(getTypeArgumentStringForQualifiedName(typeArgument));
      functionParams.push(getTypeArgumentStringForKeyword(typeArgument));
      functionParams.push(getCustomTypeFunctionSignature(typeArgument));
    });
    return `export function is${getEscapedCapitalizedStringLiteral(
        typeName,
    )}(${functionParams.filter(p => typeof p === 'string').join(
        ',',
    )}): value is ${typeName} {return(value !== null`;
  }
}

/**
 * Function to get the type guard string for a TypeLiteralNode, IntersectionTypeNode, or UnionTypeNode and
 * return isCustomType: (val: any) =>  val is ${typeArgument.getText()}.
 * This is used to generate type guards for complex types.
 * @param typeArgument - A TypeNode with a TypeLiteralNode, IntersectionTypeNode, or UnionTypeNode.
 */
export function getCustomTypeFunctionSignature(typeArgument: TypeNode ) {
  if (
      isTypeLiteralNode(typeArgument) ||
      isIntersectionTypeNode(typeArgument) ||
      isUnionTypeNode(typeArgument)
  ) {
    return `isCustomType: (val: any) =>  val is ${typeArgument.getText()}`
  }
  return;
}

/**
 * Function to get the type guard string for a TypeLiteralNode, IntersectionTypeNode, or UnionTypeNode and
 * return CustomType as the type guard parameter.
 * @param typeArgument - A TypeNode with a TypeLiteralNode, IntersectionTypeNode, or UnionTypeNode.
 */
export function getCustomTypeParametersForSignature(typeArgument: TypeNode ) {
  if (
      isTypeLiteralNode(typeArgument) ||
      isIntersectionTypeNode(typeArgument) ||
      isUnionTypeNode(typeArgument)
  ) {
    return 'CustomType';
  }
  return;
}