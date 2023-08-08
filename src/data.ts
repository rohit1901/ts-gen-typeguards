export interface Point {
  x?: number;
  y: number;
}
export interface Person {
  name?: string;
  optionalReferenceType?: Point;
  optionalLiteralType?: 3;
  literalType: 2;
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
