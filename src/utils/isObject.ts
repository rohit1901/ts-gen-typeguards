/**
 * Check if value is an object
 * @param value
 */
export function isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
}