# Compiler API generator

The new generator is available from the package entry point:

```ts
import { generateTypeGuards } from 'ts-gen-typeguards';

const result = generateTypeGuards({
  entrypoints: ['src/types/index.ts'],
  outputPath: 'src/generated/typeGuards.ts',
  emit: true,
});

if (result.diagnostics.length > 0) {
  console.error(result.diagnostics);
}
```

## Behavior

- Uses a TypeScript `Program`, so it can follow imports across project files.
- Generates guards only for exported interfaces, type aliases, and enums in the supplied entrypoints, plus declarations reachable from them.
- Does not create or modify files in the input directory.
- Returns generated source in memory by default; set `emit: true` to write the output file.
- Reports unsupported constructs as diagnostics rather than silently generating an unsound guard.

## Supported constructs

- Primitive types: `string`, `number`, `boolean`, `bigint`, `symbol`, `unknown`, `any`, `never`, `object`, `null`, and `undefined`.
- String, numeric, boolean, and null literal types.
- Arrays, fixed-length tuples, unions, intersections, object literals, interfaces, type aliases, enums, and type references.
- Optional properties.
- Interface inheritance through `extends`.
- `Date` and `RegExp` references.

## Not yet supported

The generator intentionally fails with a diagnostic for constructs whose runtime validation cannot be derived safely from syntax alone, including:

- Generic declarations and generic type references.
- Conditional, mapped, indexed-access, template-literal, function, and constructor types.
- Computed property names.
- Tuples with optional or rest elements.
- Unresolved type references.

The legacy `tsGenTypeguards()` API remains exported for backward compatibility, but new integrations should use `generateTypeGuards()`.
