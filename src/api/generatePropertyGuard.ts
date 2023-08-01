import {isPropertySignature, TypeElement} from "typescript";
import {generateKeywordGuard} from "../api";
import {generateTypeReferenceGuard} from "../api";
import {generateIntersectionTypeGuard, generateUnionTypeGuard} from "../api";

export function generatePropertyGuard(property: TypeElement, interfaceName: string) {
    const typeGuard: string[] = [];
    if (!isPropertySignature(property)) return typeGuard;
    const propertyName = property.name.getText() ?? undefined;
    if (propertyName) {
        typeGuard.push(`value.hasOwnProperty('${propertyName}')`);
    }
    typeGuard.push(...generateKeywordGuard(property.type, propertyName));
    typeGuard.push(...generateTypeReferenceGuard(property.type, propertyName));
    typeGuard.push(...generateIntersectionTypeGuard(property.type, propertyName));
    typeGuard.push(...generateUnionTypeGuard(property.type, propertyName));
    return typeGuard;
}