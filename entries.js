// 打包入口，执行单入口打包时取第一个
const entriesArr = [
  { entryName: 'main', entry: `src/main.js` },
  { entryName: 'watermark', entry: `src/watermark.js` },
  { entryName: 'freeze', entry: `src/freeze.js` }
];

module.exports = {
  entriesArr
}
