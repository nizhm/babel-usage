const RollupPluginClear = require('rollup-plugin-clear');
const RollupPluginTerser = require('rollup-plugin-terser');
const RollupPluginNodeResolve = require('@rollup/plugin-node-resolve');
const RollupPluginCommonjs = require('@rollup/plugin-commonjs');
const RollupPluginBabel = require('@rollup/plugin-babel');

module.exports = {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/main.js',
      format: 'cjs'
    },
    {
      file: 'dist/main.min.js',
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
