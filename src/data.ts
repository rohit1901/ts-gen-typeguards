export interface Person {
    name: string;
    age: number;
    p: Point;
    e: Color
}
//NOTE: Works for extends in interfaces
export interface Person2 extends Person {
    address: string;
}

export type Point = {
    x: number;
    y: number;
}
//TODO: Add support for & in types
/*export type Point2 = {
    z: number;
} & Point;*/
export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
//TODO: add support for | in types
//export type someType = "a" | "b" | "c";