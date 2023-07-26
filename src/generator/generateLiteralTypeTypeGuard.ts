// Generate type guards for any types
import {isLiteralTypeNode, Node} from "typescript";
import {capitalize, getEscapedCapitalizedStringLiteral, getEscapedStringLiteral, syntaxKindToType} from "../utils";

export function generateLiteralTypeTypeGuard(literalType: Node): string {
    if(isLiteralTypeNode(literalType)) {
        if(!!literalType.literal.getText()) {
            const value = literalType.literal.getText();
            return `export function is${getEscapedCapitalizedStringLiteral(literalType.literal.getText())}(value: any): value is ${value} {\n  return value === ${value};\n}\n`;
        }
        return `export function is${capitalize(syntaxKindToType(literalType.literal.kind))}(value: any): value is ${getEscapedStringLiteral(syntaxKindToType(literalType.literal.kind))} {\n  return true;\n}\n`;
    }
    return ''
}