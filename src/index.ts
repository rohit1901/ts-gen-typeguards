const fs = require('fs');
const path = require('path');
export function generateTypeGuardsFromFile(filePath: string): void {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const typeRegex = /(?:interface|type)\s+(\w+)/g;

    let match;
    while ((match = typeRegex.exec(fileContent)) !== null) {
        const typeName = match[1];
        const typeValue = getTypeValueFromName(typeName);
        const typeGuardCode = generateTypeGuardCode(typeName, typeValue);

        // Write type guard code to a file or perform other actions
        console.log(typeGuardCode);
    }
}

function extractNestedInterfaces(typeValue: any): { typeName: string; typeValue: any }[] {
    const nestedInterfaces: { typeName: string; typeValue: any }[] = [];

    // Recursive function to extract nested interfaces/types
    function extractNested(type: any, parentName?: string): void {
        if (typeof type === 'object' && type !== null) {
            if (Array.isArray(type)) {
                for (const item of type) {
                    extractNested(item, parentName);
                }
            } else {
                for (const key of Object.keys(type)) {
                    const nestedName = parentName ? `${parentName}.${key}` : key;
                    const nestedValue = type[key];
                    if (typeof nestedValue === 'object' && nestedValue !== null) {
                        if (nestedValue.hasOwnProperty('type')) {
                            // Extract nested interfaces/types with 'type' property
                            nestedInterfaces.push({ typeName: nestedName, typeValue: nestedValue });
                        } else {
                            // Recursively extract further nested interfaces/types
                            extractNested(nestedValue, nestedName);
                        }
                    }
                }
            }
        }
    }

    // Start extracting nested interfaces/types
    extractNested(typeValue);

    return nestedInterfaces;
}

function generateUnionTypeGuards(typeName: string, unionTypeMatches: RegExpMatchArray): string {
    let typeGuardCode = '';
    for (const match of unionTypeMatches) {
        const typeName1 = match[1];
        const typeName2 = match[2];
        const typeGuardCode1 = generateTypeGuardCode(typeName1, getTypeValueFromName(typeName1));
        const typeGuardCode2 = generateTypeGuardCode(typeName2, getTypeValueFromName(typeName2));

        // Generate type guard code for each type in the union
        typeGuardCode += `if (${typeName}.type === '${typeName1}') {\n${typeGuardCode1}\n} else if (${typeName}.type === '${typeName2}') {\n${typeGuardCode2}\n}\n`;
    }
    return typeGuardCode;
}

function generateIntersectionTypeGuards(typeName: string, intersectionTypeMatches: RegExpMatchArray): string {
    let typeGuardCode = '';
    for (const match of intersectionTypeMatches) {
        const typeName1 = match[1];
        const typeName2 = match[2];
        const typeGuardCode1 = generateTypeGuardCode(typeName1, getTypeValueFromName(typeName1));
        const typeGuardCode2 = generateTypeGuardCode(typeName2, getTypeValueFromName(typeName2));

        // Generate type guard code for the intersection
        typeGuardCode += `if (${typeName} instanceof ${typeName1}) {\n${typeGuardCode1}\n}\n`;
        typeGuardCode += `if (${typeName} instanceof ${typeName2}) {\n${typeGuardCode2}\n}\n`;
    }
    return typeGuardCode;
}

// Example implementation for getTypeValueFromName
function getTypeValueFromName(typeName: string): any {
    // Depending on your project structure and requirements,
    // you can implement various strategies to retrieve the type value
    // For example, you could maintain a mapping of type names to their values
    // in a separate file or data structure and fetch the value based on the typeName.
    // You could also use a TypeScript compiler API to extract type information from files.

    // Here's a simple example using a type value mapping:
    const typeValueMap: Record<string, any> = {
        // Map type names to their corresponding values
        MyInterface: { /* Interface value here */ },
        MyType: { /* Type value here */ },
        // ...
    };

    // Return the type value corresponding to the typeName
    return typeValueMap[typeName];
}

// Example implementation for generateTypeGuardCode
function generateTypeGuardCode(typeName: string, typeValue: any): string {
    let typeGuardCode = '';

    // Handle different cases based on the type value and project requirements
    if (Array.isArray(typeValue)) {
        // Handle array type
        typeGuardCode += `if (!Array.isArray(${typeName})) {\n  throw new Error('${typeName} is not an array');\n}\n`;
    } else if (typeof typeValue === 'object' && typeValue !== null) {
        // Handle object type
        typeGuardCode += `if (typeof ${typeName} !== 'object' || ${typeName} === null) {\n  throw new Error('${typeName} is not an object');\n}\n`;

        // Iterate over properties and generate guards for each
        for (const prop in typeValue) {
            if (typeValue.hasOwnProperty(prop)) {
                const propType = typeValue[prop];
                const guardedProp = `${typeName}.${prop}`;
                typeGuardCode += generateTypeGuardCode(guardedProp, propType);
            }
        }
    } else if (typeof typeValue === 'string' || typeof typeValue === 'number') {
        // Handle literal type
        typeGuardCode += `if (${typeName} !== ${typeValue}) {\n  throw new Error('${typeName} does not match the expected value');\n}\n`;
    } else {
        // Handle other types
        typeGuardCode += `// Custom type guard for ${typeName}\n`;
    }

    return typeGuardCode;
}
