const path = require('path');

const packageJson = require(path.join(process.cwd(), '/package.json')); // eslint-disable-line import/no-dynamic-require
const appName = packageJson.name.replace('z-frontend-', '');

module.exports = function getAppName() {
  return appName;
};
