// @ts-check
/* eslint-env node */

const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const NameAllModulesPlugin = require('name-all-modules-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');

const GqlGenWebpackPlugin = require('z-frontend-yp-schema/gqlGenWebpackPlugin');
const csp = require('z-frontend-csp');

const localSettings = require('../../../src/scripts/localSettings');
const rules = require('./rules');
const plugins = require('./plugins');
const getAppName = require('./getAppName');
const getAppVersion = require('./getAppVersion');
const AnalyticsPlugin = require('./analyticsPlugin');

const ENV = process.env.NODE_ENV || 'development';
const IS_PROD = ENV === 'production';
const NO_MAPS = !!process.env.NO_MAPS;
const appName = getAppName();
const appVersion = getAppVersion();
const DIST_PATH = path.join(process.cwd(), `/dist`);
module.exports = function getConfig(options = {}) {
  const { disableYpSchema = false, contentSecurityPolicy = null } = options;

  return {
    mode: IS_PROD ? 'production' : 'development',
    entry: _.pickBy(
      {
        'browser-check': require.resolve('./unsupportedBrowser'),
        app: _.compact([
          !IS_PROD && 'react-hot-loader/patch',
          './src/index',
          !IS_PROD && `${require.resolve(`webpack-hot-middleware/client`)}?path=/app/${appName}/__webpack_hmr`,
        ]),
        'babel-polyfill': require.resolve('@babel/polyfill'),
        'vendor-static': _.compact([require.resolve('url-search-params-polyfill'), 'react', 'lodash']),
      },
      _.identity,
    ),
    output: {
      path: DIST_PATH,
      // NOTE: chunkhash is used for better caching. More info on https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31
      // and https://webpack.js.org/guides/caching/
      filename: `[name].${IS_PROD ? '[chunkhash]' : 'chunkhash-will-be-here'}.js`,
      chunkFilename: '[name].bundle-[chunkhash].js',
      publicPath: `/app/${appName}/`,
      jsonpFunction: `${appName}WebpackJsonp`,
    },
    devtool: NO_MAPS ? false : 'source-map',
    // devtool: NO_MAPS ? false : 'cheap-module-source-map',
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        // avoid default of signature_pad.m.js https://github.com/szimek/signature_pad/issues/389
        signature_pad: path.resolve(__dirname, '../../../node_modules/signature_pad/dist/signature_pad.js'),
        // this is .d.ts file, they are ignored by babel, but we are re-exporting types from it, and webpack/jest
        // get confused by export from non-existing (or empty) file
        './wizardGraphqlTypes': path.resolve(__dirname, 'emptyModule.js'),
      },
    },
    target: 'web',
    module: {
      rules: _.compact([
        rules.getMjsRule(),
        {
          test: /\.(ts|tsx|js|jsx)$/,
          use: [
            {
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: path.join(__dirname, '../../../node_modules/.cache/babel-loader'),
              },
            },
          ],
          exclude: [/node_modules\//],
        },
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
        rules.getCssRule(),
        rules.getCoveoSvgRule(),
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader',
        },
        rules.getImageRule(),
      ]),
    },
    optimization: {
      minimize: IS_PROD,
      minimizer: [
        new UglifyJSPlugin({
          sourceMap: true,
          cache: path.join(__dirname, '../../../node_modules/.cache/uglifyjs-webpack-plugin'),
        }),
      ],
      splitChunks: {
        cacheGroups: {
          default: false,
          'vendor-static': {
            test: 'vendor-static',
            name: 'vendor-static',
            chunks: 'initial',
            minSize: 1,
          },

          // TODO: remove entry 'vendor-static', load babel-polyfill somehow differently
          // commons: {
          //   test: /node_modules/,
          //   name: 'vendor-static',
          //   chunks: 'initial',
          //   minSize: 1,
          // },
        },
      },

      runtimeChunk: {
        name: 'manifest',
      },
    },
    performance: IS_PROD && {
      hints: 'warning',
      maxEntrypointSize: 4000000, // 4MB
      maxAssetSize: 4000000,
      assetFilter(assetFilename) {
        return assetFilename.endsWith('.js');
      },
    },
    plugins: _.compact([
      !disableYpSchema && new GqlGenWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
      !IS_PROD && new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../index.html'),
        chunks: ['manifest', 'browser-check', 'vendor-static', 'babel-polyfill', 'app'],
        chunksSortMode: 'manual',
        filename: 'index.html',
        appVersion,
        contentSecurityPolicy: csp.processCspParam(contentSecurityPolicy),
      }),
      new CopyWebpackPlugin([{ from: path.join(__dirname, './unsupportedBrowser/unsupported.html') }]),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor-static',
      //   // NOTE: we avoid to accidentally share common chunks
      //   minChunks: Infinity,
      //   // minChunks(module) {
      //   //   return (
      //   //     module.context &&
      //   //     (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('bower_components') !== -1)
      //   //   );
      //   // },
      // }),
      // NOTE: we need the manifest chunk to avoid invalidating vendor by not including
      // the webpack manifest info there that includes dep information related to app bundles
      // new webpack.optimize.CommonsChunkPlugin({
      //   // NOTE: 'manifest' isn't present in entries, so this is a catch-all (things that aren't common and not explicitly specified)
      //   name: 'manifest',
      // }),

      // new webpack.HashedModuleIdsPlugin(), // NOTE: let's not use it since NamedModulesPlugin results in better paths and friendlier gzipped than this
      new webpack.NamedModulesPlugin(),
      // new webpack.NamedChunksPlugin(chunk => {
      //   if (chunk.name) {
      //     return chunk.name;
      //   }
      //   // Needed for async modules
      //   return chunk.modules.map(m => path.relative(m.context, m.request)).join('_');
      // }),
      new NameAllModulesPlugin(),

      // prevent autorequiring moment locales
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      plugins.createDefinePlugin(),

      // TODO: should we consider leaving fingerprinted assets?
      IS_PROD && new CleanWebpackPlugin([DIST_PATH], { allowExternal: true }),

      plugins.createWarningFilterPlugin(),

      !IS_PROD && !localSettings.disableWebpackNotifications && new WebpackNotifierPlugin({ excludeWarnings: true }),
      !IS_PROD &&
        !localSettings.disableWebpackNotifications &&
        new ForkTsCheckerNotifierWebpackPlugin({ excludeWarnings: true }),

      new AnalyticsPlugin(),
    ]),
  };
};
