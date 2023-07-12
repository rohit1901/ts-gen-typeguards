// Generate type guards for unknown types
export function generateUnknownTypeGuard(typeName: string): string {
    return `function is${typeName}(value: any): value is ${typeName} {\n  return true;\n}\n`;
}