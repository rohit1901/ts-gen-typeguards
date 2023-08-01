// Generate type guards for inherited types

import { generateInterfaceTypeGuard } from "../api/generateInterfaceTypeGuard";

export function generateInheritedTypeGuard(typeName: string, definition: any) {
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );*/
}
