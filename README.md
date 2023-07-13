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

To generate type guards for interfaces, type aliases, and enums, you can utilize the provided functions `generateTypeGuards`, `generateTypeTypeGuards`, and `generateEnumTypeGuard`, respectively.

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