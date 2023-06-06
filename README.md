# babel-usage
Learn how to use babel

## @babel/
The scope which all babel modules land in 

## @babel/core
To run babel programmatically
```shell
npm install --save-dev @babel/core
```

## @babel/cli
To run babel from the terminal
```shell
npm install --save-dev @babel/core @babel/cli
```

## @babel/polyfill
Where includes core-js and regenerator runtime
```shell
npm install --save @babel/polyfill
```

### plugins
Transformation programs for babel to transform codes

### presets
Pre-determined set of plugins

### @babel/preset-env
A smart preset provided by Babel
```shell
npm install --save-dev @babel/preset-env
```

### Scripts
```shell
# transform arrow function only
npm run babel:arrow

# transform by preset-env(to show needed polyfills)
npm run babel

# transform by preset-env and bundle into single js file
npm run babel:rollup

# transform multiple entries by preset-env into bundles
npm run babel:rollup:multiple
```
