const path = require('path');
const zFrontendConfig = require('./jest.config')();

// remove setupFiles and setupTestFrameworkScriptFile because they are for web projects
// TODO: later move this into tools/jest and require here as `require('z-frontend-jest/native')()`
delete zFrontendConfig.setupTestFrameworkScriptFile;
delete zFrontendConfig.setupFiles;

module.exports = function() {
  return Object.assign({}, zFrontendConfig, {
    preset: 'react-native',
    // rootDir needs to point to repo root because `react-native` preset uses <rootDir> to locate
    // lots of dependencies https://github.com/facebook/react-native/blob/master/jest-preset.json
    rootDir: '../../',

    // need to match only tests under current package, because rootDir now points to z-frontend root
    // and jest will try to find tests in whole repo
    testRegex: `${process.cwd()}/.+(/__tests__/.*|\\.(test|spec))\\.(js|ts|tsx)$`,

    // use transformIgnorePatterns from https://github.com/facebook/react-native/blob/master/jest-preset.json
    // and add z-* packages + native-navigation, since they are in ts/es6 and need to be transformed
    transformIgnorePatterns: [
      'node_modules\\/(?!(jest-)?react-native|react-clone-referenced-element|z-|native-navigation)',
    ],

    globals: Object.assign({}, zFrontendConfig.globals, {
      __ANDROID__: false,
      __IOS__: true,
      __NATIVE__: true,
      __EXPO__: false,
      // use react-native preset for all TS files, including other z-* packages
      'ts-jest': {
        useBabelrc: false,
        babelConfig: {
          presets: ['react-native'],
        },
      },
    }),

    // ignore expo-wrapper
    modulePathIgnorePatterns: [
      '<rootDir>/apps-native/expo-wrapper/',
      '<rootDir>/node_modules/[^\\/]+/node_modules/react-native/',
    ],

    transform: {
      // use custom babel transformer, that uses calls babel-jest with react-native preset instead of .babelrc files
      '^.+\\.graphql$': path.join(__dirname, 'transformers/nativeGraphqlTransformer.js'),
      '^.+\\.(js|jsx)$': path.join(__dirname, 'transformers/nativeBabelTransformer.js'),
      '^.+\\.(ts|tsx)$': 'ts-jest/dist/preprocessor.js',
    },
    notify: false,
  });
};
