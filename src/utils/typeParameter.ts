import {SyntaxKind} from 'typescript';

/**
 * Returns true if the SyntaxKind is a TypeParameter
 * @param kind - The SyntaxKind to check
 */
export function isTypeParameter(kind: SyntaxKind): boolean {
    return kind === SyntaxKind.TypeParameter;
}
