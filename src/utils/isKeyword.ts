import { KeywordTypeSyntaxKind, SyntaxKind } from 'typescript';

/**
 * Function checks if the provided SyntaxKind is a BooleanKeyword.
 * @param kind
 */
export function isBooleanKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.BooleanKeyword {
  return kind === 136 /* UndefinedKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a UndefinedKeyword.
 * @param kind
 */
// typeguard for undefined keyword
export function isUndefinedKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.UndefinedKeyword {
  return kind === 157 /* UndefinedKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a StringKeyword.
 * @param kind
 */
// typeguard for string keyword
export function isStringKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.StringKeyword {
  return kind === 154 /* StringKeyword */;
}

// typeguard for number keyword
export function isNumberKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.NumberKeyword {
  return kind === 150 /* NumberKeyword */;
}

// typeguard for bigint keyword
export function isBigIntKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.BigIntKeyword {
  return kind === 162 /* BigIntKeyword */;
}

// typeguard for symbol keyword
export function isSymbolKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.SymbolKeyword {
  return kind === 155 /* SymbolKeyword */;
}

// typeguard for object keyword
export function isObjectKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.ObjectKeyword {
  return kind === 151 /* ObjectKeyword */;
}

// typeguard for any keyword
export function isAnyKeyword(kind: SyntaxKind): kind is SyntaxKind.AnyKeyword {
  return kind === 133 /* AnyKeyword */;
}

// typeguard for unknown keyword
export function isUnknownKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.UnknownKeyword {
  return kind === 159 /* UnknownKeyword */;
}

// typeguard for never keyword
export function isNeverKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.NeverKeyword {
  return kind === 146 /* NeverKeyword */;
}

// typeguard for void keyword
export function isVoidKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.VoidKeyword {
  return kind === 116 /* VoidKeyword */;
}

// typeguard for keyof keyword
export function isKeyofKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.KeyOfKeyword {
  return kind === 143 /* KeyOfKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a NullKeyword.
 * @param kind
 */
export function isNullKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.NullKeyword {
  return kind === 106 /* NullKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is an EnumKeyword.
 * @param kind
 */
export function isEnumKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.EnumKeyword {
  return kind === 94 /* EnumKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a ThisKeyword.
 * @param kind
 */
export function isThisKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.ThisKeyword {
  return kind === 110 /* ThisKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a SuperKeyword.
 * @param kind
 */
export function isSuperKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.SuperKeyword {
  return kind === 108 /* SuperKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a TrueKeyword.
 * @param kind
 */
export function isTrueKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.TrueKeyword {
  return kind === 112 /* TrueKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a FalseKeyword.
 * @param kind
 */
export function isFalseKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.FalseKeyword {
  return kind === 97 /* FalseKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a IntrinsicKeyword.
 * @param kind
 */
export function isIntrinsicKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.IntrinsicKeyword {
  return kind === 141 /* IntrinsicKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a ReadonlyKeyword.
 * @param kind
 */
export function isReadonlyKeyword(
  kind: SyntaxKind,
): kind is SyntaxKind.ReadonlyKeyword {
  return kind === 148 /* ReadonlyKeyword */;
}

/**
 * Function checks if the provided SyntaxKind is a LiteralType.
 * @param kind
 */
export function isLiteralType(
  kind: SyntaxKind,
): kind is SyntaxKind.LiteralType {
  return kind === 201 /* LiteralType */;
}

/**
 * Function checks if the provided SyntaxKind is an IndexedAccessType.
 * @param kind
 */
export function isIndexedAccessType(
  kind: SyntaxKind,
): kind is SyntaxKind.IndexedAccessType {
  return kind === 199 /* IndexedAccessType */;
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
