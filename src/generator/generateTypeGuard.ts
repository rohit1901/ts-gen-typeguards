// Generate a type guard for a given interface or type
import { generateInterfaceTypeGuard } from "./generateInterfaceTypeGuard";
import { generateEnumTypeGuard } from "./generateEnumTypeGuard";
import { isObject } from "@utils";

export function generateTypeGuard(typeName: string, definition: any): string {
  let typeGuard = `function is${typeName}(value: any): value is ${typeName} {\n`;

  if (isObject(definition)) {
    if (definition.kind === "interface" || definition.kind === "type") {
      typeGuard += generateInterfaceTypeGuard(typeName, definition);
    } else if (definition.kind === "enum") {
      typeGuard += generateEnumTypeGuard(typeName, definition);
    }
  }

  typeGuard += "}\n";

  return typeGuard;
}
