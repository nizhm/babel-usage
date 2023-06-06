const RollupPluginClear = require('rollup-plugin-clear');
const RollupPluginTerser = require('rollup-plugin-terser');
const RollupPluginNodeResolve = require('@rollup/plugin-node-resolve');
const RollupPluginCommonjs = require('@rollup/plugin-commonjs');
const RollupPluginBabel = require('@rollup/plugin-babel');

module.exports = {
  input: {
    watermark: `src/watermark.js`
    // main: `src/main.js`
  },
  output: ['es', 'cjs', 'amd', 'umd', 'iife'].reduce(
    (pre, format) => {
      const outputArr = [
        {
          dir: `dist`,
          entryFileNames: '[name]/[name].[format].js',
          chunkFileNames: '[name].[format].js',
          format
        },
        {
          dir: `dist`,
          entryFileNames: '[name]/[name].[format].min.js',
          chunkFileNames: '[name].[format].min.js',
          format,
          sourcemap: true,
          plugins: [RollupPluginTerser.terser()]
        }
      
      ];
      
      // global value for iife/umd
      if (['iife', 'umd'].includes(format)) {
        outputArr.forEach(item => item['name'] = format);
      }
      
      pre.push(...outputArr);
      
      return pre;
    },
    []
  ),
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
