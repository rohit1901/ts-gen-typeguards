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