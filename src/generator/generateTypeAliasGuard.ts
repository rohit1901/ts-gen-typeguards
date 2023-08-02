// Generate type guards for type aliases

import { generateInterfaceTypeGuard } from '../api/generateInterfaceTypeGuard';

export function generateTypeAliasGuard(typeName: string, definition: any) {
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

  return typeGuard.replace(
    `function is${typeName}(value: any): value is`,
    `type is${typeName} =`,
  );*/
}
