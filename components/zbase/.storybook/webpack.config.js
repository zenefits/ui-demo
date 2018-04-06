const rules = require('z-frontend-webpack/src/rules');
const plugins = require('z-frontend-webpack/src/plugins');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [rules.getTypescriptRule(), rules.getFontsRule(), rules.getCssRule()],
  },
  plugins: [plugins.createDefinePlugin()],
};
