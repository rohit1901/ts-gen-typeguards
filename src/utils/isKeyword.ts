import { SyntaxKind } from "typescript";

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
