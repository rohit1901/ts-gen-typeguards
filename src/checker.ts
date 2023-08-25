import {
  IntersectionTypeNode,
  isEnumDeclaration,
  isInterfaceDeclaration,
  isPropertySignature,
  isTypeAliasDeclaration,
  isTypeLiteralNode,
  Node,
  Statement,
  SyntaxKind,
} from 'typescript';

import { isLiteralType } from './utils';

export function inferIntersectionType(
  definition: IntersectionTypeNode,
  statements: Statement[],
) {
  definition.forEachChild(node => {
    const firstToken = node.getText();
    const foundDefinition = findMatchingDefinition(firstToken, statements);
    printAllChildren(foundDefinition);
  });
}
function findMatchingDefinition(name: string, statements: Statement[]) {
  const foundInterface = statements
    .filter(isInterfaceDeclaration)
    .find(interfaceDeclaration => interfaceDeclaration.name.getText() === name);
  const foundType = statements
    .filter(isTypeAliasDeclaration)
    .find(typeDeclaration => typeDeclaration.name.getText() === name);
  const foundEnum = statements
    .filter(isEnumDeclaration)
    .find(enumDeclaration => enumDeclaration.name.getText() === name);
  return foundInterface || foundType || foundEnum;
}

function printAllChildren(node: Node) {
  if (isInterfaceDeclaration(node)) {
    node.members.forEach(member => {
      if (isPropertySignature(member)) {
        console.log(
          member.name.getText(),
          SyntaxKind[member.type.kind],
          isLiteralType(member.type.kind) ? member.type.getText() : '',
        );
      }
      printAllChildren(member);
    });
  }
  if (isTypeLiteralNode(node)) {
    node.members.forEach(member => {
      if (isPropertySignature(member)) {
        console.log(
          member.name.getText(),
          SyntaxKind[member.type.kind],
          isLiteralType(member.type.kind) ? member.type.getText() : '',
        );
      }
      printAllChildren(member);
    });
  }
  if (isTypeAliasDeclaration(node) && isTypeLiteralNode(node.type)) {
    node.type.members.forEach(member => {
      if (isPropertySignature(member)) {
        console.log(
          member.name.getText(),
          SyntaxKind[member.type.kind],
          isLiteralType(member.type.kind) ? member.type.getText() : '',
        );
      }
      printAllChildren(member);
    });
  }
  if (isPropertySignature(node) && isTypeLiteralNode(node.type)) {
    node.type.members.forEach(member => {
      if (isPropertySignature(member)) {
        console.log(
          member.name.getText(),
          SyntaxKind[member.type.kind],
          isLiteralType(member.type.kind) ? member.type.getText() : '',
        );
      }
      printAllChildren(member);
    });
  }
}
