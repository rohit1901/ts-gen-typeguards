// Generate type guards for optional properties
import {factory, isTypeReferenceNode, isUnionTypeNode, PropertySignature, TypeAliasDeclaration} from "typescript";
import {
  getEscapedCapitalizedStringLiteral,
  getEscapedStringLiteral,
  isPrimitiveSyntaxKind,
  syntaxKindToType,
} from "../utils";
import {generateUnionTypeGuard} from "./generateUnionTypeGuard";

export function generateOptionalPropertyTypeGuard({
  questionToken,
  name,
  type,
}: PropertySignature, typeAliases: TypeAliasDeclaration[]): string {
  const propType = isTypeReferenceNode(type)
    ? type.typeName.getText()
    : syntaxKindToType(type.kind);
  const typeGuardCode: string[] = [];
  if (isTypeReferenceNode(type) && questionToken) {
    typeGuardCode.push(
      `if (value.hasOwnProperty('${getEscapedStringLiteral(
        name.getText(),
      )}') && !is${getEscapedCapitalizedStringLiteral(
        type.typeName.getText(),
      )}(value.${getEscapedStringLiteral(name.getText())})) {`,
    );
    typeGuardCode.push(`    return false;\n`);

    typeGuardCode.push(`}\n`);
  } else if (isPrimitiveSyntaxKind(type.kind) && questionToken) {
    typeGuardCode.push(
      `if (value.hasOwnProperty('${getEscapedStringLiteral(
        name.getText(),
      )}') && typeof value.${getEscapedStringLiteral(
        name.getText(),
      )} !== '${propType}') {`,
    );
    typeGuardCode.push(`    return false;\n`);

    typeGuardCode.push(`}\n`);
  }
  else if(isUnionTypeNode(type) && questionToken) {
    for(const prop of type.types) {
      typeGuardCode.push(generateUnionTypeGuard(factory.createTypeAliasDeclaration(undefined, factory.createIdentifier(name.getText()), undefined, prop), typeAliases));
    }
  }
  return typeGuardCode.join("");
}
