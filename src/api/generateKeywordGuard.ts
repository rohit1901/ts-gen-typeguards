import { isLiteralTypeNode, TypeNode } from "typescript";
import { getLiteralType, isKeyword, syntaxKindToType } from "../utils";

export function generateKeywordGuard(type: TypeNode, propertyName: string) {
  const typeGuard: string[] = [];
  if (!isKeyword(type.kind)) return typeGuard;
  if (isLiteralTypeNode(type)) {
    typeGuard.push(
      `typeof value.${propertyName} === '${getLiteralType(type.literal.kind)}'`,
    );
    return typeGuard;
  }
  typeGuard.push(
    `typeof value.${propertyName} === '${syntaxKindToType(type.kind)}'`,
  );
  return typeGuard;
}
