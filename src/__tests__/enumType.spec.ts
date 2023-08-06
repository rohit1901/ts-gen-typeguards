import {capitalize, removeWhitespace} from "../utils";
import {setupVariables} from "./helpers";
import {generateEnumTypeGuards} from "../api";

describe('Enum types', () => {
    const { colorEnum } = setupVariables();
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should generate typeguard for Enum', function () {
        const result = generateEnumTypeGuards([colorEnum]);
        expect(removeWhitespace(result)).toEqual(removeWhitespace(`export function isColor(value: any): value is Color {
          return Object.values(Color).includes(value);
        }`));
    });
});