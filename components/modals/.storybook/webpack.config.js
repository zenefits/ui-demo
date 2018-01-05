const rules = require('z-frontend-webpack/src/rules');
const plugins = require('z-frontend-webpack/src/plugins');

const isDev = true;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [rules.getTypescriptRule(isDev), rules.getFontsRule(), rules.getCssRule()],
  },
  plugins: [plugins.createDefinePlugin()],
};
