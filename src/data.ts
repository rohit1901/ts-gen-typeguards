export interface Person {
    name: string;
    age: number;
    p: Point;
    e: Color
}

export type Point = {
    x: number;
    y: number;
}

export enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
