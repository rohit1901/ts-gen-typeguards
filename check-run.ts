import * as guards from './out/typeguards';

// Usage Examples
//tsGenTypeguards();

console.log('isPersonWithId:', guards.isPersonWithId({
    literalType: 2,
    gender: "male",
    id: 1,
}));
console.log('isPersonId:', guards.isPersonId(1));

console.log('isPerson:', guards.isPerson({
    literalType: 2,
    gender: "male",
}));
console.log('isUnionTypeArrayType:', guards.isUnionTypeArrayType(['1', '2']));
console.log('isPersonId:', guards.isPersonId(1));
console.log('isGender', guards.isGender('male'));
console.log('isPoint', guards.isPoint({
    required: '1',
    unknownRequired: '1',
    anyRequired: '1',
}));
console.log('isEmployee', guards.isEmployee({
    literalType: 2,
    gender: 'female',
    employeeId: 1,
}));
console.log('isUser', guards.isUser({
    id: 1,
    name: '1',
}));
console.log('isCar', guards.isCar({
    brand: 'Toyota',
    color: 'red',
}));
console.log('isCity', guards.isCity({
    name: '1',
    population: 1,
    typeLiteralType: {
        x: {
            size: 'Medium',
        },
    },
    literalType: '2',
}));
console.log('isMediumCity', guards.isCoordinates({
    latitude: 1,
    longitude: 1,
}));
console.log('isDirection', guards.isDirection({
    north: 'North',
    south: 'South',
    east: 'East',
    west: 'West',
}));
console.log('isMove', guards.isMove({
    direction: 'up',
    distance: 1,
    position: {
        latitude: 1,
        longitude: 1,
    },
}));
console.log('isProduct', guards.isProduct({
    name: '1',
    price: 1,
}));
console.log('isVehicle', guards.isVehicle({
    type: 'car',
    wheels: 4,
}));
console.log('isUnionTypeArrayType', guards.isUnionTypeArrayType(['1', '2']));
console.log('isUnionTypeArrayType', guards.isUnionTypeArrayType([1, 2]));
//console.log('isIntersectionTypeArrayType', guards.isIntersectionTypeArrayType([1n, 2n, 3n, 4n, 5n]));
//console.log('isAnyType', guards.isAnyType('1'));
//console.log('isUnknownType', guards.isUnknownType('1'));
console.log('isEmployeeOrHR', guards.isEmployeeOrHR({
    employeeId: 2,
    literalType: 2,
    gender: "male",
}));
console.log('isEmployeeOrHR', guards.isEmployeeOrHR({
    department: 'HR'
}));
// isMonthOrUndefined
console.log('isMonthOrUndefined', guards.isMonthOrUndefined('JAN'));
// ElectronicProduct
console.log('isElectronicProduct', guards.isElectronicProduct({
    name: '1',
    price: 1,
    category: 'ELECTRONICS',
}));
// NumberOrZero
console.log('isNumberOrZero', guards.isNumberOrZero(0));
// RedToyota
console.log('isRedToyota', guards.isRedToyota({
    brand: 'Toyota',
    color: 'red',
}));
// MediumCity
console.log('isMediumCity', guards.isMediumCity({
    name: '1',
    population: 1,
    typeLiteralType: {
        x: {
            size: 'Medium',
        },
    },
    literalType: '2',
}));
console.log('isMediumCity', guards.isMediumCity({
    size: 'Medium',
}));
// ActiveUser
console.log('isActiveUser', guards.isActiveUser({
    id: 1,
    name: '1',
    status: 'ACTIVE',
}));
// PrimitiveTypes
console.log('isPrimitiveTypes', guards.isPrimitiveTypes('string'));
console.log('isPrimitiveTypes', guards.isPrimitiveTypes(2));
console.log('isPrimitiveTypes', guards.isPrimitiveTypes(undefined));
// Even Numbers
console.log('isEvenNumbers', guards.isEvenNumbers(2));
console.log('isEvenNumbers', guards.isEvenNumbers(4));
// PointAndName
console.log('isPointAndName', guards.isPointAndName({
    required: '1',
    unknownRequired: '1',
    anyRequired: '1',
    name: '1',
}   ));
// RedCircle
console.log('isColorOrString', guards.isColorOrString('yellow'));
console.log('isColorOrString', guards.isColorOrString('red'));
