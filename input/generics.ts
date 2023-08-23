// Generic interface
export interface Container<T> {
    value: T;
}
export type ContainerOfString = Container<string>;
export type ContainerOfNumber = Container<number>;

// Generic type from enum
export enum ColorEnumGeneric {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE',
}

export type ColorContainer<T extends ColorEnumGeneric> = Container<T>;

export type RedContainer = ColorContainer<ColorEnumGeneric.Red>;
export type GreenContainer = ColorContainer<ColorEnumGeneric.Green>;
export type BlueContainer = ColorContainer<ColorEnumGeneric.Blue>;

// Generic interface with optional property
export interface PropertyContainer<T> {
    value: T;
    additionalValue?: T;
}

// Derived types with optional property
export type OptionalContainerOfString = PropertyContainer<string>;
export type OptionalContainerOfNumber = PropertyContainer<number>;

// Generic type from union of literals
export type DirectionGeneric = 'up' | 'down' | 'left' | 'right';

export type DirectionContainer<T extends DirectionGeneric> = Container<T>;

export type UpDirectionContainer = DirectionContainer<'up'>;
export type DownDirectionContainer = DirectionContainer<'down'>;

// Generic type with intersection
export interface ShapeGeneric {
    type: 'circle' | 'square' | 'triangle';
}

export type ShapeWithProperty<T extends ShapeGeneric> = T & { color: ColorEnumGeneric };

export type ColoredCircle = ShapeWithProperty<{ type: 'circle'; radius: number }>;
export type ColoredSquare = ShapeWithProperty<{ type: 'square'; sideLength: number }>;

// Generic type with intersection from enum
export enum VehicleTypeGeneric {
    Car = 'CAR',
    Bike = 'BIKE',
}

export type VehicleWithType<T extends VehicleTypeGeneric> = { type: T; brand: string; model: string };

export type CarWithInfo = VehicleWithType<VehicleTypeGeneric.Car>;
export type BikeWithInfo = VehicleWithType<VehicleTypeGeneric.Bike>;
