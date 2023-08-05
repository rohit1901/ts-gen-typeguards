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

export type EvenNumbers = 2 & 4 & 6 & 8;
export type EvenNumberStrings = '2' & '4' & '6' & '8';
export type EvenNumberStringsCombi = '2' & 4 & '6' & 8;
export enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}

//FIXED: yellow should not be a string
export type ColorOrString = Color | 'yellow';
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

export type FruitAndAnimal = Fruit & Animal;

export interface Point {
  x: number;
  y: number;
}
//FIXED: interface Point is not generated
export type PointAndName = Point & { name: string };

//FIXED: male, female, other should not be strings
export type Gender = 'male' | 'female' | 'other';

//TODO: male, female should not be strings
export interface Person {
  name: string;
  gender: 'male' | 'female';
}

export interface Employee extends Person {
  employeeId: number;
}

export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export interface User {
  id: number;
  name: string;
}

//FIXED
export type ActiveUser = Status & User;

//FIXED: null should be undefined
export type PrimitiveTypes = string | number | bigint | null | any | undefined;

export enum Day {
  Monday = 'MON',
  Tuesday = 'TUE',
  Wednesday = 'WED',
}

export type WorkingDay = Day & { isWorking: boolean };
//TODO: value === Color.Red and shape === 'circle'
export type RedCircle = Color.Red & { shape: 'circle' };

export interface Coordinates {
  x: number;
  y: number;
}

export interface Move {
  direction: Day;
  distance: number;
  position: Coordinates;
}

export enum Month {
  January = 'JAN',
  February = 'FEB',
  March = 'MAR',
}

export type MonthOrUndefined = Month | undefined;

export interface Product {
  name: string;
  price: number;
}

export enum Category {
  Electronics = 'ELECTRONICS',
  Clothing = 'CLOTHING',
}
//TODO: isCategory.Electronics(value.category) should be isCategory(value.category)
export type ElectronicProduct = Product & { category: Category.Electronics };
//FIXED
export type NumberOrZero = 1 | 2 | 3 | 4 | 0;

export interface Vehicle {
  type: 'car' | 'bike' | 'bus';
  wheels: number;
}
//TODO: 'HR' should not be string
export type EmployeeOrHR = Employee | { department: 'HR' };

export type PersonId = number;

export interface Person {
  id: PersonId;
  name: string;
}
//TODO: Interface is ignored
export type PersonWithId = Person & { id: PersonId };

export interface Car {
  brand: 'Toyota' | 'Honda' | 'Ford';
  color: 'red' | 'blue' | 'black';
}
//TODO: Interface is ignored, Toyota and red should not be strings
export type RedToyota = Car & { brand: 'Toyota'; color: 'red' };

export interface City {
  name: string;
  population: number;
}

export enum CitySize {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large',
}
//TODO: isCitySize.Medium(value.size) should be value === CitySize.Medium
export type MediumCity = City | { size: CitySize.Medium };

