import { tsGenTypeguards } from './';

const QualifiedNameGeneric = `
export interface Container<T, K> {
    value: T;
};
export enum ColorEnumGeneric {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE',
}

export type ColorContainer<T extends ColorEnumGeneric> = Container<T>;

export type RedContainer = ColorContainer<ColorEnumGeneric.Red>;
export type ContainerOfString = Container<string>;
export type ContainerOfNumber = Container<number>;
`;
const LiteralTypeGeneric = `
export enum ColorEnumGeneric {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE',
}
export interface ShapeGeneric {
    type: 'circle' | 'square' | 'triangle';
}

export type ShapeWithProperty<T extends ShapeGeneric> = T & { color: ColorEnumGeneric };

export type ColoredCircle = ShapeWithProperty<{ type: 'circle'; radius: number } & {}>;
export type Literals = 'circle' | 'square' | 'triangle';
`;
const IntersectionType = `
export interface A<T> {
    a: T;
    d: {
        e: {
            f: string;
            g: 'g';
        }
    };
    h: string;
}
export interface B<T> {
    b: string;
    a: T;
    d: {
        e: {
            f: string;
            g: 'g';
        }
    };
    h: string;
}
export interface C<T> {
    a: T;
    d: {
        e: {
            f: string;
            g: 'g';
        }
    };
    h: string;
}
export type T<T> = A & B & C;
export type Intersection1<T> = A & B & C & {h: string;};
export type Intersection2<T> = A & B & C & {
        e: {
            f: string;
        }
    };
`;
// Usage Examples
tsGenTypeguards();
// tsGenTypeguards(undefined, 'inputNew', 'outputNew');
// tsGenTypeguards(undefined, 'inputNew');
// tsGenTypeguards(undefined, undefined, 'outputNew');
// tsGenTypeguards(QualifiedNameGeneric);
// tsGenTypeguards(LiteralTypeGeneric);
