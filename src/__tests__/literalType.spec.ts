import { capitalize, removeWhitespace } from '../utils';
import { setupVariables } from './helpers';
import { generateTypeTypeGuard } from '../api/generateTypeTypeGuard';
import { generateEnumTypeGuards } from '../api';

describe('Literal types', () => {
  const { evenNumbersTypeAlias, colorEnum } = setupVariables();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should generate correct typeguard for even numbers', () => {
    const result = generateTypeTypeGuard([evenNumbersTypeAlias], [], []);
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
  //TODO: somehow all the ' single quotes are getting removed
  /*it('should generate correct typeguard for even numbers as strings', () => {
        const result = generateTypeTypeGuard([evenNumberStringsTypeAlias], [], []);
        expect(removeWhitespace(result)).toEqual(removeWhitespace(`export function isEvenNumberStrings(value: any): value is EvenNumberStrings {
          return (
            typeof value === "object" &&
            value !== null &&
            value === "2" &&
            value === "4" &&
            value === "6" &&
            value === "8"
          )
        }`));
    });
    it('should generate correct typeguard for even numbers as strings and numbers', () => {
        const result = generateTypeTypeGuard([evenNumberStringsCombiTypeAlias], [], []);
        expect(removeWhitespace(result)).toEqual(removeWhitespace(`export function isEvenNumberStringsCombi(
          value: any
        ): value is EvenNumberStringsCombi {
          return (
            typeof value === 'object' &&
            value !== null &&
            value === "2" &&
            value === 4 &&
            value === "6" &&
            value === 8
          )
        }`));
    });*/
  it('should generate typeguard for Enum', function () {
    const result = generateEnumTypeGuards([colorEnum]);
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(`export function isColor(value: any): value is Color {
          return Object.values(Color).includes(value);
        }`),
    );
  });
});
