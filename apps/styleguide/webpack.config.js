const path = require('path');
const rules = require('z-frontend-webpack/src/rules');
const plugins = require('z-frontend-webpack/src/plugins');

const isDev = true;

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'rsg-components/Wrapper': path.join(__dirname, 'src/Wrapper'),
    },
  },
  module: {
    rules: [rules.getTypescriptRule(isDev), rules.getFontsRule(), rules.getCssRule()],
  },
  plugins: [plugins.createDefinePlugin()],
};
