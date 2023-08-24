// Numeric enum
export enum DirectionEnum {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}


// String enum
export enum ColorEnum {
    Red = 'RED',
    Green = 'GREEN',
    Blue = 'BLUE',
}

// Numeric and string enum values
export enum MixedValuesEnum {
    Zero = 0,
    One = 'ONE',
    Two = 2,
    Three = 'THREE',
}

// Computed enum values
export enum ComputedValuesEnum {
    Start = 1,
    Middle = Start + 3,
    End = Middle + 2,
}

// Heterogeneous enum (mix of numeric and string values)
export enum StatusEnum {
    Active = 1,
    Inactive = 'INACTIVE',
}

// Reverse-mapped enum
export enum TrafficLightEnum {
    Red = 0,
    Green = 1,
    Yellow = 2,
}

// Using enums in object properties
export interface CarEnum {
    make: string;
    model: string;
    color: ColorEnum;
}

export enum LogLevelEnum {
    Debug = 0,
    Info = 1,
    Error = 2,
}

// Using enum values as union
export type LogLevelUnionEnum = LogLevelEnum.Debug | LogLevelEnum.Info | LogLevelEnum.Error;

// Using enum values as intersection
export type LogLevelIntersectionEnum = LogLevelEnum & { Warning: 3 };
export interface VehicleEnum {
    type: 'CAR' | 'BIKE';
    direction: DirectionEnum;
}
export type ExtendedDirectionEnum = DirectionEnum & 'FORWARD' & 'BACKWARD';


