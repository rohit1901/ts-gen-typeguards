# ts-gen-typeguards

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A TypeScript project that provides utility functions to generate type guards for interfaces, type aliases, and enums.

## Description

The Type Guard Generator is a TypeScript project that provides utility functions to generate type guards for interfaces, type aliases, and enums. It enables runtime type checking for objects based on their defined types.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rohit1901/type-guard-generator.git
```

2. Install the dependencies:

```bash
npm install
```

## Usage

The main functionality of the Type Guard Generator is located in the `readObjects` function, which reads a TypeScript file and extracts interfaces, type aliases, and enums from it.

```typescript
import { readObjects } from "./ts-gen-typeguards";

const { interfaces, types, enums } = readObjects("./data.ts");

interfaces.forEach((interfaceNode) => {
  // Generate type guards for interfaces
});

types.forEach((typeNode) => {
  // Generate type guards for type aliases
});

enums.forEach((enumNode) => {
  // Generate type guards for enums
});
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

In summary, the functions are designed to handle a wide range of type combinations and generate accurate type guards to validate data at runtime. The utility aims to provide comprehensive type safety for your TypeScript code by ensuring that the runtime data adheres to the defined TypeScript types.
To generate type guards for interfaces, type aliases, and enums, you can utilize the provided functions `generateTypeGuards`, `generateTypeTypeGuards`, and `generateEnumTypeGuard`, respectively.

## Coming soon: 
- Support for generating type guards for conditional types.
- Support for generating type guards for generic types.
- Support for generating type guards for Indexed Access types.
- Support for generating type guards for imported Interfaces/Types/Enums.
- Support for generating type guards for classes.
- Support for generating type guards for Mapped Types.
- Support for generating type guards for Readonly Properties.
- Support for generating type guards for Function Signatures.
- Support for generating type guards for Optional Chaining and Nullish Coalescing.
- Support for generating type guards for Any and Unknown Types.
- Support for generating type guards for Type Assertions.
- CLI to generate type guards for a given TypeScript file.
- Linting and formatting the generated type guards using ESLint and Prettier.
## API Reference

### readObjects(path: string): ObjectsType

This function reads a TypeScript file at the specified path and returns an object containing the extracted interfaces, type aliases, and enums.

### generateTypeGuards(interfaceNode: InterfaceDeclaration): string

Generates type guards for the given interface declaration. It returns the generated type guard code as a string.

### generateTypeTypeGuards(typeNode: TypeAliasDeclaration): string

Generates type guards for the given type alias declaration. It returns the generated type guard code as a string.

### generateEnumTypeGuard(typeNode: EnumDeclaration): string

Generates type guards for the given enum declaration. It returns the generated type guard code as a string.

## Examples

```typescript
import { generateTypeGuards } from "./type-guard-generator";

const interfaceNode = /* interface declaration */;
const typeGuardCode = generateTypeGuards(interfaceNode);
console.log(typeGuardCode);
```

The above code generates type guards for the provided interface declaration and logs the generated code to the console.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the [GitHub repository](https://github.com/rohit1901/type-guard-generator).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).