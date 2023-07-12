// Generate type guards for union types
export function generateUnionTypeGuard(typeName: string, definition: any): string {
    const typeGuards = definition.types.map((type: any) => `is${type}(value)`).join(' || ');

    return `  return ${typeGuards};\n`;
}