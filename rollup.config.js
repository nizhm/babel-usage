const RollupPluginClear = require('rollup-plugin-clear');
const RollupPluginTerser = require('rollup-plugin-terser');
const RollupPluginNodeResolve = require('@rollup/plugin-node-resolve');
const RollupPluginCommonjs = require('@rollup/plugin-commonjs');
const RollupPluginBabel = require('@rollup/plugin-babel');

module.exports = {
  input: 'src/watermark.js',
  output: [
    {
      file: 'dist/watermark.umd.js',
      format: 'umd',
      name: 'watermark' // global value for iife/umd
    },
    {
      file: 'dist/watermark.umd.min.js',
      format: 'umd',
      name: 'watermark', // global value for iife/umd
      sourcemap: true,
      plugins: [RollupPluginTerser.terser()]
    },
    {
      file: 'dist/watermark.esm.js',
      format: 'es'
    },
    {
      file: 'dist/watermark.esm.min.js',
      format: 'es',
      sourcemap: true,
      plugins: [RollupPluginTerser.terser()]
    },
    {
      file: 'dist/watermark.common.js',
      format: 'cjs'
    },
    {
      file: 'dist/watermark.common.min.js',
      format: 'cjs',
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
