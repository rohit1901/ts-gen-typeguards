import {capitalize, removeWhitespace} from "../utils";
import {setupVariables} from "./helpers";
import {generateEnumTypeGuards, generateInterfaceTypeGuard} from "../api";

describe('Interfaces', () => {
    const { cityInterface } = setupVariables();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should generate typeguard for Interface', function () {
        const result = generateInterfaceTypeGuard([cityInterface]);
        expect(removeWhitespace(result)).toEqual(removeWhitespace(`export function isCity(value: any): value is City {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('name') &&
            typeof value.name === 'string' &&
            value.hasOwnProperty('population') &&
            typeof value.population === 'number'
          )
        }`));
    });
});