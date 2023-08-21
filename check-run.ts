// index.ts
import * as guards from './out/typeguards';

const employeeData = {
    name: 'John',
    age: 30,
    jobTitle: 'Developer',
    address: {
        street: '123 Main St',
        city: 'Cityville',
    },
};

console.log('isEmployee', guards.isEmployee(employeeData));

const shapeData = {
    type: 'circle',
    radius: 5,
};

console.log('isCustomShape', guards.isCustomShape(shapeData));

const carData = {
    brand: 'Tesla',
    model: 'Model S',
    batteryCapacity: 75,
};

console.log('isElectricCar', guards.isElectricCar(carData));

const dogData = {
    name: 'Buddy',
    breed: 'Labrador',
};

console.log('isDog', guards.isDog(dogData));

const calculatorData = {
    add: (x: number, y: number) => x + y,
    subtract: (x: number, y: number) => x - y,
};

console.log('isCalculator', guards.isCalculator(calculatorData));

const dictionaryData = {
    apple: 'a fruit',
    car: 'a vehicle',
};

console.log('isDictionary', guards.isDictionary(dictionaryData));

const personWithOptionalAddress = {
    name: 'Alice',
    age: 25,
};

console.log('isPersonWithOptionalAddress', guards.isPersonWithOptionalAddress(personWithOptionalAddress));
// ... Previous checks

// Image and Video Enums
/*console.log('isMediaType', guards.isMediaTypeInterface('image'));
console.log('isMediaType', guards.isMediaTypeInterface('video'));*/

// Type Aliases
console.log('isDirection', guards.isDirection('up'));
console.log('isEvenNumber', guards.isEvenNumbers(4));

// Union Types
console.log('isBooleanState', guards.isBooleanStates(true));
console.log('isStatusCode', guards.isStatusCode(404));

// Intersection Types
//console.log('isStatusType', guards.isStatus('success'));
console.log('isGreeting', guards.isGreeting('Hello, '));

// Dictionary Interface
console.log('isDictionary', guards.isDictionary({
    apple: 'a fruit',
    car: 'a vehicle',
}));

// Additional Type Alias and Interfaces
// ...

// Nested Interface Checks
console.log('isAddressInterface', guards.isAddressInterface({
    street: '123 Main St',
    city: 'Cityville',
}));

console.log('isPersonInterface', guards.isPersonInterface({
    name: 'Alice',
    age: 25,
    address: {
        street: '456 Elm St',
        city: 'Townsville',
    },
}));

console.log('isEmployee', guards.isEmployee({
    name: 'John',
    age: 30,
    jobTitle: 'Developer',
    address: {
        street: '789 Oak St',
        city: 'Villageton',
    },
}));

// CustomShape Interface Checks
console.log('isCustomShape', guards.isCustomShape({
    type: 'circle',
    radius: 5,
}));

// ElectricCar Interface Checks
console.log('isElectricCar', guards.isElectricCar({
    brand: 'Tesla',
    model: 'Model S',
    batteryCapacity: 75,
}));

// Animal Interfaces Checks
console.log('isDog', guards.isDog({
    name: 'Buddy',
    breed: 'Labrador',
}));

console.log('isCat', guards.isCat({
    name: 'Whiskers',
    color: 'gray',
}));

// Calculator Interface Checks
console.log('isCalculator', guards.isCalculator({
    add: (x, y) => x + y,
    subtract: (x, y) => x - y,
}));

// Image Interface Checks
/*console.log('isImage', guards.isImage({
    type: MediaTypeInterface.Image,
    url: 'example.jpg',
}));*/

// Video Interface Checks
/*console.log('isVideo', guards.isVideo({
    type: MediaTypeInterface.Video,
    source: 'example.mp4',
}));*/

// Additional Interface Checks
// ...


