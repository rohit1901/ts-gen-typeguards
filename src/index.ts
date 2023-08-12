import {
    createPath,
    defaultInputDir, defaultOutputDir,
    defaultOutputTypesFileName,
    defaultTypeGuardsFileName,
    deleteFileIfExists,
    extensionTS,
    generateTypeGuardsFile,
    readFilesWithExtension
} from './utils';

import {generateEnumTypeGuards, generateInterfaceTypeGuard, generateTypeTypeGuard,} from './api';
import {
    createSourceFile,
    EnumDeclaration,
    InterfaceDeclaration,
    isEnumDeclaration,
    isInterfaceDeclaration,
    isTypeAliasDeclaration,
    ScriptTarget,
    TypeAliasDeclaration,
} from 'typescript';

type ObjectsType = {
    interfaces: InterfaceDeclaration[];
    types: TypeAliasDeclaration[];
    enums: EnumDeclaration[];
};

/**
 *
 * @param path
 * @param content
 */
function readObjects(path: string, content?: string): ObjectsType {
    try {
        const sourceText =
            path === '' ? content : readFilesWithExtension(path).join('');
        // Parse the file
        const parsedFile = createSourceFile(
            path,
            sourceText,
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
    } catch (err) {
        console.error('ERROR: Error while reading the file:', path, err.message);
    }
}

function generateImports(objects: string[], path?: string) {
    return `import {${objects.join(',')}} from '../${path}${defaultOutputTypesFileName}'`;
}

function getObjectsNames(
    interfaceObjects: InterfaceDeclaration[],
    typeObjects: TypeAliasDeclaration[],
    enumObjects: EnumDeclaration[],
) {
    const interfaceNames = interfaceObjects.map(object => object.name.getText());
    const typeNames = typeObjects.map(object => object.name.getText());
    const enumNames = enumObjects.map(object => object.name.getText());
    return [...interfaceNames, ...typeNames, ...enumNames];
}

/**
 * Generates type guards for the given input file path and writes them to the output file path (defaults to ./out/typeGuards.ts)
 * @param inputString - Optional input string to generate type guards from. If this is provided, the inputFilePath is ignored
 * @param inputFilePath - Optional input file path to generate type guards from (defaults to the 'input/' directory)
 * @param outputFilePath - Optional output file path to write the generated type guards to (defaults to ./out/typeGuards.ts)
 */
export function tsGenTypeguards(
    inputString?: string,
    inputFilePath: string = defaultInputDir,
    outputFilePath: string = defaultOutputDir,
) {
    const interfaces: InterfaceDeclaration[] = [];
    const types: TypeAliasDeclaration[] = [];
    const enums: EnumDeclaration[] = [];
    createPath(`./${outputFilePath ?? defaultOutputDir}`);
    createPath(`./${inputFilePath ?? defaultInputDir}`);
    deleteFileIfExists(inputFilePath + `${defaultOutputTypesFileName}.${extensionTS}`);
    if (inputString) {
        const res = readObjects('', inputString);
        interfaces.push(...res.interfaces);
        types.push(...res.types);
        enums.push(...res.enums);
    } else {
        const res = readObjects(inputFilePath);
        interfaces.push(...res.interfaces);
        types.push(...res.types);
        enums.push(...res.enums);
    }
    deleteFileIfExists(
        outputFilePath + `${defaultTypeGuardsFileName}.${extensionTS}`
    );
    generateTypeGuardsFile(
        `${generateImports(
            getObjectsNames(interfaces, types, enums),
            inputFilePath,
        )}\n${generateInterfaceTypeGuard(interfaces)}\n${generateTypeTypeGuard(
            types,
            enums,
        )}\n${generateEnumTypeGuards(enums)}`,
        undefined,
        inputFilePath,
        outputFilePath,
    );
}

// Usage Examples
// 1. using default values --> tsGenTypeguards();
// 2. using custom values --> tsGenTypeguards(undefined, 'inputNew', 'outputNew');
// 3. using custom input and default output values --> tsGenTypeguards(undefined, 'inputNew');
// 4. using default input and custom output values tsGenTypeguards(undefined, undefined, 'outputNew');
