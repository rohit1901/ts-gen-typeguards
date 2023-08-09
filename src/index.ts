import * as fs from 'fs';
import * as ts from 'typescript';
import { deleteFileIfExists, generateTypeGuardsFile } from './utils';

import {generateEnumTypeGuards, generateInterfaceTypeGuard} from './api';
import {generateTypeTypeGuard} from './api/generateTypeTypeGuard';
import {
    createSourceFile,
    EnumDeclaration,
    InterfaceDeclaration, isEnumDeclaration,
    isInterfaceDeclaration,
    isTypeAliasDeclaration, ScriptTarget,
    TypeAliasDeclaration
} from "typescript";

type ObjectsType = {
    interfaces: InterfaceDeclaration[];
    types: TypeAliasDeclaration[];
    enums: EnumDeclaration[];
};

export function readObjects(path: string): ObjectsType {
    // Read the file
    const fileContent = fs.readFileSync(path, 'utf8');
    // Parse the file
    const parsedFile = createSourceFile(
        path,
        fileContent,
        ScriptTarget.ES2015,
        true,
    );
    // Find all interface declarations
    const interfaces = parsedFile.statements.filter(isInterfaceDeclaration);
    // Find all type alias declarations
    const types = parsedFile.statements.filter(isTypeAliasDeclaration);
    // Find all enum declarations
    const enums = parsedFile.statements.filter(isEnumDeclaration);
    // Return the interfaces, types, and enums
    return {interfaces, types, enums};
}

function loadConfig(dev?: boolean) {
    const fileContent = fs.readFileSync('./config.json', 'utf8');
    const jsonContent = JSON.parse(fileContent);
    return dev ? jsonContent.development.inputFilePath : jsonContent.production.inputFilePath;
}
function generateImports(objects: string[]) {
    return `import {${objects.join(',')}} from '../${loadConfig(true)}';`;
}
function getObjectsNames(interfaceObjects: InterfaceDeclaration[], typeObjects: TypeAliasDeclaration[], enumObjects: EnumDeclaration[]) {
    const interfaceNames = interfaceObjects.map((object) => object.name.getText());
    const typeNames = typeObjects.map((object) => object.name.getText());
    const enumNames = enumObjects.map((object) => object.name.getText());
    return [...interfaceNames, ...typeNames, ...enumNames];
}

//Implementation
const { interfaces, types, enums } = readObjects(loadConfig());
deleteFileIfExists('out/typeguards.ts');
generateTypeGuardsFile(
    `${generateImports(getObjectsNames(interfaces, types, enums))}\n${generateInterfaceTypeGuard(interfaces)}\n${generateTypeTypeGuard(
        types,
        enums,
    )}\n${generateEnumTypeGuards(enums)}`,
);
