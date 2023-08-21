/**
 * esbuild config
 * @type
 */
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: 'lib/index.js',
    target: 'es2016',
    sourcemap: true,
    minify: true,
    logLevel: 'info',
    metafile: true,
    format: 'cjs',
    plugins: [nodeExternalsPlugin()],
});