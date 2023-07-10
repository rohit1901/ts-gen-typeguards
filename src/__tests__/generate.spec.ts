const fs = require('fs');
const path = require('path');
const { generateTypeGuardsFromFile } = require('../');

// Mock the fs module for testing
jest.mock('fs');

describe('generateTypeGuardsFromFile', () => {
    const filePath = 'path/to/your/file.ts';
    const fileContent = `
    interface MyInterface {
      id: number;
      name: string;
    }
  
    type MyType = {
      prop1: string;
      prop2: number;
    }
  `;

    beforeEach(() => {
        // Set up the mock implementation for fs.readFileSync
        fs.readFileSync.mockReturnValue(fileContent);
    });

    afterEach(() => {
        // Clear the mock to reset the state between tests
        fs.readFileSync.mockClear();
    });

    it('should read the file and generate type guards for interfaces/types', () => {
        generateTypeGuardsFromFile(filePath);

        // Expectations
        expect(fs.readFileSync).toHaveBeenCalledWith(filePath, 'utf-8');
        // Add more expectations based on your specific requirements
    });

    it('should generate the correct type guard code', () => {
        const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

        generateTypeGuardsFromFile(filePath);

        // Expectations
        expect(mockWriteFileSync).toHaveBeenCalledTimes(2); // Assuming 2 interfaces/types in the file
        expect(mockWriteFileSync).toHaveBeenCalledWith(
            //path.join(outputDir, 'MyInterface.js'),
            expect.stringContaining('if (typeof MyInterface !== \'object\' || MyInterface === null) {')
        );
        // Add more expectations based on the generated type guard code
    });
});
