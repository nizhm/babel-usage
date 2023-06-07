const RollupPluginClear = require('rollup-plugin-clear');
const RollupPluginTerser = require('rollup-plugin-terser');
const RollupPluginNodeResolve = require('@rollup/plugin-node-resolve');
const RollupPluginCommonjs = require('@rollup/plugin-commonjs');
const RollupPluginBabel = require('@rollup/plugin-babel');

const entriesArr = [
  { entryName: 'watermark', entry: `src/watermark.js` },
  { entryName: 'main', entry: `src/main.js` }
];

// 取第一个作为入口
const singleEntry = entriesArr[0];

module.exports = {
  input: { [singleEntry.entryName]: singleEntry.entry },
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
        outputArr.forEach(item => item['name'] = singleEntry.entryName);
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
