// Generate type guards for type assertions

import { generateInterfaceTypeGuard } from "../api/generateInterfaceTypeGuard";

export function generateTypeAssertionGuard(typeName: string, definition: any) {
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );*/
}
