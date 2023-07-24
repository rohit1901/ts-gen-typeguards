import * as fs from "fs";

const filePath = 'out/typeguards.ts';
//TODO: add imports, utils in generated file
export function generateTypeGuardsFile(typeGuardsText: string): void {
    try {
        if (fs.existsSync(filePath)) {
            // File exists, updating it by appending text
            appendText(typeGuardsText);
        } else {
            // File doesn't exist, creating it and appending text
            createFile(typeGuardsText);
        }
    } catch (err) {
        console.error('Error while processing the file:', err.message);
    }
}

export function deleteFileIfExists(filePath: string) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Existing file deleted successfully.');
    }
}
function createFile(typeGuardsText: string) {
    const initialContent = '// Generated using ts-gen-typeguards\n';
    try {
        fs.writeFileSync(filePath, `${initialContent} \n ${typeGuardsText}`);
        console.log('File created and initial content added successfully.');
        appendText(typeGuardsText);
    } catch (err) {
        console.error('Error while creating the file:', err.message);
    }
}

function appendText(typeGuardsText: string) {
    try {
        fs.appendFileSync(filePath, typeGuardsText);
        console.log('Text appended to the file successfully.');
    } catch (err) {
        console.error('Error while appending text to the file:', err.message);
    }
}