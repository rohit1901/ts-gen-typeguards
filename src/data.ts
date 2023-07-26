/*export interface Person {
    name: string;
    age: number;
    p: Point;
    e: Color
}
export interface Person2 extends Person {
    address: string;
}*/
export type Person = {
  name: string;
};
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
  z: number;
  m: Person & Address;
} & Point &
  Point2;

/*
export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}*/
//TODO: add support for | in types
// | Point | boolean | null | undefined
export type someType =
  | "a"
  | null
  | undefined
  | Point
  | boolean
  | number
  | string
  | Address
  | Point2
  | Point3
  | Person;
