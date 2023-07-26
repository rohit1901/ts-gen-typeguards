// Generate type guards for any types
import {isLiteralTypeNode, Node} from "typescript";
import {capitalize, getEscapedCapitalizedStringLiteral, getEscapedStringLiteral, syntaxKindToType} from "../utils";

export function generateLiteralTypeTypeGuard(literalType: Node): string {
    const typeGuardCondition: string[] = [];
    if(isLiteralTypeNode(literalType)) {
        if(!!literalType.literal.getText()) {
            const value = literalType.literal.getText();
            return `(value !== ${literalType.literal.getText()})`;
        }
        return `(value !== ${syntaxKindToType(literalType.literal.kind)})`;
    }
    return ''
}