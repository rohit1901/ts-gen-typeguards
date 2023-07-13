//typeguard for interface
export function isInterfaceString(value: any): value is "interface" {
    return typeof value === 'string' && value === "interface";
}