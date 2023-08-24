import { KeywordTypeSyntaxKind, SyntaxKind } from 'typescript';

/**
 * Function checks if the provided SyntaxKind is a BooleanKeyword.
 * @param kind
 */
export function isBooleanKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.BooleanKeyword {
  return kind === SyntaxKind.BooleanKeyword /* UndefinedKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a UndefinedKeyword.
 * @param kind
 */
// typeguard for undefined keyword
export function isUndefinedKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.UndefinedKeyword {
  return kind === SyntaxKind.UndefinedKeyword /* UndefinedKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a StringKeyword.
 * @param kind
 */
// typeguard for string keyword
export function isStringKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.StringKeyword {
  return kind === SyntaxKind.StringKeyword /* StringKeyword */;
}

// typeguard for number keyword
export function isNumberKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.NumberKeyword {
  return kind === SyntaxKind.NumberKeyword /* NumberKeyword */;
}

// typeguard for bigint keyword
export function isBigIntKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.BigIntKeyword {
  return kind === SyntaxKind.BigIntKeyword /* BigIntKeyword */;
}

// typeguard for symbol keyword
export function isSymbolKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.SymbolKeyword {
  return kind === SyntaxKind.SymbolKeyword /* SymbolKeyword */;
}

// typeguard for object keyword
export function isObjectKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.ObjectKeyword {
  return kind === SyntaxKind.ObjectKeyword /* ObjectKeyword */;
}

// typeguard for any keyword
export function isAnyKeyword(kind: SyntaxKind): kind is SyntaxKind.AnyKeyword {
  return kind === SyntaxKind.AnyKeyword /* AnyKeyword */;
}

// typeguard for unknown keyword
export function isUnknownKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.UnknownKeyword {
  return kind === SyntaxKind.UnknownKeyword /* UnknownKeyword */;
}

// typeguard for never keyword
export function isNeverKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.NeverKeyword {
  return kind === SyntaxKind.NeverKeyword /* NeverKeyword */;
}

// typeguard for void keyword
export function isVoidKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.VoidKeyword {
  return kind === SyntaxKind.VoidKeyword /* VoidKeyword */;
}

// typeguard for keyof keyword
export function isKeyofKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.KeyOfKeyword {
  return kind === SyntaxKind.KeyOfKeyword /* KeyOfKeyword */;
}
/**
 * Function checks if the provided SyntaxKind is a LiteralType.
 * @param kind
 */
export function isLiteralType(
  kind: SyntaxKind,
): kind is SyntaxKind.LiteralType {
  return kind === SyntaxKind.LiteralType /* LiteralType */;
}

/**
 * Function checks if the provided SyntaxKind is an IndexedAccessType.
 * @param kind
 */
export function isIndexedAccessType(
  kind: SyntaxKind,
): kind is SyntaxKind.IndexedAccessType {
  return kind === SyntaxKind.IndexedAccessType /* IndexedAccessType */;
}

/**
 * Type guard for the KeywordTypeSyntaxKind type.
 * @param kind The SyntaxKind value to be checked.
 * @returns True if the provided SyntaxKind is one of the keyword types in KeywordTypeSyntaxKind, false otherwise.
 */
export function isKeywordTypeSyntaxKind(
  kind: SyntaxKind,
): kind is KeywordTypeSyntaxKind {
  return [
    SyntaxKind.AnyKeyword,
    SyntaxKind.BigIntKeyword,
    SyntaxKind.BooleanKeyword,
    SyntaxKind.IntrinsicKeyword,
    SyntaxKind.NeverKeyword,
    SyntaxKind.NumberKeyword,
    SyntaxKind.ObjectKeyword,
    SyntaxKind.StringKeyword,
    SyntaxKind.SymbolKeyword,
    SyntaxKind.UndefinedKeyword,
    SyntaxKind.UnknownKeyword,
    SyntaxKind.VoidKeyword,
  ].includes(kind);
}

export type KeywordType =
  | SyntaxKind.BooleanKeyword
  | SyntaxKind.UndefinedKeyword
  | SyntaxKind.StringKeyword
  | SyntaxKind.NumberKeyword
  | SyntaxKind.BigIntKeyword
  | SyntaxKind.SymbolKeyword
  | SyntaxKind.ObjectKeyword
  | SyntaxKind.AnyKeyword
  | SyntaxKind.UnknownKeyword
  | SyntaxKind.NeverKeyword
  | SyntaxKind.VoidKeyword
  | SyntaxKind.KeyOfKeyword
  | SyntaxKind.NullKeyword
  | SyntaxKind.EnumKeyword
  | SyntaxKind.ThisKeyword
  | SyntaxKind.SuperKeyword
  | SyntaxKind.TrueKeyword
  | SyntaxKind.FalseKeyword
  | SyntaxKind.IntrinsicKeyword
  | SyntaxKind.ReadonlyKeyword
  | SyntaxKind.LiteralType
  | SyntaxKind.IndexedAccessType;

/**
 * Function checks if the provided SyntaxKind matches any keyword type.
 * @param kind
 */
export function isKeyword(kind: SyntaxKind): kind is KeywordType {
  /**
   * Define an array of all keyword types.
   */
  const keywordTypes: SyntaxKind[] = [
    SyntaxKind.BooleanKeyword,
    SyntaxKind.UndefinedKeyword,
    SyntaxKind.StringKeyword,
    SyntaxKind.NumberKeyword,
    SyntaxKind.BigIntKeyword,
    SyntaxKind.SymbolKeyword,
    SyntaxKind.ObjectKeyword,
    SyntaxKind.AnyKeyword,
    SyntaxKind.UnknownKeyword,
    SyntaxKind.NeverKeyword,
    SyntaxKind.VoidKeyword,
    SyntaxKind.KeyOfKeyword,
    SyntaxKind.NullKeyword,
    SyntaxKind.EnumKeyword,
    SyntaxKind.ThisKeyword,
    SyntaxKind.SuperKeyword,
    SyntaxKind.TrueKeyword,
    SyntaxKind.FalseKeyword,
    SyntaxKind.IntrinsicKeyword,
    SyntaxKind.ReadonlyKeyword,
    SyntaxKind.LiteralType,
    SyntaxKind.IndexedAccessType,
  ];
  return keywordTypes.includes(kind);
}
