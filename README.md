# ts-gen-typeguards
![Typescript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build Status](https://github.com/rohit1901/ts-gen-typeguards/actions/workflows/ci.yml/badge.svg)
> A TypeScript project that provides utility functions to generate type guards for interfaces, type aliases, and enums.

## Description

The Type Guard generator is a TypeScript project that provides utility functions to generate type guards for interfaces, type aliases, and enums. It enables runtime type checking for objects based on their defined types.

## Installation
You could either
1. Clone the repository:

```bash
git clone https://github.com/rohit1901/type-guard-generator.git
```

2. Install the dependencies:

```bash
npm install
```
or
```bash
npm install ts-gen-typeguards
```
## Usage

The main functionality of the Type Guard Generator is located in the `tsGenTypeguards` function, which Generates type guards for the given input file path and writes them to the output file path (defaults to ``./out/typeGuards.ts``).

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
```
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

In summary, the functions are designed to handle a wide range of type combinations and generate accurate type guards to validate data at runtime. The utility aims to provide comprehensive type safety for your TypeScript code by ensuring that the runtime data adheres to the defined TypeScript types.
To generate type guards for interfaces, type aliases, and enums, you can utilize the provided functions `generateTypeGuards`, `generateTypeTypeGuards`, and `generateEnumTypeGuard`, respectively.

## Coming soon: 
- Support for generating type guards for conditional types.
- Support for generating type guards for generic types.
- Support for generating type guards for Indexed Access types.
- Support for generating type guards for imported Interfaces/Types/Enums.
- Support for generating type guards for classes.
- Support for generating type guards for Mapped Types.
- Support for generating type guards for Function Signatures.
- Support for generating type guards for Optional Chaining and Nullish Coalescing.
- Support for generating type guards for Type Assertions.
- CLI to generate type guards for a given TypeScript file.
## API Reference
### generateArrayTypeGuard(property: PropertySignature, propertyName?: string)
Generates a type guard string for an array type property. The type guard string checks if the property is an array
and if all the items in the array are of the same type. The type of the items in the array is determined by the
propertyType parameter. If the propertyType parameter is not provided, the type of the items in the array is
determined by the property.type.getText() method.
### generateEnumTypeGuard(enumDefinition: EnumDeclaration)
Generates a type guard for a single enum definition like:
```
export function isAnimal(value: any): value is Animal {
   return Object.values(Animal).includes(value);
}
```
### generateInterfaceTypeGuard(definitions: InterfaceDeclaration[])
Handles heritageClauses, interface properties to generate typeguards
### generateIntersectionTypeGuard(type: TypeNode, typeName: string, isProperty?: boolean,)
Generates a type guard for an IntersectionTypeNode.

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
## Examples

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
```

The above code generates type guards for the provided interface declaration and logs the generated code to the console.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/rohit1901/type-guard-generator).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).