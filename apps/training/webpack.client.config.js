const { getBaseConfig } = require('z-frontend-webpack'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function getConfig(options = {}) {
  return getBaseConfig({ ...options, disableYpSchema: true });
};
