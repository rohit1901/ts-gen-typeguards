import { KeywordSyntaxKind, SyntaxKind } from "typescript";

/**
 * Converts a SyntaxKind value to a string type.
 * @param syntaxKind
 */
export function syntaxKindToType(syntaxKind: SyntaxKind): string {
  switch (syntaxKind) {
    case SyntaxKind.BooleanKeyword:
      return "boolean";
    case SyntaxKind.UndefinedKeyword:
      return "undefined";
    case SyntaxKind.StringKeyword:
      return "string";
    case SyntaxKind.NumberKeyword:
      return "number";
    case SyntaxKind.BigIntKeyword:
      return "bigint";
    case SyntaxKind.SymbolKeyword:
      return "symbol";
    case SyntaxKind.ObjectKeyword:
      return "object";
    case SyntaxKind.AnyKeyword:
      return "any";
    case SyntaxKind.UnknownKeyword:
      return "unknown";
    case SyntaxKind.NeverKeyword:
      return "never";
    case SyntaxKind.VoidKeyword:
      return "void";
    case SyntaxKind.KeyOfKeyword:
      return "keyof";
    case SyntaxKind.NullKeyword:
      return "null";
    case SyntaxKind.EnumKeyword:
      return "enum";
    case SyntaxKind.ThisKeyword:
      return "this";
    case SyntaxKind.SuperKeyword:
      return "super";
    case SyntaxKind.TrueKeyword:
      return "true";
    case SyntaxKind.FalseKeyword:
      return "false";
    case SyntaxKind.IntrinsicKeyword:
      return "intrinsic";
    case SyntaxKind.ReadonlyKeyword:
      return "readonly";
    case SyntaxKind.LiteralType:
      return "literal";
    case SyntaxKind.IndexedAccessType:
      return "indexedAccess";
    default:
      // Return an empty string for unknown SyntaxKind values
      return "";
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
