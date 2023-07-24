import {SyntaxKind} from "typescript";

/**
 * Converts a SyntaxKind value to a string type.
 * @param syntaxKind
 */
export function syntaxKindToType(syntaxKind: SyntaxKind): string {
    switch (syntaxKind) {
        case SyntaxKind.StringKeyword:
            return 'string';
        case SyntaxKind.NumberKeyword:
            return 'number';
        case SyntaxKind.BooleanKeyword:
            return 'boolean';
        case SyntaxKind.NullKeyword:
            return 'null';
        case SyntaxKind.UndefinedKeyword:
            return 'undefined';
        default:
            throw new Error(`Unsupported SyntaxKind value: ${syntaxKind}`);
    }
}