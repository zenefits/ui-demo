const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack.config');
const getProjectConfig = require('./getProjectConfig');

// NOTE: needs to be CommonJS since this is loaded before preprocessors
// Other files work fine with ES Modules, but not this one
module.exports = (on, config) => {
  on('file:preprocessor', webpackPreprocessor({ webpackOptions }));
  return getProjectConfig(config);
};
