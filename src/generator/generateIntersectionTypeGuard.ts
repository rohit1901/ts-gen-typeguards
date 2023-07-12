// Generate type guards for intersection types
export function generateIntersectionTypeGuard(typeName: string, definition: any): string {
    const typeGuards = definition.types.map((type: any) => `is${type}(value)`).join(' && ');

    return `  return ${typeGuards};\n`;
}