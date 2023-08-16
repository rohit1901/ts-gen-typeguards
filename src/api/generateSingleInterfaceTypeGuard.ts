import { InterfaceDeclaration, isInterfaceDeclaration } from 'typescript';
import {
  generatePropertyGuard,
  generateTypeParametersTypeGuard,
  generateTypeParameterTypeGuard,
  handleHeritageClauses
} from '../api';
import { getEscapedCapitalizedStringLiteral } from '../utils';

/**
 * Generates a type guard for a single interface definition.
 * @param definition
 * @param definitions
 */
export function generateSingleInterfaceTypeGuard(
  definition: InterfaceDeclaration,
  definitions: InterfaceDeclaration[],
): string {
  const typeGuardStrings: string[] = [];
  const interfaceName: string = definition.name.escapedText.toString();
  //NOTE: Return empty string if the definition is not an interface
  if (!isInterfaceDeclaration(definition)) {
    return '';
  }
  const updatedDefinition = handleHeritageClauses(definition, definitions);
  typeGuardStrings.push(`export function is${getEscapedCapitalizedStringLiteral(
    interfaceName,
  )}(value: any): value is ${interfaceName} { ${generateTypeParametersTypeGuard(updatedDefinition.typeParameters)} return(typeof value === "object" &&
    value !== null`);
  for (const property of updatedDefinition.members) {
    typeGuardStrings.push(...generatePropertyGuard(property));
  }
  return typeGuardStrings.join('&&') + `)}`;
}
