import {
  isIntersectionTypeNode,
  isQualifiedName,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  TypeNode,
  TypeReferenceNode,
} from 'typescript';
import {generateQualifiedNameTypeGuard} from '../api';
import {getEscapedCapitalizedStringLiteral} from 'ts-raw-utils';

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
    // Enums: Check if the typeName is a qualified name
    if (isQualifiedName(type.typeName)) {
        typeGuard.push(
            generateQualifiedNameTypeGuard(
                type.typeName,
                isProperty ? typeName : undefined,
            ),
        );
        return typeGuard;
    }
    if (isProperty) {
        // Generate type guard for property
        typeGuard.push(
            `is${getEscapedCapitalizedStringLiteral(
                type.typeName.getText(),
            )}${buildTypeArguments(
                type,
            )}(value.${typeName}, ${buildGenericParameterList(
                type,
                `value.${typeName}`,
            )})`,
        );
        return typeGuard;
    }
    if (type.typeArguments && type.typeArguments.length > 0) {
        type.typeArguments.forEach(typeArgument => {
            if (isQualifiedName(typeArgument)) {
                typeGuard.push(
                    generateQualifiedNameTypeGuard(
                        typeArgument,
                        typeArgument.left.getText(),
                    ),
                    ``,
                );
            }
        });
    }
    const functionParams = ['value'];
    functionParams.push(buildGenericParameterList(type, 'value'));
    // Generate type guard for non-property
    typeGuard.push(
        `is${getEscapedCapitalizedStringLiteral(
            type.typeName.getText(),
        )}${buildTypeArguments(type)}(${functionParams.join(',')})`,
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
function buildTypeArguments(typeReference: TypeReferenceNode) {
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
export function buildGenericParameterList(
    typeReference: TypeReferenceNode,
    functionParameter?: string,
) {
    const typeArguments = typeReference.typeArguments?.map(typeArgument => {
        if (isTypeReferenceNode(typeArgument)) {
            if (isQualifiedName(typeArgument.typeName)) {
                return typeArgument.typeName.left.getText();
            }
            return typeArgument.typeName.getText();
        }
        if (
            isTypeLiteralNode(typeArgument) ||
            isIntersectionTypeNode(typeArgument) ||
            isUnionTypeNode(typeArgument)
        ) {
            return 'CustomType';
        }
        return typeArgument.getText();
    });
    return (
        typeArguments
            ?.map(
                typeArgument => `is${getEscapedCapitalizedStringLiteral(typeArgument)}`,
            )
            .filter(v => !!v)
            .join(',') ?? ''
    );
}
