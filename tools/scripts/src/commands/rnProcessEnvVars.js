// @ts-check

const fs = require('fs');
const path = require('path');
const replaceEnvVars = require('../utils/replaceEnvVars');
const { removeCommentLine } = require('../utils/removeCommentLine');
const setAppVersion = require('../utils/setAppVersion');

const packageJson = require(path.join(process.cwd(), 'package.json')); // eslint-disable-line import/no-dynamic-require

const run = () => {
  let src = fs.readFileSync(path.join(process.cwd(), 'globals.js')).toString();

  src = removeCommentLine(src);
  src = replaceEnvVars(src);
  src = setAppVersion(src, packageJson.version);

  fs.writeFileSync(path.join(process.cwd(), 'globals-processed.js'), src);
};

module.exports = {
  name: 'rnProcessEnvVars',
  info: '',
  packageWhitelist: ['z-frontend-talent-native'],
  run,
};
