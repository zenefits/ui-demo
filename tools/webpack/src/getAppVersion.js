const GitRevisionPlugin = require('git-revision-webpack-plugin');
const path = require('path');

const packageJson = require(path.join(process.cwd(), '/package.json')); // eslint-disable-line import/no-dynamic-require

const gitRevisionPlugin = new GitRevisionPlugin();

module.exports = function getAppVersion() {
  return `${packageJson.version}.${gitRevisionPlugin.version()}`;
};
