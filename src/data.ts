export interface Person {
    intersectionLiteralType?: string & bigint;
    unionLiteralType?: string | number;
    intersectionReferenceType?: string & Point;
    unionReferenceType?: string | Point;
    literalType: number;
    referenceType: Point;
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
//TODO: add checks for Parenthesis types
/*
export type PersonType = {
  name: string & number;
  extra: string | number;
};
//TODO: fix generator for & in types. Does not generate !value.hasOwnProperty('name') for 'extra' property
export type Address = {
  street: string;
} & PersonType;
export type Point2 = {
  x: number;
  y: number;
  z?: Point;
} & Point;
export type Point3 = {
  z?: number;
  m?: string & Point;
} & Point &
  Point2;

/!*
export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
//TODO: add support for | in types
// | Point | boolean | null | undefined*!/
export type someType = "a" | null | undefined | boolean | number | string;
*/
