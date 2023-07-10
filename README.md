# ts-gen-typeguards
A ts lib to generate typeguards

**1. generateTypeGuardsFromFile(filePath: string): void**

This method generates type guards for interfaces and types found in a file specified by the `filePath` parameter. It searches for interface and type declarations in the file content and generates type guards for each one. The generated type guards can be written to files, printed to the console, or further processed as needed.

**Usage:**
```typescript
generateTypeGuardsFromFile(filePath: string): void
```

**Parameters:**
- `filePath` (string): The path to the file containing interface and type declarations.

**2. extractNestedInterfaces(typeValue: any): { typeName: string; typeValue: any }[]**

This method extracts nested interfaces/types from a given `typeValue`. It recursively traverses the type value and identifies nested interfaces/types with a 'type' property. It returns an array of objects, where each object contains the nested interface/type name (`typeName`) and its value (`typeValue`).

**Usage:**
```typescript
extractNestedInterfaces(typeValue: any): { typeName: string; typeValue: any }[]
```

**Parameters:**
- `typeValue` (any): The value of the interface/type to extract nested interfaces/types from.

**Returns:**
- An array of objects, where each object represents a nested interface/type with `typeName` and `typeValue`.

**3. generateUnionTypeGuards(typeName: string, unionTypeMatches: RegExpMatchArray): string**

This method generates type guards for union types based on the provided `typeName` and `unionTypeMatches`. It iterates over the matches and generates conditional checks to ensure the object satisfies each type in the union.

**Usage:**
```typescript
generateUnionTypeGuards(typeName: string, unionTypeMatches: RegExpMatchArray): string
```

**Parameters:**
- `typeName` (string): The name of the interface/type that has a union type.
- `unionTypeMatches` (RegExpMatchArray): An array of matches representing the union types.

**Returns:**
- The generated type guard code as a string.

**4. generateIntersectionTypeGuards(typeName: string, intersectionTypeMatches: RegExpMatchArray): string**

This method generates type guards for intersection types based on the provided `typeName` and `intersectionTypeMatches`. It iterates over the matches and generates conditional checks using `instanceof` to ensure the object satisfies each type in the intersection.

**Usage:**
```typescript
generateIntersectionTypeGuards(typeName: string, intersectionTypeMatches: RegExpMatchArray): string
```

**Parameters:**
- `typeName` (string): The name of the interface/type that has an intersection type.
- `intersectionTypeMatches` (RegExpMatchArray): An array of matches representing the intersection types.

**Returns:**
- The generated type guard code as a string.

**5. getTypeValueFromName(typeName: string): any**

This method retrieves the value associated with a given `typeName`. The implementation may vary depending on your project structure and requirements. It could use a type value mapping or TypeScript compiler API to fetch the type value.

**Usage:**
```typescript
getTypeValueFromName(typeName: string): any
```

**Parameters:**
- `typeName` (string): The name of the interface/type to retrieve the value for.

**Returns:**
- The value associated with the `typeName`.

**6. generateTypeGuardCode(typeName: string, typeValue: any): string**

This method generates the type guard code for a given `typeName` and `typeValue`. It handles different cases based on the type value, such as array types, object types, literal types, and more. You can customize the logic inside this method to meet your project's specific requirements.

**Usage:**
```typescript
generateTypeGuardCode(typeName: string, typeValue: any): string
```

**Parameters:**
- `typeName` (string): The name of the interface/type to generate the type guard code for.
- `typeValue` (any): The value of the interface/type to generate the type guard code for.

**Returns:**
- The generated type guard code as a string.

Please note that the provided usage instructions assume you have the necessary imports and dependencies set up in your project. Adjust the implementation details, function signatures, and usage instructions as needed to align with your project's conventions.

Let me know if there's anything else I can assist you with!
