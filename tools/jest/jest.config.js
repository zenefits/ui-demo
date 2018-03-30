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
  const setupFiles = [path.join(__dirname, './shim.js'), path.join(__dirname, './enzymeSetup.js')];
  if (throwOnConsoleError) {
    setupFiles.push(path.join(__dirname, './throwOnConsoleError.js'));
  }
  return {
    setupFiles,
    setupTestFrameworkScriptFile: resolve.sync('jest-enzyme', { basedir: root }),
    transform: {
      '^.+\\.(js|jsx)$': resolve.sync('babel-jest', { basedir: root }), // this line need to be first, otherwise jest fails
      // replace a this file using custom transformer, since ts-jest does not properly support dynamic imports
      // https://github.com/kulshekhar/ts-jest/issues/258
      '/src/loadPolyfills.ts$': path.join(__dirname, 'transformers/polyfillLoaderTransformer.js'),
      '^.+\\.(ts|tsx)$': path.join(
        resolve.sync('ts-jest', { basedir: root }).split('ts-jest')[0],
        'ts-jest/preprocessor.js',
      ),
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$': require.resolve(
        './__mocks__/fileMock.js',
      ),
    },
    transformIgnorePatterns: ['node_modules/(?!z-|zbase|zen-js)'],
    mapCoverage: true,
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    notify: false,
    globals: {
      'ts-jest': {
        useBabelrc: true,
        tsConfigFile: root + '/tsconfig.json',
      },
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
    },
    cacheDirectory: './node_modules/.cache/jest',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  };
};
