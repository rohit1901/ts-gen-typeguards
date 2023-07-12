interface Person {
    name: string;
    age: number;
    p: Point
}

type Point = {
    x: number;
    y: number;
};

enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
}
