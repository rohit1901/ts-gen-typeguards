// Generate type guards for conditional types
import { generateInterfaceTypeGuard } from "./generateInterfaceTypeGuard";

export function generateConditionalTypeGuard(
  typeName: string,
  definition: any,
) {
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );*/
}
