# ts-gen-typeguards
![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)

[![npm](https://img.shields.io/npm/v/ts-gen-typeguards)](https://www.npmjs.com/package/ts-gen-typeguards)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build Status](https://github.com/rohit1901/ts-gen-typeguards/actions/workflows/ci.yml/badge.svg)

> A TypeScript project that provides utility functions to generate type guards for interfaces, type aliases, and enums.

## Description

The Type Guards Generator is a utility for automatically generating TypeScript type guards based on interfaces, types, and enums defined in your code. This tool simplifies the process of ensuring type safety and data validation in your TypeScript projects.

## Installation
```bash
npm install ts-gen-typeguards
```
### Usage

You can use the Type Guards Generator in various ways depending on your requirements. Here are a few usage examples:

1. Using default values:
   ```typescript
   tsGenTypeguards();
   ```

2. Using custom values for input and output paths:
   ```typescript
   tsGenTypeguards(undefined, 'inputNew', 'outputNew');
   ```

3. Using custom input and default output paths:
   ```typescript
   tsGenTypeguards(undefined, 'inputNew');
   ```

4. Using default input and custom output paths:
   ```typescript
   tsGenTypeguards(undefined, undefined, 'outputNew');
   ```

5. Using an input string and default output paths:
   ```typescript
   tsGenTypeguards('export interface User {name: string; age: number;}');
   ```

### Getting Started

To get started, follow these steps:

1. Install the Type Guards Generator as described in the **Installation** section.
2. Modify the generator's input files or provide input strings as needed.
3. Run your TypeScript code to generate type guards automatically.

For detailed information on how to use and customize the Type Guards Generator, refer to the code comments and documentation.
## Suppported combinations
The provided functions in the `typeGuardsGenerator` module support generating type guards for various combinations of TypeScript types, interfaces, and enums. Here's a summary of the supported combinations:

1. **Interfaces**:
    - Type guards can be generated for interfaces that contain property signatures with different data types (e.g., string, number, boolean, etc.).
    - Interfaces can include nested types like arrays, unions, intersections, and conditional types, and the type guards will handle them accordingly.

2. **Type Aliases**:
    - Type guards can be generated for type aliases with different data types.
    - Type aliases can include nested types like arrays, unions, intersections, and conditional types, and the type guards will handle them accordingly.

3. **Enums**:
    - Type guards can be generated for enums with string or numeric values.

4. **Union Types**:
    - The utility will correctly handle type guards for union types containing multiple data types (e.g., string | number | boolean).

5. **Intersection Types**:
    - The utility will correctly handle type guards for intersection types containing multiple interfaces or type aliases.

6. **Conditional Types**:
    - The utility will correctly handle type guards for conditional types, including the true and false branches.

7. **Literal Types**:
    - The utility will correctly handle type guards for literal types, such as string literals, numeric literals, boolean literals, null, and undefined.
8. **Optional Properties**:
    - The utility will correctly handle type guards for optional properties.
9. **Recursive Types**:
    - The utility will correctly handle type guards for recursive types.
10. **Readonly Properties**:
    - The utility will correctly handle type guards for ``readonly`` properties.
11. **Any and Unknown Types**:
    - The utility will correctly handle type guards for ``any`` and ``unknown`` types.
12. **Generic Types**:
    - The utility will correctly handle type guards for generic types as well as nested generic types as long as the generic type is not a conditional type.

In summary, the functions are designed to handle a wide range of type combinations and generate accurate type guards to validate data at runtime. The utility aims to provide comprehensive type safety for your TypeScript code by ensuring that the runtime data adheres to the defined TypeScript types.
To generate type guards for interfaces, type aliases, and enums, you can utilize the provided functions `generateTypeGuards`, `generateTypeTypeGuards`, and `generateEnumTypeGuard`, respectively.

## Coming soon: 
- Support for generating type guards for conditional types.
- Support for generating type guards for Indexed Access types.
- Support for generating type guards for imported Interfaces/Types/Enums.
- Support for generating type guards for classes.
- Support for generating type guards for Mapped Types.
- Support for generating type guards for Function Signatures.
- Support for generating type guards for Optional Chaining and Nullish Coalescing.
- Support for generating type guards for Type Assertions.
- CLI to generate type guards for a given TypeScript file.
## API Reference

This function takes a TypeNode representing an intersection type, the name of the type,
and an optional boolean flag to indicate if the type is a property. It generates and
returns an array of type guard code snippets for the provided intersection type.
### generateIntersectionTypeGuardForType({ type, name }: TypeAliasDeclaration, typeAliases: TypeAliasDeclaration[],)
Generate an intersection type guard for a given TypeScript type alias.
### generateKeywordGuard(type: TypeNode, typeName?: string, isProperty?: boolean,)
Generates type guards for the given TypeScript TypeNode, which can be a keyword or a literal Type.
If the property propertyName is not provided, the type looks as follows:
```
export type Person4 = number;
```
### generateLiteralTypeTypeGuard(literalType: Node)
Generates a type guard condition for a literal type node.
### generateOptionalPropertyTypeGuard(property: PropertySignature, parentName?: string,)
Generates Typeguards for an Optional property which could be of the following types:
- LiteralType
- TypeReference
- UnionType
- IntersectionType
- KeywordType
- ArrayType
- TupleType
- TypeLiteral
### generatePropertyGuard(property: TypeElement, parentName?: string,)
Function to generate a type guard for a TypeElement. Used to generate type guard string for properties.
A property (TypeElement) can be either a required or optional property.
A property could be a TypeLiteral, a TypeReference, an IntersectionType, or a UnionType.
If the property is optional, the type guard will be generated using the generateOptionalPropertyTypeGuard function.
If the property is required, the type guard will be generated using the generateTypeLiteralTypeGuard function.
### generateQualifiedNameTypeGuard(type: QualifiedName, typeName?: string,)
Function to generate a type guard for a QualifiedName.
A QualifiedName is used to represent a qualified name, e.g. `A.B` in the following code:
```
namespace A {
 export const B = 1;
 export const C = B;
 export const D = A.B;
 export const E = A.C;
 export const F = A.D;
 export const G = A.E;
 export const H = A.F;
 export const I = A.G;
 }
 ```
where `A.B` is a QualifiedName.
### generatePropertyTypeGuard({ questionToken, name, type }: PropertySignature, typeAliases: TypeAliasDeclaration[],)
Generates a type guard for a property based on its TypeScript PropertySignature.
### generateTypeReferenceGuard(type: TypeNode, typeName: string, isProperty?: boolean,)
Generates a type guard for a TypeReferenceNode. Used to generate type guard string for type aliases.
```
// For type alias `Person` with property `name`
const typeNode = factory.createTypeReferenceNode('Person', []);
const typeName = 'name';
const typeGuards = generateTypeReferenceGuard(typeNode, typeName, true);
// Result: ['isPerson(value.name)']
// For type alias `Point`
const typeNode = factory.createTypeReferenceNode('Point', []);
const typeName = 'point';
const typeGuards = generateTypeReferenceGuard(typeNode, typeName);
// Result: ['isPoint(value)']
```
### generateTypeTypeGuard(definitions: TypeAliasDeclaration[], enums: EnumDeclaration[],)
Generate a set of type guard functions based on provided TypeAliasDeclarations.
### generateUnionTypeGuard(type: TypeNode, typeName: string, isProperty?: boolean, definitions?: TypeAliasDeclaration[],)
Generates a type guard for a union type.
### generateUnionTypeGuardForIntersection({ type }: TypeAliasDeclaration, typeAliases: TypeAliasDeclaration[], name?: PropertyName,)
Generate a union type guard for a given TypeScript type alias.
### generateGenericPropertyGuard(property: TypeElement, parentName?: string,)
Generate a generic type guard for a given property.
```typescript
export function isType<T>(value: any, guard: (val: any) => val is T): value is Type<T>{return(typeof value === "object" && value !== null
&& guard(value));}
//for a property name
   property.hasOwnProperty('name') && guard(value.name)
//for a nested property name
   property.hasOwnProperty('name') && property.name.hasOwnProperty('nested') && guard(value.name.nested)
//for a type Type<T>
```
## Usage Examples

```typescript
import{ tsGenTypeguards } from 'ts-gen-typeguards/lib';
// Usage Examples
// using default values 
tsGenTypeguards();
// using custom values
tsGenTypeguards(undefined, 'inputNew', 'outputNew');
// using custom input and default output values
tsGenTypeguards(undefined, 'inputNew');
// using default input and custom output values 
tsGenTypeguards(undefined, undefined, 'outputNew');
// using custom input string and default output values
tsGenTypeguards('export interface User {name: string; age: number;}');
```

The above code generates type guards for the provided interface declaration and creates a file typeguards.ts with the generated code.

## Contributing

We welcome contributions from the community! If you'd like to contribute to `ts-gen-typeguards`, please take a moment to read the [Contributing Guidelines](CONTRIBUTING.md) to understand our development process and how to get started.

## Code of Conduct

Please review the [Code of Conduct](CODE_OF_CONDUCT.md) to understand the behavior we expect from our contributors.

## Changelog

For information about the latest changes and updates, refer to the [Changelog](CHANGELOG.md).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).