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

