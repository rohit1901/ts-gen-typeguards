export interface Point {
  required: string;
  optional?: string;
  unknownOptional?: unknown;
  anyOptional?: any;
  unknownRequired: unknown;
  anyRequired: any;
}
export interface Person {
  name?: string;
  optionalReferenceType?: Point;
  optionalLiteralType?: 3;
  optionalIntersectionReferenceType?: Point & City;
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
export interface City {
  name?: string;
  literalType?: '2';
  typeLiteralType?: {
    x: MediumCity;
  };
  population: number;
}
export interface Coordinates {
  latitude: number;
  longitude: number;
}
export interface Direction {
  north: 'North';
  south: 'South';
  east: 'East';
  west: 'West';
}
export interface Move {
  direction: Direction | 'up' | 'down' | 'left' | 'right';
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

export type UnionTypeArrayType = string[] | number[];
export type IntersectionTypeArrayType = bigint[] & number[];

export type InterfaceWithIntersectionArrays = {
  requiredTypeLiteralProp: {
    prop: IntersectionTypeArrayType[];
  };
  requiredKeywordProp: InterfaceWithOptionalArrays[];
  optionalProp?: {
    requiredSubProp: UnionTypeArrayType[];
    optionalSubProp?: UnionTypeArrayType[];
    optionalUnion?: IntersectionTypeArrayType;
    optionalUnionArray?: IntersectionTypeArrayType[];
  };
};
export type AnyType = any;
export type UnknownType = unknown;
export type EmployeeOrHR = Employee | { department: 'HR' };

export type PersonId = number;

export type PersonWithId = Person & { id: PersonId };

export type MonthOrUndefined = Month | undefined;

export type ElectronicProduct = Product & { category: Category.Electronics };
export type NumberOrZero = 1 | 2 | 3 | 4 | 0;
export type RedToyota = Car & { brand: 'Toyota'; color: 'red' };
export type MediumCity = City | { size: CitySize.Medium };

export type ActiveUser = Status &
  User &
  MediumCity &
  ElectronicProduct &
  NumberOrZero;

export type PrimitiveTypes = string | number | bigint | null | any | undefined;
export type EvenNumbers = 2 & 4 & 6 & 8;
export type EvenNumberStrings = '2' & '4' & '6' & '8';
export type EvenNumberStringsCombi = '2' & 4 & '6' & 8;

export type FruitAndAnimal = Fruit & Animal;

export type PointAndName = Point & { name: string };

export type Gender = 'male' | 'female' | 'other';
export type RedCircle = Color.Red & { shape: 'circle' };
export type ColorOrString = Color | 'yellow';
export type RedOrBlue = Color.Red | Color.Blue;
export type WorkingDay = Day & { isWorking?: boolean };
export type NestedType = {
  person: {
    id?: PersonId;
    color: Color.Blue;
    green?: Color.Green;
  };
};
export type PointType = {
  required: string;
  optional?: string;
  typeLiteralRequired: {
    x: number;
  };
  typeLiteralOptional?: {
    y: number;
    literalTypeRequired: '2';
  };
};
export type LiteralType = 2 & 3;
export type LiteralTypeObject = {
  literalTypeRequired: '2';
  typeLiteralRequired: {
    typeLiteralNestedRequired: {
      x: number;
      y: 2;
      z: 'z';
    };
  };
};
export type LiteralTypeObjectOptional = {
  typeLiteralOptional?: {
    typeLiteralNestedOptional?: {
      x?: number;
      y: LiteralType;
      z: 'z';
    };
    typeLiteralNestedRequired: {
      x?: number;
      y?: LiteralType;
    };
  };
};

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
export interface InterfaceWithOptionalArrays {
  requiredTypeLiteralProp: {
    prop: bigint[];
  };
  requiredKeywordProp: string[];
  optionalProp?: {
    requiredSubProp: number[];
    optionalSubProp?: number[];
    optionalUnion?: UnionTypeArrayType;
  };
}
