import { removeWhitespace } from 'ts-raw-utils';
import { generateInterfaceTypeGuard } from '../api';
import * as ts from 'typescript';
import { createSourceFile } from 'typescript';

describe('Generator', () => {
  const text = `
    export interface Point {
      x?: number;
      y: number;
    }
    export interface Person {
      name?: string;
      gender: 'male' | 'female';
    }
    
    export interface Employee extends Person {
      employeeId: number;
    }
    export interface User {
      id: number;
      name: string;
    }
    export interface Car {
      brand: 'Toyota' | 'Honda' | 'Ford';
      color: 'red' | 'blue' | 'black';
    }
    //NOTE: Nested Literal types are not supported
    export interface City {
      name?: string;
      literalType?: '2';
      typeLiteralType: MediumCity;
      population: number;
    }
    export interface Coordinates {
      x: number;
      y: number;
    }
    
    export interface Move {
      direction: Day;
      distance: number;
      position: Coordinates;
    }
    
    export interface Product {
      name: string;
      price: number;
    }
    
    export interface Vehicle {
      type: 'car' | 'bike' | 'bus';
      wheels: number;
    }
    export type MediumCity = City | { size: CitySize.Medium }
    export enum CitySize {
      Small = 'Small',
      Medium = 'Medium',
      Large = 'Large',
    }`;
  const sourceFile = createSourceFile('', text, ts.ScriptTarget.ES2015, true);
  const interfaces = sourceFile.statements.filter(ts.isInterfaceDeclaration);
  const [
    pointInterface,
    personInterface,
    employeeInterface,
    userInterface,
    carInterface,
    cityInterface,
    coordinatesInterface,
    moveInterface,
    productInterface,
    vehicleInterface,
  ] = interfaces;
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should generate typeguard for Point Interface (InterfaceDeclaration with one optional property)', function () {
    const result = generateInterfaceTypeGuard([pointInterface]);
    const expectedResult = `export function isPoint(value: any): value is Point {
      return (
        typeof value === "object" &&
        value !== null &&
        (typeof value.x === 'undefined' ||value.hasOwnProperty('x') || typeof value.x === 'number') &&
        value.hasOwnProperty('y') &&
        typeof value.y === 'number'
      )
    }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for Person Interface (InterfaceDeclaration with one optional property and a UnionType property)', function () {
    const result = generateInterfaceTypeGuard([personInterface]);
    const expectedResult = `export function isPerson(value: any): value is Person {
      return (
        typeof value === "object" &&
        value !== null &&
        (typeof value.name === 'undefined' ||value.hasOwnProperty('name') || typeof value.name === 'string') &&
        value.hasOwnProperty('gender') &&
        ( value.gender === 'male' ||  value.gender === 'female')
      )
    }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for Employee Interface (InterfaceDeclaration which extends another InterfaceDeclaration)', function () {
    const result = generateInterfaceTypeGuard([
      employeeInterface,
      personInterface,
    ]);
    const expectedResult = `export function isEmployee(value: any): value is Employee {
      return (
        typeof value === "object" &&
        value !== null &&
        value.hasOwnProperty('employeeId') &&
        typeof value.employeeId === 'number' &&
        (typeof value.name === 'undefined' ||value.hasOwnProperty('name') || typeof value.name === 'string') &&
        value.hasOwnProperty('gender') &&
        ( value.gender === 'male' ||  value.gender === 'female')
      )
    }`;
    const expectedPersonResult = `export function isPerson(value: any): value is Person {
      return (
        typeof value === "object" &&
        value !== null &&
        (typeof value.name === 'undefined' ||value.hasOwnProperty('name') || typeof value.name === 'string') &&
        value.hasOwnProperty('gender') &&
        ( value.gender === 'male' ||  value.gender === 'female')
      )
    }`;
    expect(removeWhitespace(result)).toEqual(
      removeWhitespace(expectedResult + expectedPersonResult),
    );
  });
  it('should generate typeguard for User Interface (InterfaceDeclaration with a LiteralType properties)', function () {
    const result = generateInterfaceTypeGuard([userInterface]);
    const expectedResult = `export function isUser(value: any): value is User {
      return (
        typeof value === "object" &&
        value !== null &&
        value.hasOwnProperty('id') &&
        typeof value.id === 'number' &&
        value.hasOwnProperty('name') &&
        typeof value.name === 'string'
      )
    }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for Car Interface (InterfaceDeclaration with UnionType properties of string LiteralTypes)', function () {
    const result = generateInterfaceTypeGuard([carInterface]);
    const expectedResult = `export function isCar(value: any): value is Car {
      return (
        typeof value === "object" &&
        value !== null &&
        value.hasOwnProperty('brand') &&
        ( value.brand === 'Toyota' ||  value.brand === 'Honda' ||  value.brand === 'Ford') &&
        value.hasOwnProperty('color') &&
        ( value.color === 'red' ||  value.color === 'blue' ||  value.color === 'black')
      )
    }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for City Interface (InterfaceDeclaration with OptionalType and TypeReference properties)', function () {
    const result = generateInterfaceTypeGuard([cityInterface]);
    const expectedResult = `export function isCity(value: any): value is City {
          return (
            typeof value === "object" &&
            value !== null &&
            (typeof value.name === 'undefined' ||value.hasOwnProperty('name') || typeof value.name === 'string') &&
            (typeof value.literalType === 'undefined' ||value.hasOwnProperty('literalType') || value.literalType === '2') &&
            value.hasOwnProperty('typeLiteralType') &&
            isMediumCity(value.typeLiteralType,) &&
            value.hasOwnProperty('population') &&
            typeof value.population === 'number'
          )
        }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for Coordinates Interface (InterfaceDeclaration with two required properties)', function () {
    const result = generateInterfaceTypeGuard([coordinatesInterface]);
    const expectedResult = `export function isCoordinates(value: any): value is Coordinates {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('x') &&
            typeof value.x === 'number' &&
            value.hasOwnProperty('y') &&
            typeof value.y === 'number'
          )
        }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for Move Interface (InterfaceDeclaration with an EnumDeclaration required property)', function () {
    const result = generateInterfaceTypeGuard([moveInterface]);
    const expectedResult = `export function isMove(value: any): value is Move {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('direction') &&
            isDay(value.direction,) &&
            value.hasOwnProperty('distance') &&
            typeof value.distance === 'number' &&
            value.hasOwnProperty('position') &&
            isCoordinates(value.position,)
          )
        }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for Product Interface (InterfaceDeclaration with required property)', function () {
    const result = generateInterfaceTypeGuard([productInterface]);
    const expectedResult = `export function isProduct(value: any): value is Product {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('name') &&
            typeof value.name === 'string' &&
            value.hasOwnProperty('price') &&
            typeof value.price === 'number'
          )
        }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
  it('should generate typeguard for Vehicle Interface (InterfaceDeclaration with UnionType properties of LiteralTypes)', function () {
    const result = generateInterfaceTypeGuard([vehicleInterface]);
    const expectedResult = `export function isVehicle(value: any): value is Vehicle {
          return (
            typeof value === "object" &&
            value !== null &&
            value.hasOwnProperty('type') &&
            ( value.type === 'car' ||
               value.type === 'bike' ||
               value.type === 'bus') &&
            value.hasOwnProperty('wheels') &&
            typeof value.wheels === 'number'
          )
        }`;
    expect(removeWhitespace(result)).toEqual(removeWhitespace(expectedResult));
  });
});
