module.exports = {
  // sourceMaps: true,
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          edge: "17",
          firefox: "60",
          chrome: "67",
          safari: "11.1",
          ie: "8"
        },
        useBuiltIns: "usage",
        corejs: "2.6.12" // 要对应@babel/polyfill中的core-js版本，否则bundle中的引入路径可能不对
      }
    ]
  ]
}
