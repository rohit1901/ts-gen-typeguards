/**
 * Check if value is "enum"
 * @param value
 */
export function isEnumString(value: any): value is "enum" {
    return typeof value === 'string' && value === "enum";
}