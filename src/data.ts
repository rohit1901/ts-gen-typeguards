export interface Person {
    name: string;
    age: number;
    p: Point;
    e: Color
}
export interface Person2 extends Person {
    address: string;
}

export type Point = {
    x: number;
    y: number;
}
export type Point2 = {
    z: number;
    m: Point;
} & Point;

export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
//TODO: add support for | in types
export type someType = 'a' | Point | boolean | null | undefined;
export type Test<T> = T extends string ? string : number;