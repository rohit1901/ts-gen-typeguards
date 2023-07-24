/**
 * Check if value is a string and is equal to "type"
 * @param value
 */
export function isTypeString(value: any): value is "type" {
    return typeof value === 'string' && value === "type";
}