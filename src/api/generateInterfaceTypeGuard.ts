import { InterfaceDeclaration } from 'typescript';

import { generateSingleInterfaceTypeGuard } from '../api';

/**
 * Wrapper function for generating type guards for all interfaces
 * @param definitions - Array of interface definitions
 */
export function generateInterfaceTypeGuard(
  definitions: InterfaceDeclaration[],
): string {
  const typeGuardStrings: string[] = [];
  for (const definition of definitions) {
    typeGuardStrings.push(
      generateSingleInterfaceTypeGuard(definition, definitions),
    );
  }
  return typeGuardStrings.join('\n');
}
