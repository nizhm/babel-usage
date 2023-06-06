const RollupPluginClear = require('rollup-plugin-clear');
const RollupPluginTerser = require('rollup-plugin-terser');
const RollupPluginNodeResolve = require('@rollup/plugin-node-resolve');
const RollupPluginCommonjs = require('@rollup/plugin-commonjs');
const RollupPluginBabel = require('@rollup/plugin-babel');

// 入口文件名
const inputFileName = 'main';

module.exports = {
  input: `src/${inputFileName}.js`,
  output: [
    {
      file: `dist/${inputFileName}.esm.js`,
      format: 'es'
    },
    {
      file: `dist/${inputFileName}.esm.min.js`,
      format: 'es',
      sourcemap: true,
      plugins: [RollupPluginTerser.terser()]
    },
    {
      file: `dist/${inputFileName}.cmd.js`,
      format: 'cjs'
    },
    {
      file: `dist/${inputFileName}.cmd.min.js`,
      format: 'cjs',
      sourcemap: true,
      plugins: [RollupPluginTerser.terser()]
    },
    {
      file: `dist/${inputFileName}.amd.js`,
      format: 'amd'
    },
    {
      file: `dist/${inputFileName}.amd.min.js`,
      format: 'amd',
      sourcemap: true,
      plugins: [RollupPluginTerser.terser()]
    },
    {
      file: `dist/${inputFileName}.iife.js`,
      format: 'iife',
      name: inputFileName // global value for iife/umd
    },
    {
      file: `dist/${inputFileName}.iife.min.js`,
      format: 'iife',
      name: inputFileName, // global value for iife/umd
      sourcemap: true,
      plugins: [RollupPluginTerser.terser()]
    },
    {
      file: `dist/${inputFileName}.umd.js`,
      format: 'umd',
      name: inputFileName // global value for iife/umd
    },
    {
      file: `dist/${inputFileName}.umd.min.js`,
      format: 'umd',
      name: inputFileName, // global value for iife/umd
      sourcemap: true,
      plugins: [RollupPluginTerser.terser()]
    }
  ],
  plugins: [
    RollupPluginClear({
      // required, point out which directories should be clear.
      targets: ['dist'],
      // optional, whether clear the directories when rollup recompile on --watch mode.
      watch: true, // default: false
    }),
    RollupPluginNodeResolve.nodeResolve(),
    RollupPluginCommonjs(),
    RollupPluginBabel.babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' })
  ]
}
