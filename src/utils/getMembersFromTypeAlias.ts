import {
    factory,
    IntersectionTypeNode, isConditionalTypeNode,
    isIntersectionTypeNode,
    isLiteralTypeNode,
    isTypeElement,
    isTypeLiteralNode,
    isTypeReferenceNode,
    isUnionTypeNode,
    LiteralTypeNode, NodeArray,
    PropertySignature,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeElement,
    TypeNode,
    UnionTypeNode
} from "typescript";
import {syntaxKindToType} from "./syntaxKindToType";

/**
 * Gets the members from a type alias
 * @param alias
 * @param typeAliases
 * @returns {TypeElement[]}
 */
export function getMembersFromTypeAlias(alias: TypeAliasDeclaration, typeAliases: TypeAliasDeclaration[]) {
    if (isTypeLiteralNode(alias.type)) return alias.type.members;
    if (isIntersectionTypeNode(alias.type)) return getTypesFromIntersectionTypeNode(alias.type, typeAliases);
    if (isUnionTypeNode(alias.type)) return getTypesFromUnionTypeNode(alias.type, typeAliases);
    else if (isConditionalTypeNode(alias.type)) {
        return getTypesFromConditionalTypeNode(alias.type, typeAliases);
    }
    return [];
}

/**
 * Gets the matching literal for a type reference
 * @param typeReference
 * @param typeAliases
 */
function getMatchingLiteralForReferences(typeReference: TypeNode, typeAliases: TypeAliasDeclaration[]): TypeAliasDeclaration | undefined {
    if (isTypeReferenceNode(typeReference)) {
        return typeAliases.find((typeAlias) => typeAlias.name.getText() === typeReference.typeName.getText());
    }
    return undefined;
}

function getTypesFromTypeNode(typeNode: TypeNode, typeAliases: TypeAliasDeclaration[]): NodeArray<TypeElement> | TypeElement[] {
    if (isTypeReferenceNode(typeNode)) {
        const typeAlias = getMatchingLiteralForReferences(typeNode, typeAliases);
        if (typeAlias) {
            return getMembersFromTypeAlias(typeAlias, typeAliases).filter(isTypeElement);
        }
    } else if (isTypeLiteralNode(typeNode)) {
        return typeNode.members;
    } else if (isLiteralTypeNode(typeNode)) {
        return [createPropertySignatureFromLiteralType(typeNode.literal.getText(), typeNode)];
    } else if (isConditionalTypeNode(typeNode)) {
        // Extract the types from the conditional type
        const trueType = getTypesFromTypeNode(typeNode.trueType, typeAliases);
        const falseType = getTypesFromTypeNode(typeNode.falseType, typeAliases);
        return [...trueType, ...falseType];
    }
    return [];
}

function getTypesFromTypeNodeArray(typeNodes: NodeArray<TypeNode> | TypeNode[], typeAliases: TypeAliasDeclaration[]): TypeElement[] {
    return typeNodes.flatMap((typeNode) => getTypesFromTypeNode(typeNode, typeAliases));
}

function getTypesFromIntersectionTypeNode(intersectionTypeNode: IntersectionTypeNode, typeAliases: TypeAliasDeclaration[]): TypeElement[] {
    return getTypesFromTypeNodeArray(intersectionTypeNode.types, typeAliases);
}

function getTypesFromUnionTypeNode(unionTypeNode: UnionTypeNode, typeAliases: TypeAliasDeclaration[]): TypeElement[] {
    return getTypesFromTypeNodeArray(unionTypeNode.types, typeAliases);
}

// Utility function to get TypeElement[] from conditional type's trueType and falseType
function getTypesFromConditionalTypeNode(conditionalTypeNode: TypeNode, typeAliases: TypeAliasDeclaration[]): TypeElement[] {
    if (isConditionalTypeNode(conditionalTypeNode)) {
        const trueType = getTypesFromTypeNode(conditionalTypeNode.trueType, typeAliases);
        const falseType = getTypesFromTypeNode(conditionalTypeNode.falseType, typeAliases);
        return [...trueType, ...falseType];
    }
    return [];
}

function createPropertySignatureFromLiteralType(name: string, literalType: LiteralTypeNode): PropertySignature {
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
        typeNode
    );
}