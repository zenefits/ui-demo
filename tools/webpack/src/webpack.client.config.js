/* eslint-env node */
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const rules = require('./rules');
// TODO: how this works
const packageJson = require(path.join(process.cwd(), '/package.json')); // eslint-disable-line import/no-dynamic-require

const ENV = process.env.NODE_ENV;
const IS_PROD = ENV === 'production';
const NO_MAPS = !!process.env.NO_MAPS;
const MOCK_MODE = IS_PROD ? null : process.env.MOCK_MODE;
const DIST_PATH = path.join(__dirname, '/dist');

module.exports = function getConfig(options) {
  const LOCALHOST = `http://localhost:${options.port}`;

  return {
    entry: {
      app: _.compact([
        IS_PROD && require.resolve('babel-polyfill'),
        !IS_PROD && 'react-hot-loader/patch',
        './src/index',
        !IS_PROD && require.resolve(`webpack-hot-middleware/client`),
      ]),
    },
    output: {
      path: DIST_PATH,
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      publicPath: IS_PROD ? 'app/{appName}/' : `${LOCALHOST}/`,
    },
    devtool: NO_MAPS ? false : 'source-map',
    // devtool: NO_MAPS ? false : 'cheap-module-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    target: 'web',
    module: {
      rules: _.compact([
        // {
        //   test: /\.graphql$/,
        //   exclude: /node_modules/,
        //   use: ['graphql-tag/loader'],
        // },
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
              },
            },
          ],
          exclude: [/node_modules/],
        },
        rules.getTypescriptRule(),
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: { prefix: '/assets/', limit: 1000 },
            },
          ],
        },
        rules.getFontsRule(),
      ]),
    },
    devServer: {
      historyApiFallback: true,
      proxy: [
        {
          context: ['/session_**', '/api/**', '/custom_api/**', '/accounts/**'],
          target: process.env.BASEURL || 'http://127.0.0.1:8000', // proxy uwsgi by default
        },
      ],
    },
    plugins: _.compact([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../index.html'),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 3,
        // minChunks(module) {
        //   return (
        //     module.context &&
        //     (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('bower_components') !== -1)
        //   );
        // },
      }),

      // new webpack.HotModuleReplacementPlugin()
      !IS_PROD && new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(ENV),
        APP_NAME: JSON.stringify(packageJson.name),
        APP_VERSION: JSON.stringify(packageJson.version),
        __CLIENT__: true,
        __DEVELOPMENT__: !IS_PROD,
        __MOCK_MODE__: MOCK_MODE === 'true',
      }),

      IS_PROD && new CleanWebpackPlugin([DIST_PATH]),

      IS_PROD &&
        new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false,
        }),

      IS_PROD &&
        new UglifyJSPlugin({
          sourceMap: true,
        }),
    ]),
  };
};
