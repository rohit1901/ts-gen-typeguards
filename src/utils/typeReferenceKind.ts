import {SyntaxKind} from 'typescript';

/**
 * Returns true if the kind is a type reference.
 * @param kind
 */
export function isTyperReferenceKind(kind) {
    return kind === SyntaxKind.TypeReference;
}
