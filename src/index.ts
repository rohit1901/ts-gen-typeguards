import * as fs from 'fs';
import * as ts from 'typescript';
import { deleteFileIfExists, generateTypeGuardsFile } from './utils';

import { generateEnumTypeGuards, generateInterfaceTypeGuard } from './api';
import { generateTypeTypeGuard } from './api/generateTypeTypeGuard';

type ObjectsType = {
  interfaces: ts.InterfaceDeclaration[];
  types: ts.TypeAliasDeclaration[];
  enums: ts.EnumDeclaration[];
};

export function readObjects(path: string): ObjectsType {
  // Read the file
  const fileContent = fs.readFileSync(path, 'utf8');
  // Parse the file
  const parsedFile = ts.createSourceFile(
    path,
    fileContent,
    ts.ScriptTarget.ES2015,
    true,
  );
  // Find all interface declarations
  const interfaces = parsedFile.statements.filter(ts.isInterfaceDeclaration);
  // Find all type alias declarations
  const types = parsedFile.statements.filter(ts.isTypeAliasDeclaration);
  // Find all enum declarations
  const enums = parsedFile.statements.filter(ts.isEnumDeclaration);
  // Return the interfaces, types, and enums
  return { interfaces, types, enums };
}

function loadConfig() {
  const fileContent = fs.readFileSync('./config.json', 'utf8');
  const jsonContent = JSON.parse(fileContent);
  return jsonContent.production.inputFilePath;
}

//Implementation
const { interfaces, types, enums } = readObjects(loadConfig());
deleteFileIfExists('out/typeguards.ts');
generateTypeGuardsFile(
  `${generateInterfaceTypeGuard(interfaces)}\n${generateTypeTypeGuard(
    types,
    enums,
  )}\n${generateEnumTypeGuards(enums)}`,
);
