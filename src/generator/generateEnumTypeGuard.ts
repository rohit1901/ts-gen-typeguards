// Generate type guards for enums
export function generateEnumTypeGuard(
  typeName: string,
  definition: any,
): string {
  const enumValues = definition.values
    .map((value: any) => `'${value}'`)
    .join(' | ');

  return `  return ${enumValues}.includes(value);\n`;
}
