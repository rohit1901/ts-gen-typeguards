import { InterfaceDeclaration } from 'typescript';
import { generateSingleInterfaceTypeGuard } from '../api';

export function generateInterfaceTypeGuard(
  definitions: InterfaceDeclaration[],
): string {
  const typeGuardStrings: string[] = [];
  for (let definition of definitions) {
    typeGuardStrings.push(
      generateSingleInterfaceTypeGuard(definition, definitions),
    );
  }
  return typeGuardStrings.join('\n');
}
