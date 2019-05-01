const path = require('path');

const packageJson = require(path.join(process.cwd(), '/package.json')); // eslint-disable-line import/no-dynamic-require

module.exports = function getIframeRouterConfig() {
  return packageJson.useIframeRouter;
};
