import { InterfaceDeclaration, isInterfaceDeclaration } from 'typescript';
import {
  buildGenericFunctionSignature,
  generatePropertyGuard,
  handleHeritageClauses,
} from '../api';
import {
  getEscapedCapitalizedStringLiteral,
  getTypeNameFromTypeParameter,
} from '../utils';

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
  //NOTE: Return empty string if the definition is not an interface
  if (!isInterfaceDeclaration(definition)) {
    return '';
  }
  const updatedDefinition = handleHeritageClauses(definition, definitions);
  const typeParameterName = getTypeNameFromTypeParameter(definition);
  typeGuardStrings.push(buildInterfaceGuardSignature(definition));
  for (const property of updatedDefinition.members) {
    typeGuardStrings.push(
      ...generatePropertyGuard(property, undefined, typeParameterName),
    );
  }
  return typeGuardStrings.join('&&') + `)}`;
}

/**
 * Build the type guard signature for an interface. This includes the type guard function name and the type guard parameter.
 * @example
 * export function isInterfaceName(value: any): value is InterfaceName {return(typeof value === "object" && value !== null
 * @param definition - The interface definition to process.
 */
function buildInterfaceGuardSignature(
  definition: InterfaceDeclaration,
): string {
  const isGeneric =
    definition.typeParameters && definition.typeParameters.length > 0;
  const interfaceName: string = definition.name.escapedText.toString();
  if (isGeneric)
    return buildGenericFunctionSignature(
      interfaceName,
      definition.typeParameters,
    );
  return `export function is${getEscapedCapitalizedStringLiteral(
    interfaceName,
  )}(value: any): value is ${interfaceName} {return(typeof value === "object" &&
    value !== null`;
}
