import * as guards from './out/typeGuards';
import * as types from './input/combinedTypeGuards';

// Example for DirectionEnum
const direction: types.DirectionEnum = types.DirectionEnum.Up;

// Example for ColorEnum
const color: types.ColorEnum = types.ColorEnum.Red;


// Example for ComputedValues
const computedValue: types.ComputedValuesEnum = types.ComputedValuesEnum.Middle;

// Example for Status
const status: types.StatusEnum = types.StatusEnum.Active;

// Example for TrafficLight
const trafficLight: types.TrafficLightEnum = types.TrafficLightEnum.Yellow;

// Example for Car interface
const car: types.CarInterface = {
    brand: 'Toyota',
    model: 'Camry',
};

// Example for LogLevelUnion
const logLevel: types.LogLevelUnionEnum = types.LogLevelEnum.Debug;


// Example for Vehicle interface
const vehicle: types.VehicleType = {
    brand: 'CAR',
    model: 'Camry',
    topSpeed: 120,
};

// Example for AddressInterface
const address: types.AddressInterface = {
    street: '123 Main St',
    city: 'Cityville',
};

// Example for PersonInterface
const person: types.PersonInterface = {
    name: 'Alice',
    age: 30,
    address: address,
};

// Example for Employee interface
const employee: types.EmployeeInterface = {
    name: 'John',
    age: 25,
    jobTitle: 'Developer',
    address: address,
};

// Example for CircleInterface
const circle: types.CircleInterface = {
    type: 'circle',
    radius: 5,
};

// Example for SquareInterface
const square: types.SquareInterface = {
    type: 'square',
    sideLength: 10,
};

// Example for TriangleInterface
const triangle: types.TriangleInterface = {
    type: 'triangle',
    base: 8,
    height: 6,
};

// Example for CarInterface
const carInterface: types.CarInterface = {
    brand: 'Ford',
    model: 'Mustang',
};

// Example for ElectricCar interface
const electricCar: types.ElectricCarType = {
    brand: 'Tesla',
    model: 'Model S',
    batteryCapacity: 75,
};

// Example for SportsCar interface
const sportsCar: types.SportsCarInterface = {
    brand: 'Ferrari',
    model: '488 GTB',
    topSpeed: 220,
};

// Example for AnimalInterface
const animal: types.AnimalInterface = {
    name: 'Leo',
    makeSound: () => {
        console.log('Roar!');
    },
};

// Example for Dog interface
const dog: types.DogInterface = {
    name: 'Buddy',
    breed: 'Labrador',
    makeSound: () => {
        console.log('Woof!');
    },
};

// Example for Cat interface
const cat: types.CatInterface = {
    name: 'Whiskers',
    color: 'Orange',
    makeSound: () => {
        console.log('Meow!');
    },
};

// Example for Calculator interface
const calculator: types.CalculatorInterface = {
    add: (x, y) => x + y,
    subtract: (x, y) => x - y,
};

// Example for Image interface
const image: types.ImageInterface = {
    type: types.MediaTypeInterface.Image,
    url: 'https://example.com/image.jpg',
};

// Example for Video interface
const video: types.VideoInterface = {
    type: types.MediaTypeInterface.Video,
    source: 'https://example.com/video.mp4',
};

// Example for Media union type
const media: types.MediaInterface = image;

// Example for Direction type
const directionLiteral: types.DirectionEnum = types.DirectionEnum.Up;

// Example for EvenNumbers type
const evenNumber: types.EvenNumbersType = 4;

// Example for BooleanStates type
const booleanState: types.BooleanStatesType = true;

// Example for StatusCode type
const statusCode: types.StatusCodeType = 404;

// Example for Status type
const statusType: types.StatusType = 'success';

// Example for Greeting type
const greeting: types.GreetingType = 'Hello, ';

// Example for NumberStringCombo type
const numberStringCombo: types.NumberStringComboType = 2;

// Example for GreetingFlag type
const greetingFlag: types.GreetingFlagType = 'Hey';

// Example for LiteralOrUnion type
const literalOrUnion: types.LiteralOrUnionType = true;

// Example for AnyType
const anyValue: types.AnyType = 42;

// Example for UnknownType
const unknownValue: types.UnknownType = 'unknown';

// Example for AnyUnknownUnion
const anyUnknownUnion: types.AnyUnknownUnionType = anyValue;

// Example for AnyUnknownIntersection
const anyUnknownIntersection: types.AnyUnknownIntersectionType = unknownValue;

// Example for AnyUnknownUnionWithOthers
const anyUnknownUnionWithOthers: types.AnyUnknownUnionWithOthersType = 'example';

// Example for AddressOptional
const addressOptional: types.AddressOptional = {
    street: '456 Elm St',
    city: 'Townsville',
    postalCodeOptional: '12345',
};

// Example for ContactOptional
const contactOptional: types.ContactOptional = {
    email: 'example@example.com',
    phone: '123-456-7890',
    faxOptional: '987-654-3210',
};

// Example for PersonOptional
const personOptional: types.PersonOptional = {
    name: 'Bob',
    age: 28,
    address: addressOptional,
    contact: contactOptional,
};

// Example for EmployeeOptional
const employeeOptional: types.EmployeeOptional = {
    name: 'Eve',
    age: 35,
    jobTitle: 'Manager',
    department: 'HR',
    address: addressOptional,
    contact: contactOptional,
};

// Example for ProjectOptional
const projectOptional: types.ProjectOptional = {
    projectTitle: 'New Project',
    startDate: '2023-01-01',
    endDateOptional: '2023-12-31',
};

// Example for CompanyOptional
const companyOptional: types.CompanyOptional = {
    companyName: 'Example Corp',
    companyUnknown: unknownValue,
    address: addressOptional,
    contact: contactOptional,
    employees: [employeeOptional],
    projects: [projectOptional],
};
// Test for DirectionEnum
console.log('isDirectionEnum', guards.isDirectionEnum(direction));
// Test for ColorEnum
console.log('isColorEnum', guards.isColorEnum(color));
// Test for ComputedValues
console.log('isComputedValues', guards.isComputedValuesEnum(computedValue));
// Test for Status
console.log('isStatus', guards.isStatusType('success'));
// Test for TrafficLight
console.log('isTrafficLight', guards.isTrafficLightEnum(trafficLight));
// Test for Car interface
console.log('isCar', guards.isCarInterface(car));
// Test for LogLevelUnion
console.log('isLogLevelUnion', guards.isLogLevelEnum(logLevel));
// Test for Vehicle interface
console.log('isVehicle', guards.isVehicleEnum(vehicle));
// Test for AddressInterface
console.log('isAddressInterface', guards.isAddressInterface(address));
// Test for PersonInterface
console.log('isPersonInterface', guards.isPersonInterface(person));
// Test for Employee interface
console.log('isEmployee', guards.isEmployeeInterface(employee));
// Test for CircleInterface
console.log('isCircleInterface', guards.isCircleInterface(circle));
// Test for SquareInterface
console.log('isSquareInterface', guards.isSquareInterface(square));
// Test for TriangleInterface
console.log('isTriangleInterface', guards.isTriangleInterface(triangle));
// Test for CarInterface
console.log('isCarInterface', guards.isCarInterface(carInterface));
// Test for ElectricCar interface
console.log('isElectricCar', guards.isElectricCarType(electricCar));
// Test for SportsCar interface
console.log('isSportsCar', guards.isSportsCar(sportsCar));
// Test for AnimalInterface
console.log('isAnimalInterface', guards.isAnimalInterface(animal));
// Test for Dog interface
console.log('isDog', guards.isDogInterface(dog));
// Test for Cat interface
console.log('isCat', guards.isCatInterface(cat));
// Test for Calculator interface
console.log('isCalculator', guards.isCalculatorInterface(calculator));
// Test for Image interface
console.log('isImage', guards.isImageInterface(image));
// Test for Video interface
console.log('isVideo', guards.isVideoInterface(video));
// Test for Media union type
console.log('isMedia', guards.isMediaInterface(media));
// Test for Direction type
console.log('isDirection', guards.isDirectionEnum(directionLiteral));
// Test for EvenNumbers type
console.log('isEvenNumbers', guards.isEvenNumbersType(evenNumber));
// Test for BooleanStates type
console.log('isBooleanStates', guards.isBooleanStatesType(booleanState));
// Test for StatusCode type
console.log('isStatusCode', guards.isStatusCodeType(statusCode));
// Test for Status type
console.log('isStatusType', guards.isStatusType(404));
// Test for Greeting type
console.log('isGreeting', guards.isGreetingType(greeting));
// Test for NumberStringCombo type
console.log('isNumberStringCombo', guards.isNumberStringComboType(numberStringCombo));
// Test for GreetingFlag type
console.log('isGreetingFlag', guards.isGreetingFlagType(greetingFlag));
// Test for LiteralOrUnion type
console.log('isLiteralOrUnion', guards.isLiteralOrUnionType(literalOrUnion));
// Test for AnyType
console.log('isAnyType', guards.isAnyType(anyValue));
// Test for UnknownType
console.log('isUnknownType', guards.isUnknownType(unknownValue));
// Test for AnyUnknownUnion
console.log('isAnyUnknownUnion', guards.isAnyUnknownUnionType(anyUnknownUnion));
// Test for AnyUnknownIntersection
console.log('isAnyUnknownIntersection', guards.isAnyUnknownIntersectionType(anyUnknownIntersection));
// Test for AnyUnknownUnionWithOthers
console.log('isAnyUnknownUnionWithOthers', guards.isAnyUnknownUnionWithOthersType(anyUnknownUnionWithOthers));
// Test for AddressOptional
console.log('isAddressOptional', guards.isAddressOptional(addressOptional));
// Test for ContactOptional
console.log('isContactOptional', guards.isContactOptional(contactOptional));
// Test for PersonOptional
console.log('isPersonOptional', guards.isPersonOptional(personOptional));
// Test for EmployeeOptional
console.log('isEmployeeOptional', guards.isEmployeeOptional(employeeOptional));
// Test for ProjectOptional
console.log('isProjectOptional', guards.isProjectOptional(projectOptional));
// Test for CompanyOptional
console.log('isCompanyOptional', guards.isCompanyOptional(companyOptional));