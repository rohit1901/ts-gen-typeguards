// Generate type guards for literal types
import {
  factory,
  isTypeReferenceNode,
  isUnionTypeNode,
  PropertySignature,
  TypeAliasDeclaration,
} from "typescript";
import {
  getEscapedCapitalizedStringLiteral,
  getEscapedStringLiteral,
  getMembersFromTypeAlias,
  isKeywordSyntaxKind,
  isPrimitiveSyntaxKind,
  syntaxKindToType,
} from "../utils";
import { generateUnionTypeGuard } from "./generateUnionTypeGuard";

export function generateTypeLiteralTypeGuard(
  { questionToken, name, type }: PropertySignature,
  typeAliases: TypeAliasDeclaration[],
): string {
  const propType = syntaxKindToType(type.kind);
  const typeGuardCode: string[] = [];
  if (isTypeReferenceNode(type) && !questionToken) {
    typeGuardCode.push(
      `if (!value.hasOwnProperty('${getEscapedStringLiteral(
        name.getText(),
      )}') || !is${getEscapedCapitalizedStringLiteral(
        type.typeName.getText(),
      )}(value.${getEscapedStringLiteral(name.getText())})) {`,
    );
    typeGuardCode.push(`    return false;\n`);

    typeGuardCode.push(`}\n`);
  } else if (isPrimitiveSyntaxKind(type.kind) && !questionToken) {
    typeGuardCode.push(
      `if (!value.hasOwnProperty('${getEscapedStringLiteral(
        name.getText(),
      )}') || typeof value.${getEscapedStringLiteral(
        name.getText(),
      )} !== '${propType}') {`,
    );
    typeGuardCode.push(`    return false;\n`);

    typeGuardCode.push(`}\n`);
  } else if (isUnionTypeNode(type)) {
    typeGuardCode.push(
      generateUnionTypeGuard(
        factory.createTypeAliasDeclaration(
          undefined,
          name.getText(),
          undefined,
          type,
        ),
        typeAliases,
      ),
    );
  }
  return typeGuardCode.join("");
}
