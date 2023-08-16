import {NodeArray, TypeParameter, TypeParameterDeclaration} from "typescript";
import {isTypeParameter} from "../utils";

export function generateTypeParameterTypeGuard(typeParameter: TypeParameterDeclaration) {
    return `function is${typeParameter.name.getText()}(value: any): value is ${typeParameter.name.getText()} {
    return typeof value === 'object';}`;
}
export function generateTypeParametersTypeGuard(typeParameters: NodeArray<TypeParameterDeclaration>) {
    const typeGuardStrings: string[] = [];
    if(typeParameters && typeParameters.length > 0) {
        for(const typeParameter of typeParameters) {
            typeGuardStrings.push(generateTypeParameterTypeGuard(typeParameter));
        }
    }
    return typeGuardStrings.join('\n');
}