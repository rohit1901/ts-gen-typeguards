import * as ts from 'typescript';
import {createSourceFile} from 'typescript';
import {generateInterfaceTypeGuard} from '../api';
import {removeWhitespace} from 'ts-raw-utils';

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
          value: any,
          isT: (val: any) => val is T
        ): value is GenericInterface<T> {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('property') &&
            isT(value.property) &&
            value.hasOwnProperty('nestedProp') &&
            (value.nestedProp.hasOwnProperty('nested') &&
            isT(value.nestedProp.nested))
          )
        }`),
        );
    });
});
