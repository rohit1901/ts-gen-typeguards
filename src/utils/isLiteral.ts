import {isLiteralTypeLiteral, isLiteralTypeNode, LiteralType, LiteralTypeNode, SyntaxKind} from 'typescript';
import {getEscapedStringLiteral} from "./capitalize";

/**
 * Define an array of all literal types.
 */
const literalTypes: SyntaxKind[] = [
  SyntaxKind.StringLiteral,
  SyntaxKind.NumericLiteral,
  SyntaxKind.BigIntLiteral,
  SyntaxKind.TrueKeyword,
  SyntaxKind.FalseKeyword,
  SyntaxKind.NullKeyword,
  SyntaxKind.RegularExpressionLiteral,
  SyntaxKind.NoSubstitutionTemplateLiteral,
];

/**
 * Function checks if the provided SyntaxKind matches any literal type.
 * @param kind
 */
export function isLiteral(kind: SyntaxKind): kind is SyntaxKind.LiteralType {
  return literalTypes.includes(kind);
}
/**
 * Enum containing only the SyntaxKind values of literal types.
 */
enum LiteralSyntaxKind {
  StringLiteral = SyntaxKind.StringLiteral,
  NumericLiteral = SyntaxKind.NumericLiteral,
  BigIntLiteral = SyntaxKind.BigIntLiteral,
  TrueKeyword = SyntaxKind.TrueKeyword,
  FalseKeyword = SyntaxKind.FalseKeyword,
  NullKeyword = SyntaxKind.NullKeyword,
  RegularExpressionLiteral = SyntaxKind.RegularExpressionLiteral,
  NoSubstitutionTemplateLiteral = SyntaxKind.NoSubstitutionTemplateLiteral,
}
/**
 * Define a map that maps SyntaxKind to their corresponding literal types.
 */
const literalTypeMap: { [key in LiteralSyntaxKind]: string } = {
  [SyntaxKind.StringLiteral]: 'string',
  [SyntaxKind.NumericLiteral]: 'number',
  [SyntaxKind.BigIntLiteral]: 'bigint',
  [SyntaxKind.TrueKeyword]: 'boolean',
  [SyntaxKind.FalseKeyword]: 'boolean',
  [SyntaxKind.NullKeyword]: 'null',
  [SyntaxKind.RegularExpressionLiteral]: 'regexp',
  [SyntaxKind.NoSubstitutionTemplateLiteral]: 'string',
};
type spFunction = (type: LiteralTypeNode) => string | number | bigint | boolean | RegExp | undefined;
const literalTypeValues: Record<LiteralSyntaxKind, spFunction> = {
  [SyntaxKind.StringLiteral]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return type.getText();
    return;
  },
  [SyntaxKind.NumericLiteral]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return +(type.getText());
    return;
  },
  [SyntaxKind.BigIntLiteral]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return +(type.getText());
    return;
  },
  [SyntaxKind.TrueKeyword]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return Boolean(type.getText());
    return;
  },
  [SyntaxKind.FalseKeyword]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return Boolean(type.getText());
    return;
  },
  [SyntaxKind.NullKeyword]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return 'null';
    return;
  },
  [SyntaxKind.RegularExpressionLiteral]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return new RegExp(type.literal.getText());
    return;
  },
  [SyntaxKind.NoSubstitutionTemplateLiteral]: (type: LiteralTypeNode) => {
    if(isLiteral(type.kind)) return type.getText();
    return;
  },
};
/**
 * Getter function that returns the type of a literal based on its SyntaxKind.
 * @param kind
 */
export function getLiteralType(kind: SyntaxKind): string | undefined {
  return literalTypeMap[kind];
}
export function getLiteralTypeValue(type: LiteralTypeNode) {
  return literalTypeValues[type.literal.kind](type.literal)
}
