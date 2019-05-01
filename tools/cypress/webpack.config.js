const path = require('path');
const rules = require('z-frontend-webpack/src/rules');
const plugins = require('z-frontend-webpack/src/plugins');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      rules.getMjsRule(),
      rules.getFontsRule(),
      rules.getImageRule(),
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: path.join(__dirname, '../../node_modules/.cache/babel-loader'),
            },
          },
        ],
        exclude: [/node_modules\//],
      },
    ],
  },
  plugins: [plugins.createDefinePlugin()],
};
