import { KeywordSyntaxKind, SyntaxKind } from "typescript";

/**
 * Converts a SyntaxKind value to a string type.
 * @param syntaxKind
 */
export function syntaxKindToType(syntaxKind: SyntaxKind): string {
  switch (syntaxKind) {
    case SyntaxKind.StringKeyword:
      return "string";
    case SyntaxKind.NumberKeyword:
      return "number";
    case SyntaxKind.BooleanKeyword:
      return "boolean";
    case SyntaxKind.NullKeyword:
      return "null";
    case SyntaxKind.UndefinedKeyword:
      return "undefined";
    case SyntaxKind.TypeReference:
      return "reference";
    case SyntaxKind.TypeLiteral:
      return "typeLiteral";
    case SyntaxKind.UnionType:
      return "unionType";
    case SyntaxKind.ExportKeyword:
      return "export";
    default:
      throw new Error(`Unsupported SyntaxKind value: ${syntaxKind}`);
  }
}

export function isKeywordSyntaxKind(value: any): value is KeywordSyntaxKind {
  // Check if the value is a valid enum member of KeywordSyntaxKind
  return Object.values(SyntaxKind).includes(value);
}
export type PrimitiveSyntaxKind =
  | SyntaxKind.NumberKeyword
  | SyntaxKind.StringKeyword
  | SyntaxKind.BooleanKeyword
  | SyntaxKind.NullKeyword
  | SyntaxKind.UndefinedKeyword;

export function isPrimitiveSyntaxKind(
  value: any,
): value is PrimitiveSyntaxKind {
  return (
    value === SyntaxKind.NumberKeyword ||
    value === SyntaxKind.StringKeyword ||
    value === SyntaxKind.BooleanKeyword ||
    value === SyntaxKind.NullKeyword ||
    value === SyntaxKind.UndefinedKeyword
  );
}
