// Generate type guards for any types
import {isLiteralTypeNode, Node} from 'typescript';
import {syntaxKindToType} from '../utils';

/**
 * Generates a type guard condition for a literal type node.
 *
 * @param {Node} literalType - The literal type node to generate a type guard for.
 * @returns {string} A type guard condition as a string.
 */
export function generateLiteralTypeTypeGuard(literalType: Node): string {
    if (isLiteralTypeNode(literalType)) {
        if (!!literalType.literal?.getText()) {
            const value = literalType.literal.getText();
            return `(value !== ${literalType.literal.getText()})`;
        }
        return `(value !== ${syntaxKindToType(literalType.literal.kind)})`;
    }
    return '';
}
