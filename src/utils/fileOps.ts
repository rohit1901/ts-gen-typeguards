import * as fs from "fs";
import *  as prettier from 'prettier';

const filePath = 'out/typeguards.ts';


function prettify(input: string): Promise<string> {
    return prettier.format(input, {
        singleQuote: true,
        trailingComma: 'es5',
        tabWidth: 2,
        parser: 'typescript',
    });
}
/**
 * Generates a file with the given text
 * @param typeGuardsText
 */
export function generateTypeGuardsFile(typeGuardsText: string): void {
    prettify(typeGuardsText).then((formattedText) => {
        try {
            if (fs.existsSync(filePath)) {
                // File exists, updating it by appending text
                appendText(formattedText);
            } else {
                // File doesn't exist, creating it and appending text
                createFile(formattedText);
            }
        } catch (err) {
            console.error('Error while processing the file:', err.message);
        }
    }).catch((err) => {
        console.error('Error while formatting the file:', err.message);
    });

}

/**
 * Deletes the file if it exists
 * @param filePath
 */
export function deleteFileIfExists(filePath: string) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('Existing file deleted successfully.');
    }
}

/**
 * Creates a file with the given text
 * @param typeGuardsText
 */
function createFile(typeGuardsText: string) {
    const initialContent = '// Generated using ts-gen-typeguards\n';
    try {
        fs.writeFileSync(filePath, `${initialContent}`);
        console.log('File created and initial content added successfully.');
        appendText(typeGuardsText);
    } catch (err) {
        console.error('Error while creating the file:', err.message);
    }
}

/**
 * Appends the given text to the file
 * @param typeGuardsText
 */
function appendText(typeGuardsText: string) {
    try {
        fs.appendFileSync(filePath, typeGuardsText);
        console.log('Text appended to the file successfully.');
    } catch (err) {
        console.error('Error while appending text to the file:', err.message);
    }
}