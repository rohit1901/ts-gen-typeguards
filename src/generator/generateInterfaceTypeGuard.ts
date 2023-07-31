// Generate type guards for nested interfaces/types
import {InterfaceDeclaration, isInterfaceDeclaration, isPropertySignature, TypeAliasDeclaration} from "typescript";

export function generateInterfaceTypeGuard(
  definitions: InterfaceDeclaration[],
): string {
  let typeGuard = "";

  for(const definition of definitions) {
  const name = definition.name.escapedText;
  if(!isInterfaceDeclaration(definition)) {
    return ""
  }
  for (const property of definition.members) {
    if (isPropertySignature(property)) {
      typeGuard += `    if (!value.hasOwnProperty('${property.name.getText()}') || !is${property.type.getText()}(value.${property.name.getText()})) {
      return false;
    }\n`;
    }
  }}

  return typeGuard;
}
