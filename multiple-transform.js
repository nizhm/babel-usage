const { rollup } = require('rollup');
const { output, plugins } = require('./rollup.config');

/**
 * impossible to disable Rollup code-splitting
 * @see https://github.com/rollup/rollup/issues/2756
 * 
 * rollup API
 * @see https://rollupjs.org/javascript-api/#rollup-rollup
 */

// 多入口
const entries = {
  watermark: `src/watermark.js`,
  main: `src/main.js`,
  freeze: `src/freeze.js`
};

// 去掉自动清空dist目录
const pluginsOptions = plugins.filter(item => item.name !== 'clear');

// 复用output
const outputOptions = output;

build();

async function build() {
  
  const entryArr = Object.entries(entries).map(item => ({ [item[0]]: item[1] }));
  
  for await (const entry of entryArr) {
    const inputOptions = { input: entry, plugins: pluginsOptions };
    
    
    let bundle;
    let buildFailed = false;
    try {
      bundle = await rollup(inputOptions);
      
      for (const outputOption of outputOptions) { await bundle.write(outputOption); }
    } catch (error) {
      buildFailed = true;
      console.error(error);
    }
    if (bundle) {
      await bundle.close();
    }
  }
}
