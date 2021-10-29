/* eslint-disable node/no-unsupported-features/es-syntax */
import ts from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [
      ts({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
        },
      }),
      babel({
        extensions: ['.ts'],
        include: 'src/**/*.ts',
        babelHelpers: 'runtime',
        presets: [['@babel/preset-env', { targets: ['android >= 5'] }]],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      commonjs(),
      nodeResolve(),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
    },
    plugins: [
      commonjs(),
      nodeResolve(),
      ts({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
        },
      }),
      babel({
        extensions: ['.ts'],
        include: 'src/**/*.ts',
        babelHelpers: 'runtime',
        presets: [['@babel/preset-env', { targets: ['android >= 5'] }]],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      name: 'imageOrientation',
      file: 'lib/index.js',
      format: 'iife',
    },
    plugins: [
      ts(),
      babel({
        extensions: ['.ts'],
        include: 'src/**/*.ts',
        babelHelpers: 'runtime',
        presets: [['@babel/preset-env', { targets: ['android >= 5'] }]],
        plugins: ['@babel/plugin-transform-runtime'],
      }),
      terser(),
      commonjs(),
      nodeResolve(),
    ],
  },
];
