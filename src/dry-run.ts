import {tsGenTypeguards} from './';

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
`;
// Usage Examples
tsGenTypeguards();
// tsGenTypeguards(undefined, 'inputNew', 'outputNew');
// tsGenTypeguards(undefined, 'inputNew');
// tsGenTypeguards(undefined, undefined, 'outputNew');
// tsGenTypeguards(LiteralTypeGeneric);
