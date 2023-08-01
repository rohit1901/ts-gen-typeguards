import {
    factory,
    InterfaceDeclaration,
    IntersectionType,
    isIntersectionTypeNode,
    isPropertySignature,
    isTypeLiteralNode,
    isTypeReferenceNode, isUnionTypeNode,
    NodeArray,
    PropertySignature,
    SyntaxKind,
    TypeAliasDeclaration, TypeElement,
    TypeLiteralNode,
    TypeNode,
} from "typescript";
import {
  generateIntersectionTypeGuard,
  generatePropertyGuard,
  generateUnionTypeGuard,
} from "../api";
import { getEscapedCapitalizedStringLiteral, isKeyword } from "../utils";

export function generateTypeTypeGuard(
  definitions: TypeAliasDeclaration[],
): string {
  const typeGuard: string[] = [];
  for (let definition of definitions) {
    const typeGuardStrings: string[] = [];
    const { name, type } = definition;
    const typeName = name.getText();
    const typeGuardName = getEscapedCapitalizedStringLiteral(typeName);
    typeGuardStrings.push(`export function is${getEscapedCapitalizedStringLiteral(
      typeGuardName,
    )}(value: any): value is ${typeName} {return(typeof value === "object" &&
    value !== null`);
    typeGuardStrings.push(...generateTypeLiteralTypeGuard(definition));
    typeGuardStrings.push(
      ...generateUnionTypeGuard(definition.type, definition.name.getText()),
    );
    /*TODO:
           Handle intersection types. Intersections types are TypeAliasDeclarations with an IntersectionTypeNode as their type.
           If this type is an intersection type, it will have a types property which is a NodeArray<TypeNode>.
           The TypeNode can be a TypeReferenceNode, a TypeLiteralNode, or a KeywordTypeNode.
           The TypeAliasDeclaration's type property needs to be converted to a TypeLiteral with it's members property
           being the intersection of the members of the TypeNodes in the NodeArray<TypeNode>
         */
    typeGuard.push(typeGuardStrings.join("&&") + `)}`);
  }
  return typeGuard.join("\n");
}

function generateTypeLiteralTypeGuard(definition: TypeAliasDeclaration) {
  const { name, type } = definition;
  const typeName = name.getText();
  const typeGuardStrings: string[] = [];
  if (!isTypeLiteralNode(type)) {
    return "";
  }
  //NOTE: Return empty string if the definition is not a TypeLiteralNode
  for (const property of type.members) {
    typeGuardStrings.push(...generatePropertyGuard(property, typeName));
  }
  return typeGuardStrings;
}
function handleIntersectionTypes(definition: TypeAliasDeclaration, definitions: TypeAliasDeclaration[]): TypeAliasDeclaration {
    const { name, type } = definition;
    const members: TypeElement[] = [];
    if (!isIntersectionTypeNode(type)){
        return definition;
    }
    for(const typeNode of type.types){
        if (isTypeReferenceNode(typeNode)){
            const foundMember = definitions.find(d => d.name.getText() === typeNode.typeName.getText());
            if(isTypeLiteralNode(foundMember.type)) {
                members.push(...foundMember.type.members);
            } else {
                handleIntersectionTypes(foundMember, definitions);
            }
        }
        else if(isUnionTypeNode(typeNode)){
        }
        else if(isTypeLiteralNode(typeNode)){
        }
        else if(isKeyword(typeNode.kind)){
        }
        else{
            throw new Error(`Unhandled typeNode kind: ${typeNode.kind}`);
        }
    }
}
