// Generate type guards for nested interfaces/types
import {
    factory,
    InterfaceDeclaration,
    isInterfaceDeclaration, isIntersectionTypeNode, isLiteralTypeNode,
    isPropertySignature,
    isTypeReferenceNode, isUnionTypeNode,
    SyntaxKind,
    TypeElement, TypeNode
} from "typescript";
import {getEscapedCapitalizedStringLiteral, getLiteralType, isKeyword, isLiteralType, syntaxKindToType} from "../utils";
function generateSingleInterfaceTypeGuard(definition: InterfaceDeclaration, definitions: InterfaceDeclaration[]): string {
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
export function generateInterfaceTypeGuard(
    definitions: InterfaceDeclaration[],
): string {
    const typeGuardStrings: string[] = [];
    for (let definition of definitions) {
        typeGuardStrings.push(generateSingleInterfaceTypeGuard(definition, definitions));
    }
    return typeGuardStrings.join("\n");
}

function generatePropertyGuard(property: TypeElement, interfaceName: string) {
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

function generateKeywordGuard(type: TypeNode, propertyName: string) {
    const typeGuard: string[] = [];
    if (!isKeyword(type.kind)) return typeGuard;
    if(isLiteralTypeNode(type)) {
        typeGuard.push(`typeof value.${propertyName} === '${getLiteralType(type.literal.kind)}'`);
        return typeGuard;
    }
    typeGuard.push(`typeof value.${propertyName} === '${syntaxKindToType(type.kind)}'`);
    return typeGuard;
}
function generateTypeReferenceGuard(type: TypeNode, propertyName: string) {
    const typeGuard: string[] = [];
    if (!isTypeReferenceNode(type)) return typeGuard;
    typeGuard.push(`is${getEscapedCapitalizedStringLiteral(type.typeName.getText())}(value.${propertyName})`);
    return typeGuard;
}
function generateIntersectionTypeGuard(type: TypeNode, propertyName: string) {
    const typeGuard: string[] = [];
    if (!isIntersectionTypeNode(type)) return typeGuard;
    if(!type.types) return typeGuard;
    for(const member of type.types){
        typeGuard.push(...generateKeywordGuard(member, propertyName));
        typeGuard.push(...generateTypeReferenceGuard(member, propertyName));
    }
    return typeGuard;
}
function generateUnionTypeGuard(type: TypeNode, propertyName: string) {
    const typeGuard: string[] = [];
    if (!isUnionTypeNode(type)) return typeGuard;
    if(!type.types) return typeGuard;
    for(const member of type.types){
        typeGuard.push(...generateKeywordGuard(member, propertyName));
        typeGuard.push(...generateTypeReferenceGuard(member, propertyName));
    }
    return [`(${typeGuard.join('||')})`];
}
function handleHeritageClauses(definition: InterfaceDeclaration, definitions: InterfaceDeclaration[]): InterfaceDeclaration {
    if (!definition.heritageClauses) return definition;
    // Iterate through each heritage clause
    for (const clause of definition.heritageClauses) {
        // Check if the clause is an 'extends' clause
        if (clause.token === SyntaxKind.ExtendsKeyword) {
            // Iterate through each type reference in the heritage clause
            for (const typeRef of clause.types) {
                // Find the interface definition in the 'definitions' array with the same name as the type reference
                const interfaceDef = definitions.find(def => def.name.text === typeRef.expression.getText());
                if (interfaceDef) {
                    // Call the function recursively to handle the newly found interface and update its properties
                    const updatedInterface = handleHeritageClauses(interfaceDef, definitions);

                    // Merge the properties of the updatedInterface into the current definition
                    definition = factory.updateInterfaceDeclaration(
                        definition,
                        definition.modifiers,
                        definition.name,
                        definition.typeParameters,
                        definition.heritageClauses.concat(updatedInterface.heritageClauses),
                        definition.members.concat(updatedInterface.members)
                    );
                }
            }
        }
    }
    return definition;
}

