// Generate type guards for function signatures
export function generateFunctionSignatureGuard(
    typeName: string,
    definition: any,
): string {
    let typeGuard = '';

    if (definition.parameters) {
        for (const parameter of definition.parameters) {
            typeGuard += `  if (!is${parameter.type}(value.${parameter.name})) return false;\n`;
        }
    }

    if (definition.returnType) {
        typeGuard += `  return is${definition.returnType}(value());\n`;
    } else {
        typeGuard += '  return true;\n';
    }

    return typeGuard;
}
