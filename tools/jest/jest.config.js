require('../../src/scripts/checkDependencies')();
const path = require('path');
const resolve = require('resolve');

// Set default node.js timezone
process.env.TZ = 'UTC';

module.exports = function getJestConfig(options = {}) {
  const { throwOnConsoleError = true, root } = options;

  if (!root) {
    throw new Error(`"root" is not passed to getJestConfig`);
  }

  const setupFiles = [
    path.join(__dirname, './shim.js'),
    path.join(__dirname, './enzymeSetup.js'),
    path.join(__dirname, './requireContextSupport.js'),
  ];

  if (throwOnConsoleError) {
    setupFiles.push(path.join(__dirname, './throwOnConsoleError.js'));
  }

  return {
    setupFiles,
    snapshotSerializers: ['enzyme-to-json/serializer'],
    // setupTestFrameworkScriptFile: resolve.sync('jest-enzyme', { basedir: root }),
    setupTestFrameworkScriptFile: resolve.sync('./jest-styled-components.js'),
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': resolve.sync('babel-jest', { basedir: root }),
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': require.resolve(
        './__mocks__/fileMock.js',
      ),
      // this is .d.ts file, they are ignored by babel, but we are re-exporting types from it, and webpack/jest
      // get confused by export from non-existing (or empty) file
      '\\./wizardGraphqlTypes$': require.resolve('./__mocks__/fileMock.js'),
    },
    transformIgnorePatterns: ['node_modules/(?!z-|zbase|iframe-router)'],
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/cypress/', '__snapshots__'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    testEnvironment: 'jest-environment-jsdom-thirteen',
    globals: {
      __APP_NAME__: 'test-app-stub',
      __APP_VERSION__: '0.0.1-test',
      __CLIENT__: false,
      __DEVELOPMENT__: true,
      // Tests always use mocks. We may add a way to override this later
      // for other types of tests.
      __MOCK_MODE__: true,
      __NATIVE__: false,
      __ANDROID__: false,
      __IOS__: false,
      __TEST__: true,
      __IS_STORYBOOK__: false,
    },
    cacheDirectory: path.join(__dirname, '../../node_modules/.cache/jest'),
  };
};
