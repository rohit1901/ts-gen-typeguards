import { removeWhitespace } from '../utils';
import { generateTypeTypeGuard } from '../api/generateTypeTypeGuard';
import * as ts from 'typescript';
import { createSourceFile } from 'typescript';

describe('Literal types', () => {
  const text = `export type EvenNumbers = 2 & 4 & 6 & 8;
    export type EvenNumberStrings = '2' & '4' & '6' & '8';
    export type EvenNumberStringsCombi = '2' & 4 & '6' & 8;`;
  const sourceFile = createSourceFile('', text, ts.ScriptTarget.ES2015, true);
  const interfaces = sourceFile.statements.filter(ts.isTypeAliasDeclaration);
  const [
    evenNumbersTypeAlias,
    evenNumberStringsTypeAlias,
    evenNumberStringsCombiTypeAlias,
  ] = interfaces;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should generate correct typeguard for even numbers', () => {
    const result = generateTypeTypeGuard([evenNumbersTypeAlias], []);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`export function isEvenNumbers(value: any): value is EvenNumbers {
          return (
            typeof value === "object" &&
            value !== null &&
            value === 2 &&
            value === 4 &&
            value === 6 &&
            value === 8
          )
        }`),
    );
  });
  it('should generate correct typeguard for even numbers as strings', () => {
    const result = generateTypeTypeGuard([evenNumberStringsTypeAlias], []);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`export function isEvenNumberStrings(value: any): value is EvenNumberStrings {
          return (
            typeof value === "object" &&
            value !== null &&
            value === '2' &&
            value === '4' &&
            value === '6' &&
            value === '8'
          )
        }`),
    );
  });
  it('should generate correct typeguard for even numbers as strings and numbers', () => {
    const result = generateTypeTypeGuard([evenNumberStringsCombiTypeAlias], []);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`export function isEvenNumberStringsCombi(
          value: any
        ): value is EvenNumberStringsCombi {
          return (
            typeof value === "object" &&
            value !== null &&
            value === '2' &&
            value === 4 &&
            value === '6' &&
            value === 8
          )
        }`),
    );
  });
});
