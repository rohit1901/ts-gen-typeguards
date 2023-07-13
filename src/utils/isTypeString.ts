//typeguard for type
export function isTypeString(value: any): value is "type" {
    return typeof value === 'string' && value === "type";
}