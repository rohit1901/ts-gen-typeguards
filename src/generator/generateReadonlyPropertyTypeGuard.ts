// Generate type guards for readonly properties

import { generateInterfaceTypeGuard } from '../api/generateInterfaceTypeGuard';

export function generateReadonlyPropertyTypeGuard(
  typeName: string,
  definition: any,
) {
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );*/
}
