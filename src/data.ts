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
//TODO: Fix this. Literal types are getting ignored
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
