import * as fs from "fs";
import * as ts from "typescript";
import {
    EnumDeclaration,
    EnumMember,
    InterfaceDeclaration,
    isEnumMember,
    isPropertySignature,
    NodeArray,
    TypeAliasDeclaration,
    TypeElement
} from "typescript";
import {capitalize, getMembersFromTypeAlias} from "./utils";

type ObjectsType = {
    interfaces: ts.InterfaceDeclaration[];
    types: ts.TypeAliasDeclaration[];
    enums: ts.EnumDeclaration[];
}
export function readObjects(path: string): ObjectsType {
    // Read the file
    const fileContent = fs.readFileSync(path, 'utf8');
    // Parse the file
    const parsedFile = ts.createSourceFile(path, fileContent, ts.ScriptTarget.ES2015, true);
    // Find all interface declarations
    const interfaces = parsedFile.statements.filter(ts.isInterfaceDeclaration);
    // Find all type alias declarations
    const types = parsedFile.statements.filter(ts.isTypeAliasDeclaration);
    // Find all enum declarations
    const enums = parsedFile.statements.filter(ts.isEnumDeclaration);
    // Return the interfaces, types, and enums
    return {interfaces, types, enums};
}

/**
 * Generates the type guards for the interfaces, types, and enums
 * @param typeName
 * @param properties
 */
const buildTypeGuards = (typeName: string, properties: NodeArray<TypeElement> | TypeElement[] | NodeArray<EnumMember>) => {
    const typeGuardFunctions: string[] = [];
    typeGuardFunctions.push(`export function is${typeName}(value: any): value is ${typeName} {`);
    typeGuardFunctions.push(`    if (typeof value !== 'object' || value === null) {`);
    typeGuardFunctions.push(`        return false;`);
    typeGuardFunctions.push(`    }\n`);

    properties.forEach((property) => {
        const propertyName = property.name.getText();
        let propertyType = '';
        if (isPropertySignature(property) && property.type) {
            propertyType = property.type.getText();
            const typeGuardName = `is${capitalize(propertyType)}`;
            typeGuardFunctions.push(`    if (!value.hasOwnProperty('${propertyName}') || !${typeGuardName}(value.${propertyName})) {`);
        }
        if (isEnumMember(property)) {
            typeGuardFunctions.push(`    if (!value.hasOwnProperty('${propertyName}') || !value === "${propertyName}") {`);
        }

        typeGuardFunctions.push(`        return false;`);
        typeGuardFunctions.push(`    }`);
    });

    typeGuardFunctions.push(`\n    return true;`);
    typeGuardFunctions.push(`}\n`);

    return typeGuardFunctions.join('\n');
}

/**
 * Generates the type guards for the interfaces
 * @param interfaceNode
 */
function generateTypeGuards(interfaceNode: InterfaceDeclaration): string {
    const properties = interfaceNode.members;
    const interfaceName = capitalize(interfaceNode.name.text);
    return buildTypeGuards(interfaceName, properties);
}

/**
 * Generates the type guards for the types
 * @param typeNode
 * @param types
 */
function generateTypeTypeGuards(typeNode: TypeAliasDeclaration, types: TypeAliasDeclaration[]): string {
    const properties = getMembersFromTypeAlias(typeNode, types);
    const typeName = capitalize(typeNode.name.text);
    return buildTypeGuards(typeName, properties);
}

/**
 * Generates the type guards for the enums
 * @param typeNode
 */
function generateEnumTypeGuard(typeNode: EnumDeclaration): string {
    const enumName = typeNode.name.text;
    const enumProperties = typeNode.members
    return buildTypeGuards(enumName, enumProperties);
}

const {interfaces, types, enums} = readObjects('./data.ts');
interfaces.forEach((interfaceNode) => {
    const typeGuardCode = generateTypeGuards(interfaceNode);
    console.log(typeGuardCode)
});
types.forEach((alias) => {
    const node = getMembersFromTypeAlias(alias, types);
    if(node) {
        const typeGuardCode = generateTypeTypeGuards({type: {members: node, ...alias.type}, ...alias}, types);
        console.log(typeGuardCode)
    }
});
enums.forEach((enumNode) => {
    const typeGuardCode = generateEnumTypeGuard(enumNode);
    console.log(typeGuardCode)
});


