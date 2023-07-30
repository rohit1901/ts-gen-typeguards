/*export interface Person {
    name: string;
    age: number;
    p: Point;
    e: Color
}
export interface Person2 extends Person {
    address: string;
}*/
//TODO: add checks for Parenthesis types
export type Person = {
  name: string & number;
  extra: string | number;
};
//TODO: fix generator for & in types. Does not generate !value.hasOwnProperty('name') for 'extra' property
export type Address = {
  street: string;
} & Person;
export type Point = {
  x: number;
  y: number;
};
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

/*
export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
//TODO: add support for | in types
// | Point | boolean | null | undefined*/
export type someType = "a" | null | undefined | boolean | number | string;
