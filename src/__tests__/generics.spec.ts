import {createSourceFile} from "typescript";
import * as ts from "typescript";
import {generateEnumTypeGuards, generateInterfaceTypeGuard} from "../api";
import {removeWhitespace} from "../utils";

describe('Generator', () => {
    const text = `export interface GenericInterface<T> {
        property: T;
        nestedProp: {
            nested: T
        }
    }`;
    const sourceFile = createSourceFile('', text, ts.ScriptTarget.ES2015, true);
    const interfaces = sourceFile.statements.filter(ts.isInterfaceDeclaration);
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should generate typeguard for an Interface with a generic property and a nested generic property', function () {
        const result = generateInterfaceTypeGuard(interfaces);
        expect(removeWhitespace(result)).toEqual(
            removeWhitespace(`
        export function isGenericInterface<T>(
          val: any,
          guard: (val: any) => val is T
        ): value is GenericInterface<T> {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('property') &&
            guard(value.property) &&
            value.hasOwnProperty('nestedProp') &&
            (value.nestedProp.hasOwnProperty('nested') &&
            guard(value.nestedProp.nested))
          )
        }`),
        );
    });
});