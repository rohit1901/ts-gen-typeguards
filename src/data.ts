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
export type someType = "a" | null | undefined | boolean | number | string;
export type PersonType = {
  name: string & number;
  extra: string | number;
};
//TODO
//Intersection types
//Parenthesis types

export type AddressType = {
  street: string;
} & PersonType;
export type Point2Type = {
  x: number;
  y: number;
  z?: Point;
} & Point;
export type Point3Type = {
  z?: number;
  m?: string & Point;
} & number;

/*export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}*/
