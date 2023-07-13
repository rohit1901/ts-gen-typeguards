//typeguard for enum
export function isEnumString(value: any): value is "enum" {
    return typeof value === 'string' && value === "enum";
}