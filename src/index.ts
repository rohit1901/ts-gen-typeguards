import * as fs from "fs";
import * as ts from "typescript";
import {
    EnumDeclaration,
    EnumMember,
    InterfaceDeclaration,
    isEnumMember,
    isPropertySignature, isTypeLiteralNode,
    LiteralType,
    NodeArray,
    TypeAliasDeclaration,
    TypeElement,
    TypeNode
} from "typescript";
import {
    capitalize,
    deleteFileIfExists,
    generateTypeGuardsFile,
    getEscapedCapitalizedStringLiteral,
    getEscapedStringLiteral,
    getMembersFromTypeAlias
} from "./utils";
import {generateOptionalPropertyTypeGuard, generateTypeGuards} from "./generator";

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
 * Generates the type guard header for the type guard function
 * @param typeName
 */
function generateTypeGuardHeader(typeName: string): string {
    return [
        `export function is${typeName}(value: any): value is ${typeName} {`,
        `    if (typeof value !== 'object' || value === null) {`,
        `        return false;`,
        `    }\n`
    ].join('\n');
}

/**
 * Create a type guard for a property signature
 * @param propertyName
 * @param propertyType
 */
function createPropertyTypeGuard(propertyName: string, propertyType: TypeNode): string {
    const typeGuardName = `is${getEscapedCapitalizedStringLiteral(propertyType._typeNodeBrand ?? propertyType.getText())}`;
    return `    if (!value.hasOwnProperty('${getEscapedStringLiteral(propertyName)}') || !${typeGuardName}(value.${getEscapedStringLiteral(propertyName)})) {`;
}

/**
 * Create a type guard for an enum member
 * @param propertyName
 */
function createEnumTypeGuard(propertyName: string): string {
    return `    if (!value.hasOwnProperty('${getEscapedStringLiteral(propertyName)}') || !value === "${propertyName}") {`;
}

/**
 * Generates the type guards for the interfaces, types, and enums
 * @param typeName
 * @param properties
 */
const buildTypeGuards = (typeName: string, properties: NodeArray<TypeElement> | TypeElement[] | NodeArray<EnumMember> | LiteralType[]) => {
    const typeGuardFunctions: string[] = [];
    typeGuardFunctions.push(generateTypeGuardHeader(typeName));

    properties.forEach((property) => {
        const propertyName = property.name.escapedText;
        if (isPropertySignature(property) && property.type) {
            typeGuardFunctions.push(createPropertyTypeGuard(propertyName, property.type));
        } else if (isEnumMember(property)) {
            typeGuardFunctions.push(createEnumTypeGuard(propertyName));
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
function generateTypeGuards2(interfaceNode: InterfaceDeclaration): string {
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

//Implementation
const {interfaces, types, enums} = readObjects('./data.ts');
deleteFileIfExists('out/typeguards.ts');
/*interfaces.forEach((interfaceNode) => {
    const typeGuardCode = generateTypeGuards(interfaceNode);
    generateTypeGuardsFile(typeGuardCode)
});*/
generateTypeGuardsFile(generateTypeGuards(types));
/*types.forEach((alias) => {
    /!*if(isTypeLiteralNode(alias.type)) {
        const typeGuardCode = alias.type.members.map(m => {
            if (isPropertySignature(m)) return generateOptionalPropertyTypeGuard(m);
            return m;
        });
        console.log(typeGuardCode);
    }*!/
    const typeGuardCode = generateTypeTypeGuards(alias, types);
    generateTypeGuardsFile(typeGuardCode)
});*/
enums.forEach((enumNode) => {
    const typeGuardCode = generateEnumTypeGuard(enumNode);
    generateTypeGuardsFile(typeGuardCode)
});


