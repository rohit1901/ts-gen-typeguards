import {
  factory,
  IntersectionTypeNode,
  isConditionalTypeNode,
  isIntersectionTypeNode,
  isLiteralTypeNode,
  isTypeElement,
  isTypeLiteralNode,
  isTypeReferenceNode,
  isUnionTypeNode,
  LiteralTypeNode,
  NodeArray,
  PropertySignature,
  SyntaxKind,
  TypeAliasDeclaration,
  TypeElement,
  TypeNode,
  UnionTypeNode,
} from 'typescript';
import { syntaxKindToType } from './syntaxKindToType';

/**
 * Gets the members from a type alias
 * @param alias
 * @param typeAliases
 * @returns {TypeElement[]}
 */
export function getMembersFromTypeAlias(
  alias: TypeAliasDeclaration,
  typeAliases: TypeAliasDeclaration[],
): NodeArray<TypeElement> | TypeElement[] {
  if (isTypeLiteralNode(alias.type)) {
    return alias.type.members;
  } else if (isIntersectionTypeNode(alias.type)) {
    return getTypesFromIntersectionTypeNode(alias.type, typeAliases);
  } else if (isUnionTypeNode(alias.type)) {
    return getTypesFromUnionTypeNode(alias.type, typeAliases);
  } else if (isConditionalTypeNode(alias.type)) {
    return getTypesFromConditionalTypeNode(alias.type, typeAliases);
  }
  return [];
}

/**
 * Gets the matching literal for a type reference
 * @param typeReference
 * @param typeAliases
 */
function getMatchingLiteralForReferences(
  typeReference: TypeNode,
  typeAliases: TypeAliasDeclaration[],
): TypeAliasDeclaration | undefined {
  if (isTypeReferenceNode(typeReference)) {
    return typeAliases.find(
      typeAlias =>
        typeAlias.name.getText() === typeReference.typeName.getText(),
    );
  }
  return undefined;
}

/**
 * Gets the types from a type node
 * @param typeNode
 * @param typeAliases
 */
function getTypesFromTypeNode(
  typeNode: TypeNode,
  typeAliases: TypeAliasDeclaration[],
): NodeArray<TypeElement> | TypeElement[] {
  const typeCheckActions: {
    [key: string]: (
      typeNode: TypeNode,
      typeAliases: TypeAliasDeclaration[],
    ) => NodeArray<TypeElement> | TypeElement[];
  } = {
    [SyntaxKind.TypeReference]: getTypesFromTypeReference,
    [SyntaxKind.TypeLiteral]: getTypesFromTypeLiteral,
    [SyntaxKind.LiteralType]: getTypesFromLiteralType,
    [SyntaxKind.ConditionalType]: getTypesFromConditionalType,
    [SyntaxKind.UnionType]: getTypesFromUnionType,
  };

  const action = typeCheckActions[typeNode.kind];
  return action ? action(typeNode, typeAliases) : [];
}

/**
 * Gets the types from a type reference
 * @param typeNode
 * @param typeAliases
 */
function getTypesFromTypeReference(
  typeNode: TypeNode,
  typeAliases: TypeAliasDeclaration[],
): NodeArray<TypeElement> | TypeElement[] {
  const typeAlias = getMatchingLiteralForReferences(typeNode, typeAliases);
  return typeAlias
    ? getMembersFromTypeAlias(typeAlias, typeAliases).filter(isTypeElement)
    : [];
}

/**
 * Gets the types from a type literal
 * @param typeNode
 */
function getTypesFromTypeLiteral(
  typeNode: TypeNode,
): NodeArray<TypeElement> | TypeElement[] {
  return isTypeLiteralNode(typeNode) ? typeNode.members : [];
}

/**
 * Gets the types from a literal type
 * @param typeNode
 */
function getTypesFromLiteralType(
  typeNode: TypeNode,
): NodeArray<TypeElement> | TypeElement[] {
  return isLiteralTypeNode(typeNode)
    ? [
        createPropertySignatureFromLiteralType(
          typeNode.literal.getText(),
          typeNode,
        ),
      ]
    : [];
}

/**
 * Gets the types from a conditional type
 * @param typeNode
 * @param typeAliases
 */
function getTypesFromConditionalType(
  typeNode: TypeNode,
  typeAliases: TypeAliasDeclaration[],
): NodeArray<TypeElement> | TypeElement[] {
  return isConditionalTypeNode(typeNode)
    ? getTypesFromConditionalTypeNode(typeNode, typeAliases)
    : [];
}

function getTypesFromUnionType(
  typeNode: TypeNode,
  typeAliases: TypeAliasDeclaration[],
): NodeArray<TypeElement> | TypeElement[] {
  return isUnionTypeNode(typeNode)
    ? getTypesFromUnionTypeNode(typeNode, typeAliases)
    : [];
}

/**
 * Gets the types from a type node array
 * @param typeNodes
 * @param typeAliases
 */
function getTypesFromTypeNodeArray(
  typeNodes: NodeArray<TypeNode> | TypeNode[],
  typeAliases: TypeAliasDeclaration[],
): TypeElement[] {
  return typeNodes.flatMap(typeNode =>
    getTypesFromTypeNode(typeNode, typeAliases),
  );
}

/**
 * Gets the types from an intersection type node
 * @param intersectionTypeNode
 * @param typeAliases
 */
function getTypesFromIntersectionTypeNode(
  intersectionTypeNode: IntersectionTypeNode,
  typeAliases: TypeAliasDeclaration[],
): TypeElement[] {
  return getTypesFromTypeNodeArray(intersectionTypeNode.types, typeAliases);
}

/**
 * Gets the types from a union type node
 * @param unionTypeNode
 * @param typeAliases
 */
function getTypesFromUnionTypeNode(
  unionTypeNode: UnionTypeNode,
  typeAliases: TypeAliasDeclaration[],
): TypeElement[] {
  return getTypesFromTypeNodeArray(unionTypeNode.types, typeAliases);
}

/**
 * Gets the types from a conditional type node
 * @param conditionalTypeNode
 * @param typeAliases
 */
function getTypesFromConditionalTypeNode(
  conditionalTypeNode: TypeNode,
  typeAliases: TypeAliasDeclaration[],
): TypeElement[] {
  if (isConditionalTypeNode(conditionalTypeNode)) {
    const trueType = getTypesFromTypeNode(
      conditionalTypeNode.trueType,
      typeAliases,
    );
    const falseType = getTypesFromTypeNode(
      conditionalTypeNode.falseType,
      typeAliases,
    );
    return [...trueType, ...falseType];
  }
  return [];
}

/**
 * Creates a property signature from a literal type
 * NOTE: (HACK) _typeNodeBrand is a private property used to explicity set the type of a LiteralTypeNode to a string literal to be used in the type guard function
 * @param name
 * @param literalType
 * @returns {PropertySignature}
 */
function createPropertySignatureFromLiteralType(
  name: string,
  literalType: LiteralTypeNode,
): PropertySignature {
  let typeNode: TypeNode;
  switch (literalType.literal.kind) {
    case SyntaxKind.StringLiteral:
      typeNode = factory.createKeywordTypeNode(SyntaxKind.StringKeyword);
      typeNode._typeNodeBrand = syntaxKindToType(SyntaxKind.StringKeyword);
      break;
    case SyntaxKind.NumericLiteral:
      typeNode = factory.createKeywordTypeNode(SyntaxKind.NumberKeyword);
      typeNode._typeNodeBrand = syntaxKindToType(SyntaxKind.NumberKeyword);
      break;
    case SyntaxKind.TrueKeyword:
    case SyntaxKind.FalseKeyword:
      typeNode = factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword);
      typeNode._typeNodeBrand = syntaxKindToType(SyntaxKind.BooleanKeyword);
      break;
    case SyntaxKind.NullKeyword:
      typeNode = factory.createLiteralTypeNode(factory.createNull());
      typeNode._typeNodeBrand = syntaxKindToType(SyntaxKind.NullKeyword);
      break;
    case SyntaxKind.UndefinedKeyword:
      typeNode = factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword);
      typeNode._typeNodeBrand = syntaxKindToType(SyntaxKind.UndefinedKeyword);
      break;
    default:
      throw new Error('Unsupported literal type.');
  }
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(name),
    undefined,
    typeNode,
  );
}
