const { rollup } = require('rollup');
const { output, plugins } = require('./rollup.config');
const { entriesArr } = require('./entries');

/**
 * impossible to disable Rollup code-splitting
 * @see https://github.com/rollup/rollup/issues/2756
 * 
 * rollup API
 * @see https://rollupjs.org/javascript-api/#rollup-rollup
 */

// 去掉自动清空dist目录
const pluginsOptions = plugins.filter(item => item.name !== 'clear');

async function build() {
  
  // 入口列表转rollup的input格式
  const singleEntryArr = entriesArr.map(item => ({ [item.entryName]: item.entry }));
  
  for await (const entry of singleEntryArr) {
    const inputOptions = { input: entry, plugins: pluginsOptions };
    
    
    let bundle;
    let buildFailed = false;
    try {
      bundle = await rollup(inputOptions);
      
      for (const outputOption of output) {
        const outputOpt = { ...outputOption };
        
        // 设置一下iife、umd的全局变量名
        if (['iife', 'umd'].includes(outputOpt.format)) {
          outputOpt.name = Object.keys(entry)[0];
        }
        
        await bundle.write(outputOpt);
      }
    } catch (error) {
      buildFailed = true;
      console.error(error);
    }
    if (bundle) {
      await bundle.close();
    }
  }
}

build();
