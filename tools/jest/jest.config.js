require('../../src/scripts/checkDependencies')();
const path = require('path');
const resolve = require('resolve');

module.exports = function getJestConfig({ throwOnConsoleError } = { throwOnConsoleError: false }) {
  const setupFiles = [path.join(__dirname, './shim.js'), path.join(__dirname, './enzymeSetup.js')];
  if (throwOnConsoleError) {
    setupFiles.push(path.join(__dirname, './throwOnConsoleError.js'));
  }
  return {
    setupFiles,
    setupTestFrameworkScriptFile: resolve.sync('jest-enzyme', { basedir: process.cwd() }),
    transform: {
      '^.+\\.(js|jsx)$': resolve.sync('babel-jest', { basedir: process.cwd() }), // this line need to be first, otherwise jest fails
      '^.+\\.(ts|tsx)$': path.join(
        resolve.sync('ts-jest', { basedir: process.cwd() }).split('ts-jest')[0],
        'ts-jest/preprocessor.js',
      ),
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': require.resolve(
        './__mocks__/fileMock.js',
      ),
    },
    transformIgnorePatterns: ['node_modules/(?!z-)'],
    mapCoverage: true,
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    notify: false,
    globals: {
      'ts-jest': {
        useBabelrc: true,
      },
      __CLIENT__: false,
      __DEVELOPMENT__: true,
      // Tests always use mocks. We may add a way to override this later
      // for other types of tests.
      __MOCK_MODE__: true,
      __ANDROID__: false,
      __IOS__: false,
      __NATIVE__: false,
    },
    cacheDirectory: './node_modules/.cache/jest',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
};
