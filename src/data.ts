/*
export interface Person {
  intersectionLiteralType?: string & bigint;
  unionLiteralType?: string | number;
  intersectionReferenceType?: string & Point;
  unionReferenceType?: string | Point;
  literalType: number;
  referenceType: Point;
  anyType?: any;
}

export interface Person2 extends Person {
  person2Prop: string;
  person2Interface: Person;
  // TODO: person2InterfaceTernary: Person extends Point ? Person : Point;
}
export interface Person3 extends Person2 {
  person3Prop: string & Point;
  person3ReferenceType: Point;
  person3UnionLiteralType?: string | number;
  person3UnionReferenceType?: string | Point;
}
export type Point = {
  x: number;
  y: number;
};
// TODO: For union types, literals like 'a' are generated as 'literal' instead of 'string', 'null'
// 'null' as 'literal' instead of 'undefined'
export type someType = 'a' | null | undefined | boolean | number | string;
export type simple = { a: string } | PersonType;
export type PersonType = {
  name: string & number;
  extra: string | number;
};
//TODO
//conditional types
//Parenthesis types
export type Person4 = number & string;
export type Person5 = Point & Point2Type;
export type AddressType =
  | ({
      street: string;
    } & PersonType)
  | {
      street2: string;
    };
export type Point2Type =
  | {
      x: number;
      y: number;
      z?: Point;
    }
  | (Point & PersonType);
export type Point3Type = {
  z?: number;
  m?: string & Point;
} & PersonType;

export enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}
export enum Fruit {
  Apple = 'APPLE',
  Banana = 'BANANA',
  Orange = 'ORANGE',
}

export enum Animal {
  Dog = 'DOG',
  Cat = 'CAT',
  Lion = 'LION',
}
export type enumIntersection = Color & Fruit & Animal;
export type enumUnion = Color | Fruit | Animal;
//TODO: Imports
*/

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
//TODO: Nested Literal types are not supported
export interface City {
  name?: string;
  literalType?: '2';
  typeLiteralType: {
    x: MediumCity;
  };
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
export type EmployeeOrHR = Employee | { department: 'HR' };

export type PersonId = number;

export type PersonWithId = Person & { id: PersonId };

export type MonthOrUndefined = Month | undefined;

export type ElectronicProduct = Product & { category: Category.Electronics };
export type NumberOrZero = 1 | 2 | 3 | 4 | 0;
//TODO: Could be improved by checking isCar(value)
export type RedToyota = Car & { brand: 'Toyota'; color: 'red' };
export type MediumCity = City | { size: CitySize.Medium };

//TODO: Could be improved by checking isUser(value)
export type ActiveUser = Status & User;

export type PrimitiveTypes = string | number | bigint | null | any | undefined;
export type EvenNumbers = 2 & 4 & 6 & 8;
export type EvenNumberStrings = '2' & '4' & '6' & '8';
export type EvenNumberStringsCombi = '2' & 4 & '6' & 8;


export type FruitAndAnimal = Fruit & Animal;

export type PointAndName = Point & { name: string };

export type Gender = 'male' | 'female' | 'other';
export type RedCircle = Color.Red & { shape: 'circle' };
export type ColorOrString = Color | 'yellow';
export type WorkingDay = Day & { isWorking?: boolean };

export enum Fruit {
  Apple = 'APPLE',
  Banana = 'BANANA',
  Orange = 'ORANGE',
}

export enum Animal {
  Dog = 'DOG',
  Cat = 'CAT',
  Lion = 'LION',
}
export enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum Day {
  Monday = 'MON',
  Tuesday = 'TUE',
  Wednesday = 'WED',
}
export enum CitySize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
export enum Category {
  Electronics = 'ELECTRONICS',
  Clothing = 'CLOTHING',
}

export enum Month {
  January = 'JAN',
  February = 'FEB',
  March = 'MAR',
}


