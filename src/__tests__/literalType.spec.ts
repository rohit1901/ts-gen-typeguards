import { removeWhitespace } from 'ts-raw-utils';
import { generateTypeTypeGuard } from '../api';
import * as ts from 'typescript';
import { createSourceFile } from 'typescript';

describe('Generator', () => {
  const text = `export type EvenNumbers = 2 & 4 & 6 & 8;
    export type EvenNumbersType = '2' | '4' | '6' | '8';
    export type NumberStringComboType = '2' | 4 | '6' | 8;`;
  const sourceFile = createSourceFile('', text, ts.ScriptTarget.ES2015, true);
  const interfaces = sourceFile.statements.filter(ts.isTypeAliasDeclaration);
  const [
    evenNumbers,
    evenNumbersType,
    numberStringComboType,
  ] = interfaces;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should generate correct typeguard for even numbers (Literal Types)', () => {
    const result = generateTypeTypeGuard([evenNumbers], []);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`exportfunctionisEvenNumbers(value:any):valueisEvenNumbers{return(value!==null&&value===2&&value===4&&value===6&&value===8)}`),
    );
  });
  it('should generate correct typeguard for even numbers as strings (Literal Types)', () => {
    const result = generateTypeTypeGuard([evenNumbersType], []);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`exportfunctionisEvenNumbersType(value:any):valueisEvenNumbersType{return(value!==null&&(value==='2'||value==='4'||value==='6'||value==='8'))}`),
    );
  });
  it('should generate correct typeguard for even numbers as strings and numbers (Literal Types)', () => {
    const result = generateTypeTypeGuard([numberStringComboType], []);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`exportfunctionisNumberStringComboType(value:any):valueisNumberStringComboType{return(value!==null&&(value==='2'||value===4||value==='6'||value===8))}`),
    );
  });
});
