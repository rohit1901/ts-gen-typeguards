// Generate type guards for type assertions
import { generateInterfaceTypeGuard } from "./generateInterfaceTypeGuard";

export function generateTypeAssertionGuard(
  typeName: string,
  definition: any,
): string {
  const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );
}
