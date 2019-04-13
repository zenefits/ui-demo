const fs = require('fs');
const path = require('path');

const helpers = require('./styleguideHelpers');

console.time('buildComponentStatus');
// only way to know which packages are used in style guide is to parse styleguide.config
const configPath = path.resolve(__dirname, '../styleguide.config.js');
const config = fs.readFileSync(configPath).toString();
const matches = config
  .match(/getComponentPathsFromPackageIndex\((.*)\)/g)
  .map(match => match.replace(/getComponentPathsFromPackageIndex\('(.*)'\)/, '$1'));

matches.forEach(helpers.getComponentPathsFromPackageIndex);
console.timeEnd('buildComponentStatus');
