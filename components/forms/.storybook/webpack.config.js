const webpack = require('webpack');
const rules = require('z-frontend-webpack/src/rules');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [rules.getTypescriptRule(), rules.getFontsRule()],
  },
  plugins: [
    new webpack.DefinePlugin({
      __MOCK_MODE__: true,
    }),
  ],
};
