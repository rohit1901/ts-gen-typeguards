import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as ts from 'typescript';

import { generateTypeGuards } from '../compiler';

const sourceTypes = `
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

export type Status = 'active' | 'inactive';

export enum Color {
  Red = 'red',
  Green = 'green',
}
`;

function createTemporaryProject(): string {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-gen-typeguards-'));
  fs.writeFileSync(path.join(directory, 'types.ts'), sourceTypes, 'utf8');
  return directory;
}

function compileAndLoad(directory: string, generated: string) {
  const typesJs = path.join(directory, 'types.js');
  const guardsJs = path.join(directory, 'typeGuards.js');

  fs.writeFileSync(
    typesJs,
    ts.transpileModule(sourceTypes, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText,
    'utf8',
  );

  fs.writeFileSync(
    guardsJs,
    ts.transpileModule(generated, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText,
    'utf8',
  );

  return require(guardsJs);
}

describe('Compiler API type guard generator', () => {
  it('generates executable guards without modifying the input directory', () => {
    const directory = createTemporaryProject();
    const outputPath = path.join(directory, 'typeGuards.ts');

    const result = generateTypeGuards({
      entrypoints: [path.join(directory, 'types.ts')],
      outputPath,
      emit: false,
    });

    expect(result.emitted).toBe(false);
    expect(result.diagnostics).toEqual([]);
    expect(fs.existsSync(path.join(directory, 'combinedTypeGuards.ts'))).toBe(false);
    expect(result.files[0].content).toContain('export function isUser');
    expect(result.files[0].content).toContain("typeof value['id'] === 'number'");
    expect(result.files[0].content).toContain("isAddress(value['address'])");
  });

  it('emits guards that accept valid values and reject invalid values', () => {
    const directory = createTemporaryProject();
    const outputPath = path.join(directory, 'typeGuards.ts');

    const result = generateTypeGuards({
      entrypoints: [path.join(directory, 'types.ts')],
      outputPath,
      emit: false,
    });

    expect(result.diagnostics).toEqual([]);

    const guards = compileAndLoad(directory, result.files[0].content);

    expect(
      guards.isUser({
        id: 1,
        address: { street: 'Main Street', city: 'Frankfurt' },
        roles: ['admin', 'user'],
      }),
    ).toBe(true);

    expect(
      guards.isUser({
        id: '1',
        address: { street: 'Main Street', city: 'Frankfurt' },
        roles: ['admin'],
      }),
    ).toBe(false);

    expect(
      guards.isUser({
        id: 1,
        address: { street: 'Main Street' },
        roles: ['admin'],
      }),
    ).toBe(false);

    expect(guards.isStatus('active')).toBe(true);
    expect(guards.isStatus('archived')).toBe(false);
    expect(guards.isColor('red')).toBe(true);
    expect(guards.isColor('blue')).toBe(false);
  });

  it('reports unsupported constructs instead of emitting an unsound guard', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'ts-gen-typeguards-'));
    const sourcePath = path.join(directory, 'unsupported.ts');

    fs.writeFileSync(
      sourcePath,
      'export type Conditional = string extends string ? string : never;\n',
      'utf8',
    );

    const result = generateTypeGuards({
      entrypoints: [sourcePath],
      outputPath: path.join(directory, 'typeGuards.ts'),
      emit: false,
    });

    expect(result.diagnostics).toHaveLength(1);
    expect(result.diagnostics[0].severity).toBe('error');
    expect(result.diagnostics[0].message).toContain('not supported');
  });
});
