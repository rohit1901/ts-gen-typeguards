import * as fs from 'fs';
import * as prettier from 'prettier';
import * as path from 'path';
import {Options} from "prettier";

export const extensionTS = 'ts';
export const extensionDTS = `d.${extensionTS}`;
export const defaultInputDir = 'input';
export const defaultOutputTypesFileName = '/combinedTypeGuards';
export const defaultOutputTypesFilePath = `${defaultInputDir}${defaultOutputTypesFileName}.${extensionTS}`;
export const defaultOutputDir = 'out';
export const defaultTypeGuardsFileName = '/typeGuards';
export const defaultOutputTypeGuardsFilePath = `${defaultOutputDir}${defaultTypeGuardsFileName}.${extensionTS}`;
const prettierRC: Options = {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
};
/**
 * Generates a file with the given text
 * @param typeGuardsText
 * @param isCombinedInput
 * @param inputDir
 * @param outputDir
 */
export function generateTypeGuardsFile(
  typeGuardsText: string,
  isCombinedInput?: boolean,
  inputDir?: string,
  outputDir?: string,
): void {
  const inputPath =
    inputDir + `${defaultOutputTypesFileName}.${extensionTS}` ?? defaultOutputTypesFilePath;
  const outputPath = outputDir ? outputDir + `${defaultTypeGuardsFileName}.${extensionTS}` : defaultOutputTypeGuardsFilePath;
  const path = isCombinedInput ? inputPath : outputPath
  prettify(typeGuardsText)
    .then(formattedText => {
      try {
        if (fs.existsSync(path)) {
          // File exists, updating it by appending text
          appendText(formattedText, inputPath, outputPath, isCombinedInput);
        } else {
          // File doesn't exist, creating it and appending text
          createFile(formattedText, inputPath, outputPath, isCombinedInput);
        }
      } catch (err) {
        console.error(`ERROR: Error while processing the ${path}:`, err.message);
      }
    })
    .catch(err => {
      console.error(`ERROR: Error while formatting the ${path}:`, err.message);
    });
}

/**
 * Deletes the file if it exists
 * @param filePath
 */
export function deleteFileIfExists(filePath: string) {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.info(`INFO: ${filePath} file deleted successfully.`);
    }
  } catch (err) {
    console.error('ERROR: Error deleting file', filePath, err.message)
  }
}

/**
 * Function to recursively read files with a specific extension from a directory and return their content as a string
 * @param dir - Optional directory to read files from (defaults to ./out)
 * @param extension - Optional extension to filter files by (defaults to .ts)
 */
export function readFilesWithExtension(
  dir: string = `./${defaultInputDir}`,
  extension: string = extensionTS,
) {
  try {
    if (extension !== extensionTS) {
      throw new Error(`ERROR: ${extension} not supported.  Only '.ts' files are supported`);
    }
    const files = fs.readdirSync(dir);
    const filteredFiles = files.filter(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      return stats.isFile() && path.extname(file) === `.${extension}`;
    });

    const results = [];
    for (const file of filteredFiles) {
      const filePath = './' + path.join(dir, file);
      if (
        !filePath.includes(`.${extensionDTS}`) &&
        !filePath.includes(`${defaultOutputTypesFileName}.${extensionTS}`)
      ) {
        console.info(`INFO: Reading file: ${filePath}`);
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          results.push(content);
        } catch (readError) {
          console.error(`ERROR: Error reading file: ${filePath}`);
          console.error(readError.message);
        }
      }
    }
    createFile(
      results.join(''),
      dir + `${defaultOutputTypesFileName}.${extensionTS}`,
      undefined,
      true,
    );
    return results;
  } catch (dirReadError) {
    console.error(`ERROR: Error reading directory: ${dir}`, dirReadError.message);
    return [];
  }
}

/**
 *
 * @param folderPath
 */
export function createPath(folderPath: string) {
  // Check if the folder exists, and create it if does not
  if (!fs.existsSync(folderPath)) {
    try {
      fs.mkdirSync(folderPath, { recursive: true });
      console.info(`INFO: Folder created: ${folderPath}`);
    } catch (folderError) {
      console.error(`ERROR: Error creating folder: ${folderPath}`, folderError.message);
    }
  }
}

/**
 * Creates a file with the given text
 * @param typeGuardsText - The text to be added to the file
 * @param inputPath
 * @param outputPath
 * @param isCombinedInput? - Whether the input is a combined file or not
 */
function createFile(
  typeGuardsText: string,
  inputPath: string,
  outputPath: string,
  isCombinedInput?: boolean,
) {
  const initialContent =
    '// Generated using ts-gen-typeguards\n // @ts-nocheck\n';
  const filePath = isCombinedInput ? inputPath : outputPath;
  try {
    fs.writeFileSync(
      filePath,
      `${initialContent}`,
    );
    console.info(`INFO: ${filePath} created and initial content added successfully.`);
    appendText(typeGuardsText, inputPath, outputPath, isCombinedInput);
  } catch (err) {
    console.error('ERROR: Error while creating the file:', filePath, err.message);
  }
}

/**
 * Appends the given text to the file
 * @param typeGuardsText - The text to be added to the file
 * @param inputPath
 * @param outputPath
 * @param isCombinedInput? - Whether the input is a combined file or not
 */
function appendText(
  typeGuardsText: string,
  inputPath: string,
  outputPath: string,
  isCombinedInput?: boolean,
) {
  const filePath = isCombinedInput ? `./${inputPath}` : `./${outputPath}`
  try {
    fs.appendFileSync(
      filePath,
      typeGuardsText,
    );
    console.info(`INFO: Text appended to the ${filePath} successfully.`);
  } catch (err) {
    console.error(`ERROR: Error while appending text to the ${filePath}:`, err.message);
  }
}

/**
 * Formats the given input using prettier
 * @param input
 */
function prettify(input: string): Promise<string> {
  return prettier.format(input, {
    singleQuote: true,
    trailingComma: 'es5',
    tabWidth: 2,
    parser: 'typescript',
    ...prettierRC,
  });
}
