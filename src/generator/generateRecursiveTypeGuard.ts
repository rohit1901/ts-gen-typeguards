// Generate type guards for recursive types

import {generateInterfaceTypeGuard} from "../api/generateInterfaceTypeGuard";

export function generateRecursiveTypeGuard(
  typeName: string,
  definition: any,
) {
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );*/
}
