// Generate type guards for any types
export function generateAnyTypeGuard(typeName: string): string {
  return `function is${typeName}(value: any): value is ${typeName} {\n  return true;\n}\n`;
}
