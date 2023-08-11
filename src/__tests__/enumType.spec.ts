import { capitalize, removeWhitespace } from '../utils';
import { generateEnumTypeGuards } from '../api';
import { createSourceFile } from 'typescript';
import * as ts from 'typescript';

describe('Generator', () => {
  const text = `export enum Fruit {
    Apple = 'APPLE',
    Banana = 'BANANA',
    Orange = 'ORANGE',
  }
  export enum WeekdayNumber {
      Monday = 1,
      Tuesday = 2,
      Wednesday = 3,
      Thursday = 4,
      Friday = 5
  }`;
  const sourceFile = createSourceFile('', text, ts.ScriptTarget.ES2015, true);
  const enums = sourceFile.statements.filter(ts.isEnumDeclaration);
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should generate typeguard for EnumDeclarations', function () {
    const result = generateEnumTypeGuards(enums);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`
        export function isFruit(value: any): value is Fruit {
          return Object.values(Fruit).includes(value);
        }
        export function isWeekdayNumber(value: any): value is WeekdayNumber {
          return Object.values(WeekdayNumber).includes(value);
        }`),
    );
  });
});
