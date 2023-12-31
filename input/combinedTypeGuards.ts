// Generated using ts-gen-typeguards
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
export type OptionalUser<T> = {
    k?: ShapeGeneric;
    name?: string;
    nested?: {
        nestedName?: Container<T>;
    }
    nestedArray?: ShapeGeneric[];
    nestedArrayKeyword?: string[];
}

export interface AddressInterface {
    street: string;
    city: string;
}

export interface PersonInterface {
    name: string;
    age: number;
    address?: AddressInterface;
}

export interface EmployeeInterface extends PersonInterface {
    jobTitle: string;
}

export interface CircleInterface {
    type: 'circle';
    radius: number;
}

export interface SquareInterface {
    type: 'square';
    sideLength: number;
}

export interface TriangleInterface {
    type: 'triangle';
    base: number;
    height: number;
}

export type CustomShapeInterface = CircleInterface | SquareInterface | TriangleInterface;

export interface CarInterface {
    brand: string;
    model: string;
}

export interface ElectricCarInterface extends CarInterface {
    batteryCapacity: number;
}

export interface SportsCarInterface extends CarInterface {
    topSpeed: number;
}

export interface AnimalInterface {
    name: string;
    makeSound(): void;
}

export interface DogInterface extends AnimalInterface {
    breed: string;
}

export interface CatInterface extends AnimalInterface {
    color: string;
}

export interface CalculatorInterface {
    add(x: number, y: number): number;
    subtract(x: number, y: number): number;
}

export interface DictionaryInterface {
    [key: string]: string;
}

export interface PersonWithOptionalAddressInterface {
    name: string;
    age: number;
    address?: string;
}

export enum MediaTypeInterface {
    Image = 'image',
    Video = 'video',
}

export interface ImageInterface {
    type: MediaTypeInterface.Image;
    url: string;
}

export interface VideoInterface {
    type: MediaTypeInterface.Video;
    source: string;
}

export type MediaInterface = ImageInterface | VideoInterface;

// Combining string literals
export type DirectionType = 'up' | 'down' | 'left' | 'right';

// Combining number literals
export type EvenNumbersType = 2 | 4 | 6 | 8 | 10;

// Combining boolean literals
export type BooleanStatesType = true | false;

// Combining string and number literals
export type StatusCodeType = 200 | 400 | 404 | 500;

// Combining different types of literals
export type StatusType = 'success' | 'error' | 404 | 500 | true;

// Combining string literals with template literals
export type GreetingType = 'Hello, ' | 'Hi, ' | `Hey${' there'}`;

// Combining string literals with number literals
export type NumberStringComboType = 'one' | 2 | 'three' | 4 | 'five';

// Combining string literals with boolean literals
export type GreetingFlagType = 'Hello' | 'Hi' | 'Hey' | false;

// Combining literal type with union of types
export type LiteralOrUnionType = 'option1' | number | boolean;

// any type
export type AnyType = any;
// unknown type
export type UnknownType = unknown;

// Combination of any and unknown types as a union
export type AnyUnknownUnionType = any | unknown;
// Combination of any and unknown types as an intersection
export type AnyUnknownIntersectionType = any & unknown;

// Combination of any and unknown types with other types as a union
export type AnyUnknownUnionWithOthersType = any | unknown | string | number | boolean;

// Combinaion of any and unknown types with other types as an intersection
export type AnyUnknownIntersectionWithOthersType = any & unknown & string & number & boolean;

export type IntersectionTest = {a: string} & {a: number, b: number};
export interface AddressOptional {
    street: any;
    city: string;
    postalCodeOptional?: string;
}

export interface ContactOptional {
    email: string;
    phone: string;
    faxOptional?: string;
}

export type PersonOptional = {
    name: string;
    age: number;
    address: AddressOptional;
    contact: ContactOptional;
};

export type EmployeeOptional = {
    jobTitle: string;
    department: string;
    supervisorOptional?: EmployeeOptional;
} & PersonOptional;

export type ProjectOptional = {
    projectTitle: string;
    startDate: string;
    endDateOptional?: string;
};

export type CompanyOptional = {
    companyName: any;
    companyUnknown?: unknown;
    address: AddressOptional;
    contact: ContactOptional;
    employees?: EmployeeOptional[];
    projects: ProjectOptional[];
};

//Type Aliases with Optional and Nested Properties:
export type AddressType = {
  street: string;
  city: string;
};

export type PersonType = {
  name: string;
  age: number;
  address?: AddressType;
};

export type EmployeeType = {
  jobTitle: string;
} & PersonType;

//Union Types
export type NumberOrStringType = number | string;

export type ResultType = 'success' | 'error' | 'pending';

export type PaymentMethodType = 'creditCard' | 'paypal' | 'bitcoin';

//Intersection Types:
export type CarType = {
  brand: string;
  model: string;
};

export type ElectricCarType = {
  batteryCapacity: number;
} & CarType;

export type SportsCar = {
  topSpeed: number;
} & CarType;

//Union of Literal Types, Enums, and Type Aliases
export type PaymentType = {
  method: PaymentMethodType;
  amount: number;
};

export type TransactionStatus = ResultType | 'canceled';

export type ProductType = {
  name: string;
  price: number;
  color: ColorTypeAliasType;
};

//Intersection of Enums and Type Aliases

export type CarDetailsType = CarType & {
  color: ColorTypeAliasType;
};
export type DataType = {
  kind: 'number' | 'string' | 'object';
  value: number | string | object;
};

export type VehicleType = CarType | ElectricCarType | SportsCar;

export enum ColorTypeAliasType {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}

export enum MediaTypeType {
  Image = 'image',
  Video = 'video',
}

export enum ImageTypeType {
  JPEG = 'jpeg',
  PNG = 'png',
}

export enum VideoType {
  MP4 = 'mp4',
  AVI = 'avi',
}


export type ActionType = {
  type: 'add' | 'remove';
};

export type TargetType = 'user' | 'item' | 'group';

export type AddAction = ActionType & {
  type: 'add';
  target: TargetType;
};

export type RemoveAction = ActionType & {
  type: 'remove';
  target: TargetType;
};

export type ShapeType = {
  type: 'circle' | 'square' | 'triangle';
};

export type CircleType = ShapeType & {
  radius: number;
};

export type SquareType = ShapeType & {
  sideLength: number;
};

export type TriangleType = ShapeType & {
  base: number;
  height: number;
};

export type CustomShapeType = CircleType | SquareType | TriangleType;