import * as fs from 'fs';
import * as prettier from 'prettier';
import { Options } from 'prettier';
import * as path from 'path';

export const defaultInputDir = 'input';
export const defaultOutputTypeGuardsFilePath = 'out/typeGuards.ts';
export const defaultOutputTypesFilePath = 'input/combinedTypeGuards.ts';
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
 */
export function generateTypeGuardsFile(
  typeGuardsText: string,
  isCombinedInput?: boolean,
  inputDir?: string,
  outputDir?: string,
): void {
  const inputPath =
    inputDir + '/combinedTypeGuards.ts' ?? defaultOutputTypesFilePath;
  const outputPath = outputDir.includes('/typeGuards.ts')
    ? outputDir
    : defaultOutputTypeGuardsFilePath;
  prettify(typeGuardsText)
    .then(formattedText => {
      try {
        if (fs.existsSync(isCombinedInput ? inputPath : outputPath)) {
          // File exists, updating it by appending text
          appendText(formattedText, inputPath, outputPath, isCombinedInput);
        } else {
          // File doesn't exist, creating it and appending text
          createFile(formattedText, inputPath, outputPath, isCombinedInput);
        }
      } catch (err) {
        console.error('Error while processing the file:', err.message);
      }
    })
    .catch(err => {
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
 * Function to recursively read files with a specific extension from a directory and return their content as a string
 * @param dir - Optional directory to read files from (defaults to ./out)
 * @param extension - Optional extension to filter files by (defaults to .ts)
 */
export function readFilesWithExtension(
  dir: string = `./${defaultInputDir}`,
  extension: string = 'ts',
) {
  try {
    if (extension !== 'ts') {
      throw new Error('Only .ts files are supported');
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
        !filePath.includes('.d.ts') &&
        !filePath.includes('combinedTypeGuards.ts')
      ) {
        console.log(`Reading file: ${filePath}`);
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          results.push(content);
        } catch (readError) {
          console.error(`Error reading file: ${filePath}`);
          console.error(readError.message);
        }
      }
    }
    createFile(
      results.join(''),
      dir + '/combinedTypeGuards.ts',
      undefined,
      true,
    );
    return results;
  } catch (dirReadError) {
    console.error(`Error reading directory: ${dir}`);
    console.error(dirReadError.message);
    return [];
  }
}
/**
 * Creates a file with the given text
 * @param typeGuardsText - The text to be added to the file
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
  try {
    fs.writeFileSync(
      isCombinedInput ? inputPath : outputPath,
      `${initialContent}`,
    );
    console.info('File created and initial content added successfully.');
    appendText(typeGuardsText, inputPath, outputPath, isCombinedInput);
  } catch (err) {
    console.error('Error while creating the file:', err.message);
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
  try {
    fs.appendFileSync(
      isCombinedInput ? `./${inputPath}` : `./${outputPath}`,
      typeGuardsText,
    );
    console.info('Text appended to the file successfully.');
  } catch (err) {
    console.error('Error while appending text to the file:', err.message);
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

function createPath() {
  const folderPath = 'path/to/your/folder'; // Replace with the actual folder path
  const filePath = path.join(folderPath, 'example.txt'); // Replace 'example.txt' with the desired file name

  // Check if the folder exists, and create it if not
  if (!fs.existsSync(folderPath)) {
    try {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Folder created: ${folderPath}`);
    } catch (folderError) {
      console.error(`Error creating folder: ${folderPath}`);
      console.error(folderError.message);
    }
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }

  // Check if the file exists, and create it if not
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, 'Hello, world!', 'utf8'); // You can provide initial content here
      console.log(`File created: ${filePath}`);
    } catch (fileError) {
      console.error(`Error creating file: ${filePath}`);
      console.error(fileError.message);
    }
  } else {
    console.log(`File already exists: ${filePath}`);
  }
}
