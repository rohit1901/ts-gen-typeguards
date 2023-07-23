import * as ts from "typescript";

/**
 * Gets the members from a type alias
 * @param alias
 * @param typeAliases
 */
export function getMembersFromTypeAlias(alias: ts.TypeAliasDeclaration, typeAliases: ts.TypeAliasDeclaration[]) {
    if (ts.isTypeLiteralNode(alias.type)) return alias.type.members;
    if (ts.isIntersectionTypeNode(alias.type)) return getTypesFromIntersectionTypeNode(alias.type, typeAliases);
    console.log("")
    return;
}

/**
 * Gets the matching literal for a type reference
 * @param typeReference
 * @param typeAliases
 */
function getMatchingLiteralForReferences(typeReference: ts.TypeNode, typeAliases: ts.TypeAliasDeclaration[]): ts.TypeAliasDeclaration {
    return typeAliases.find((typeAlias) => {
        if (ts.isTypeReferenceNode(typeReference)) return typeAlias.name.getText() === typeReference.typeName.getText()
    })
}

/**
 * Gets the types from an intersection type node
 * @param intersectionTypeNode
 * @param typeAliases
 */
function getTypesFromIntersectionTypeNode(intersectionTypeNode: ts.IntersectionTypeNode, typeAliases: ts.TypeAliasDeclaration[]) {
    const types: ts.TypeElement[] = [];
    //TODO: check for LiteralTypeNode here
    intersectionTypeNode.types.forEach((type) => {
        if (ts.isTypeReferenceNode(type)) {
            const typeAlias = getMatchingLiteralForReferences(type, typeAliases);
            const members = getMembersFromTypeAlias(typeAlias, typeAliases);
            if (typeAlias) {
                members.map(m => {
                    if (ts.isTypeElement(m)) types.push(m)
                })
            }
        }
        if (ts.isTypeLiteralNode(type)) types.push(...type.members);
    });
    return types;
}