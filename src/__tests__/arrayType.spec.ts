import {createSourceFile} from "typescript";
import * as ts from "typescript";
import {generateInterfaceTypeGuard} from "../api";
import {removeWhitespace} from "../utils";

describe('Enum types', () => {
    const text = `interface ArrayInterface {
      arrayProperty: string[];
      arrayOptional?: string[];
    }`;
    const sourceFile = createSourceFile('', text, ts.ScriptTarget.ES2015, true);
    const interfaces = sourceFile.statements.filter(ts.isInterfaceDeclaration);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should correctly generate typeguards for required and optional properties (array of strings) of an interface', () => {
        const result = generateInterfaceTypeGuard(interfaces);
        const expectedResult = removeWhitespace(`export function isArrayInterface(value: any): value is ArrayInterface {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('arrayProperty') &&
            (Array.isArray(value.arrayProperty) &&
            value.arrayProperty.every((item: any) => typeof item === 'string')) &&
            (typeof value.arrayOptional === 'undefined' ||
              (Array.isArray(value.arrayOptional) &&
                value.arrayOptional.every((item: any) => typeof item === 'string')))
          )
        }`)
        expect(removeWhitespace(result)).toEqual(expectedResult);
    });
});