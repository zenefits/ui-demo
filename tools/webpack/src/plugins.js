const webpack = require('webpack');
const getAppName = require('./getAppName');
const getAppVersion = require('./getAppVersion');

const ENV = process.env.NODE_ENV || 'development';
const IS_PROD = ENV === 'production';
const MOCK_MODE = IS_PROD ? false : process.env.MOCK_MODE;

exports.createDefinePlugin = function createDefinePlugin() {
  return new webpack.DefinePlugin({
    // WARN: If you update these, make sure you update components/types/global-types/index.ts
    // NOTE: we use stringify here to make sure strings are quoted since webpack does a direct replacement
    // e.g. APP_NAME should be replaced as the string 'talent' not the expression talent
    'process.env.NODE_ENV': JSON.stringify(ENV),
    __APP_NAME__: JSON.stringify(getAppName()),
    // TODO: only use __APP_VERSION__ from index.html to avoid invalidating assets on each build
    __APP_VERSION__: JSON.stringify(getAppVersion()),
    __CLIENT__: true,
    __DEVELOPMENT__: !IS_PROD,
    __MOCK_MODE__: MOCK_MODE === 'true',
    __NATIVE__: false,
    __ANDROID__: false,
    __IOS__: false,
  });
};
