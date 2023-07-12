// Generate type guards for nested interfaces/types
export function generateInterfaceTypeGuard(typeName: string, definition: any): string {
    let typeGuard = '';

    for (const property in definition.properties) {
        const propertyType = definition.properties[property];
        const isOptional = propertyType.includes('undefined');
        const hasNullishCoalescing = propertyType.includes('??');
        const typeCheck = isOptional ? `${property} !== undefined` : `${property} != null`;

        if (hasNullishCoalescing) {
            typeGuard += `  if (${typeCheck} && ${property} !== null) {\n`;
        } else {
            typeGuard += `  if (${typeCheck}) {\n`;
        }

        typeGuard += `    if (!is${propertyType}(value.${property})) return false;\n`;
        typeGuard += '  }\n';
    }

    return typeGuard;
}