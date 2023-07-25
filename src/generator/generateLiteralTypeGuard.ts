// Generate type guards for literal types
import {isTypeReferenceNode, PropertySignature,} from "typescript";
import {
    getEscapedCapitalizedStringLiteral,
    getEscapedStringLiteral,
    isKeywordSyntaxKind,
    isPrimitiveSyntaxKind,
    syntaxKindToType
} from "../utils";

export function generateLiteralTypeGuard({questionToken, name, type}: PropertySignature): string {
    const propType = syntaxKindToType(type.kind);
    const typeGuardCode: string[] = [];
    if (isTypeReferenceNode(type) && !questionToken) {
        typeGuardCode.push(`if (!value.hasOwnProperty('${getEscapedStringLiteral(name.getText())}') || !is${getEscapedCapitalizedStringLiteral(type.typeName.getText())}(value.${getEscapedStringLiteral(name.getText())})) {`);
        typeGuardCode.push(`    return false;\n`);

        typeGuardCode.push(`}\n`);
    } else if (isPrimitiveSyntaxKind(type.kind) && !questionToken) {
        typeGuardCode.push(`if (!value.hasOwnProperty('${getEscapedStringLiteral(name.getText())}') || typeof value.${getEscapedStringLiteral(name.getText())} !== '${propType}') {`);
        typeGuardCode.push(`    return false;\n`);

        typeGuardCode.push(`}\n`);
    }
    return typeGuardCode.join("");
}

