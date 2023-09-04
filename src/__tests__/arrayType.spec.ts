import * as ts from 'typescript';
import { createSourceFile } from 'typescript';
import { generateInterfaceTypeGuard, generateTypeTypeGuard } from '../api';
import { removeWhitespace } from 'ts-raw-utils';

describe('Generator', () => {
  const text = `interface ArrayInterface {
      arrayProperty: string[];
      arrayOptional?: string[];
    }
    type ArrayType = {
      arrayProperty: {
        arrayProperty: string[];
      }[];
      arrayOptional: {
        optionalTypeLiteralArray: {
          x: number[];
        };
      };
    };
    `;
  const sourceFile = createSourceFile('', text, ts.ScriptTarget.ES2015, true);
  const interfaces = sourceFile.statements.filter(ts.isInterfaceDeclaration);
  const types = sourceFile.statements.filter(ts.isTypeAliasDeclaration);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should correctly generate typeguards for required and optional properties (array of strings) of an interface', () => {
    const result = generateInterfaceTypeGuard(interfaces);
    const expectedResult =
      removeWhitespace(`export function isArrayInterface(value: any): value is ArrayInterface {
          return (
            typeof value === "object" &&
            value !== null &&
            'arrayProperty' in value &&
            (Array.isArray(value.arrayProperty) &&
            value.arrayProperty.every((item: any) => typeof item === 'string')) &&
            (typeof value.arrayOptional === 'undefined' || ('arrayOptional' in value &&
              (Array.isArray(value.arrayOptional) &&
                value.arrayOptional.every((item: any) => typeof item === 'string'))))
          )
        }`);
    expect(removeWhitespace(result)).toEqual(expectedResult);
  });
  it('should correctly generate typeguards for TypeLiteral with required array of TypeLiterals and optional TypeLiteral properties with nested required string and number array properties', () => {
    const result = generateTypeTypeGuard(types, []);
    const expectedResult = removeWhitespace(`
        export function isArrayType(value: any): value is ArrayType {
          return (
            value !== null &&
            'arrayProperty' in value &&
            (Array.isArray(value.arrayProperty) &&
            value.arrayProperty.every((elem: any) => {
              return (
                'arrayProperty' in elem &&
                (Array.isArray(elem.arrayProperty) &&
                elem.arrayProperty.every((item: any) => typeof item === 'string')
              ))
            })) &&
            'arrayOptional' in value &&
            ('optionalTypeLiteralArray' in value.arrayOptional &&
            ('x' in value.arrayOptional.optionalTypeLiteralArray &&
            (Array.isArray(value.arrayOptional.optionalTypeLiteralArray.x) &&
            value.arrayOptional.optionalTypeLiteralArray.x.every(
              (item: any) => typeof item === 'number'
            )))))
        }`);
    expect(removeWhitespace(result)).toEqual(expectedResult);
  });
});
