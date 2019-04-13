const webpack = require('webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const getAppName = require('./getAppName');
const getAppVersion = require('./getAppVersion');

const ENV = process.env.NODE_ENV || 'development';
const IS_PROD = ENV === 'production';
const MOCK_MODE = !!process.env.MOCK_MODE;

// NOTE: avoid ES6 syntax like `...` because of when this file is loaded

exports.createDefinePlugin = function createDefinePlugin({ isStorybook = false, otherDefinitions = {} } = {}) {
  const definitions = Object.assign(
    {},
    {
      // WARN: If you update these, make sure you update components/types/global-types/index.ts
      // NOTE: we use stringify here to make sure strings are quoted since webpack does a direct replacement
      // e.g. APP_NAME should be replaced as the string 'talent' not the expression talent
      'process.env.NODE_ENV': JSON.stringify(ENV),
      __APP_NAME__: JSON.stringify(getAppName()),
      // TODO: only use __APP_VERSION__ from index.html to avoid invalidating assets on each build
      __APP_VERSION__: JSON.stringify(getAppVersion()),
      __CLIENT__: true,
      __DEVELOPMENT__: !IS_PROD,
      __MOCK_MODE__: MOCK_MODE,
      __NATIVE__: false,
      __ANDROID__: false,
      __IOS__: false,
      // Used in iframe-router-example
      __ROUTES_SET__: JSON.stringify(process.env.ROUTES_SET || ''),
      __TEST__: false,
      __IS_STORYBOOK__: isStorybook,
    },
    otherDefinitions,
  );
  return new webpack.DefinePlugin(definitions);
};

exports.createWarningFilterPlugin = function createWarningFilterPlugin() {
  // if types are exported, webpack fails to import them, since babel-typescript preset removes all type declarations
  return new FilterWarningsPlugin({
    exclude: /export '.+?'( \(reexported as '.+?'\))? was not found/,
  });
};
