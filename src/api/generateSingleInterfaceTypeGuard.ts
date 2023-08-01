import {InterfaceDeclaration, isInterfaceDeclaration} from "typescript";
import {generatePropertyGuard, handleHeritageClauses} from "../api";
import {getEscapedCapitalizedStringLiteral} from "../utils";

export function generateSingleInterfaceTypeGuard(definition: InterfaceDeclaration, definitions: InterfaceDeclaration[]): string {
    const typeGuardStrings: string[] = [];
    const interfaceName: string = definition.name.escapedText.toString();
    //NOTE: Return empty string if the definition is not an interface
    if (!isInterfaceDeclaration(definition)) {
        return ""
    }
    const updatedDefinition = handleHeritageClauses(definition, definitions);
    typeGuardStrings.push(`export function is${getEscapedCapitalizedStringLiteral(interfaceName)}(value: any): value is ${interfaceName} {return(typeof value === "object" &&
    value !== null`);
    for (const property of updatedDefinition.members) {
        typeGuardStrings.push(...generatePropertyGuard(property, interfaceName));
    }
    return typeGuardStrings.join("&&") + `)}`;
}