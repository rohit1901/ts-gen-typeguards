import * as ts from "typescript";

export function getMembersFromTypeAlias(typeAliasDeclaration: ts.TypeAliasDeclaration): ts.NodeArray<ts.TypeElement> {
    const typeLiteralNode = typeAliasDeclaration.type as ts.TypeLiteralNode;
    return typeLiteralNode.members;
}