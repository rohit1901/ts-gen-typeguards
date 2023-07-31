// Generate type guards for indexed access types
import { generateInterfaceTypeGuard } from "./generateInterfaceTypeGuard";

export function generateIndexedAccessTypeGuard(
  typeName: string,
  definition: any,
) {
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );*/
}
