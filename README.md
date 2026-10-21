# ts-gen-typeguards

![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square)
[![npm](https://img.shields.io/npm/v/ts-gen-typeguards)](https://www.npmjs.com/package/ts-gen-typeguards)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Generate runtime type guards from TypeScript interfaces, type aliases, and enums.

## Installation

```bash
npm install ts-gen-typeguards
```

## Recommended API

Use `generateTypeGuards()` for new integrations. It uses the TypeScript compiler, follows imports across project files, and returns diagnostics for unsupported constructs.

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

By default, generated source is returned in memory. Set `emit: true` to write `outputPath`.

### Example

Given:

```ts
export interface Address {
  street: string;
  city: string;
}

export interface User {
  id: number;
  email?: string;
  address: Address;
  roles: Array<'admin' | 'user'>;
}
```

The generator emits composable guards including `isAddress()` and `isUser()`. The generated `isUser()` validates required properties, permits an absent optional `email`, validates the nested `Address`, and checks every element of `roles`.

## Supported constructs

- Primitives: `string`, `number`, `boolean`, `bigint`, `symbol`, `unknown`, `any`, `never`, `object`, `null`, and `undefined`.
- String, numeric, boolean, and null literal types.
- Arrays, fixed-length tuples, unions, intersections, object literals, interfaces, type aliases, enums, and type references.
- Optional properties.
- Interface inheritance with `extends`.
- `Date` and `RegExp` references.

## Unsupported constructs

The generator reports an error rather than emitting an unsound guard for:

- Generic declarations and generic type references.
- Conditional, mapped, indexed-access, template-literal, function, and constructor types.
- Computed property names.
- Tuples with optional or rest elements.
- Unresolved type references.

See [docs/compiler-generator.md](docs/compiler-generator.md) for implementation details.

## Legacy API

The original API remains available for backward compatibility:

```ts
import { tsGenTypeguards } from 'ts-gen-typeguards';

tsGenTypeguards();
tsGenTypeguards(undefined, 'inputNew', 'outputNew');
tsGenTypeguards('export interface User { name: string; age: number; }');
```

Prefer `generateTypeGuards()` for new code. The legacy API writes generated files and has less robust handling of imports and unsupported TypeScript constructs.

## Development

```bash
npm install
npm run lint
npm test
npm run build
```

After changing dependencies, regenerate the lockfile locally with:

```bash
npm install
```

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

MIT — see [LICENSE](LICENSE).
