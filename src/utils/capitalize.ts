export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getEscapedStringLiteral(str: string): string {
    return str.replace(/['"]/g, '')
}

export function getEscapedCapitalizedStringLiteral(str: string): string {
    return capitalize(getEscapedStringLiteral(str))
}