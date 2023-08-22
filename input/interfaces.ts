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

type CustomShapeInterface = CircleInterface | SquareInterface | TriangleInterface;

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
