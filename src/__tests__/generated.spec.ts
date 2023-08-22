import * as guards from '../../out/typeGuards';
import * as types from '../../input/combinedTypeGuards';

describe('Type Guards Tests', () => {
    // Test for DirectionEnum
    test('isDirectionEnum', () => {
        expect(guards.isDirectionEnum(types.DirectionEnum.Up)).toBe(true);
    });

    // Test for ColorEnum
    test('isColorEnum', () => {
        expect(guards.isColorEnum(types.ColorEnum.Red)).toBe(true);
    });

    // Test for ComputedValues
    test('isComputedValues', () => {
        expect(guards.isComputedValuesEnum(types.ComputedValuesEnum.Middle)).toBe(true);
    });

    // Test for Status
    test('isStatus', () => {
        expect(guards.isStatusType('success')).toBe(true);
    });

    // ... repeat similar tests for other enums and types ...

    // Test for AddressOptional
    test('isAddressOptional', () => {
        const addressOptional = {
            street: '456 Elm St',
            city: 'Townsville',
            postalCodeOptional: '12345',
        };
        expect(guards.isAddressOptional(addressOptional)).toBe(true);
    });

    // Test for ContactOptional
    test('isContactOptional', () => {
        const contactOptional = {
            email: 'example@example.com',
            phone: '123-456-7890',
            faxOptional: '987-654-3210',
        };
        expect(guards.isContactOptional(contactOptional)).toBe(true);
    });
});
