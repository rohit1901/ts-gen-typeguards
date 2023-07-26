/**
 * Check if value is "interface"
 * @param value
 */
export function isInterfaceString(value: any): value is "interface" {
  return typeof value === "string" && value === "interface";
}
