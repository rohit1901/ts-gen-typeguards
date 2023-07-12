// Generate type guards for literal types
interface LiteralTypeDefinition {
    kind: 'literal';
    properties: (string | number | boolean)[];
}
export function generateLiteralTypeGuard(typeName: string, definition: LiteralTypeDefinition): string {
    const literalValues = definition.properties.map(value => JSON.stringify(value)).join(' | ');
    const typeGuard = `type ${typeName} = ${literalValues};\n\n` +
        `function is${typeName}(value: any): value is ${typeName} {\n` +
        `  return [${literalValues}].includes(value);\n` +
        `}\n`;
    return typeGuard
}
