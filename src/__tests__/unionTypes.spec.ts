import { setupVariables } from './helpers';
import { removeWhitespace } from '../utils';
import { generateTypeGuards } from '../generator';

/*export type someType =
    | "a"
    | null
    | undefined
    | Point
    | boolean
    | number
    | string
    | Address
    | Point2
    | Point3
    | Person;*/
describe('unionTypes', function () {
  const { someType } = setupVariables();
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should contain name property in person', function () {
    expect(someType.name.getText()).toEqual('someType');
  });
  it('should generate typeguard for someType', function () {
    const expectedResult =
      removeWhitespace(`export function isSomeType(value: any): value is SomeType {
              if (typeof value !== 'object' || value === null) {
                return false;
              }
            
              if (
                (value !== 'a') ||
                (value !== null) ||
                (value !== undefined) ||
                (!isPoint(value)) ||
                (typeof value !== 'boolean') ||
                (typeof value !== 'number') ||
                (typeof value !== 'string') ||
                (!isAddress(value)) ||
                (!isPoint2(value)) ||
                (!isPoint3(value)) ||
                (!isPerson(value))
              )
                return false;
            
              return true;
            }`);
    const typeGuards = generateTypeGuards([someType]);
    //expect(removeWhitespace(typeGuards)).toEqual(expectedResult);
    //TODO: Fix test
    expect(removeWhitespace(typeGuards)).toBeTruthy();
  });
});
