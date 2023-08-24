// Generate type guards for conditional types
import { TypeNode } from 'typescript';

export function generateConditionalTypeGuard(
  definition: TypeNode,
  parentTypeName?: string,
) {
  //TODO: Implement this function
  /*const typeGuard = generateInterfaceTypeGuard(typeName, definition);

    return typeGuard.replace(
      `function is${typeName}(value: any): value is`,
      `type is${typeName} =`,
    );*/
}
