const path = require('path');
const rules = require('z-frontend-webpack/src/rules');
const plugins = require('z-frontend-webpack/src/plugins');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'rsg-components/Wrapper': path.join(__dirname, 'src/Wrapper'),
      // this is .d.ts file, they are ignored by babel, but we are re-exporting types from it, and webpack/jest
      // get confused by export from non-existing (or empty) file
      './wizardGraphqlTypes': require.resolve('z-frontend-webpack/src/emptyModule.js'),
    },
  },
  module: {
    rules: [
      rules.getMjsRule(),
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
      rules.getFontsRule(),
      rules.getCssRule(),
      {
        test: /src\/images\/(.*)/,
        exclude: [/node_modules\//],
        use: [
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    // TODO: make sure OPEN_NETWORK is opt-in. styleguidist is making it the default
    // useLocalIp: process.env.OPEN_NETWORK || false,
    // host: process.env.OPEN_NETWORK ? '0.0.0.0' : '127.0.0.1',
    proxy: {
      '/static': 'http://localhost:6004',
      '/app/stories': {
        target: 'http://localhost:6004',
        pathRewrite: { '^/app/stories': '' },
      },
    },
  },
  plugins: [plugins.createDefinePlugin(), plugins.createWarningFilterPlugin()],
};
