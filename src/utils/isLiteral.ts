import { SyntaxKind } from "typescript";

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
    [SyntaxKind.StringLiteral]: "string",
    [SyntaxKind.NumericLiteral]: "number",
    [SyntaxKind.BigIntLiteral]: "bigint",
    [SyntaxKind.TrueKeyword]: "boolean",
    [SyntaxKind.FalseKeyword]: "boolean",
    [SyntaxKind.NullKeyword]: "null",
    [SyntaxKind.RegularExpressionLiteral]: "regexp",
    [SyntaxKind.NoSubstitutionTemplateLiteral]: "string",
};
/**
 * Getter function that returns the type of a literal based on its SyntaxKind.
 * @param kind
 */
export function getLiteralType(kind: SyntaxKind): string | undefined {
    return literalTypeMap[kind];
}
