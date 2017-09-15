const path = require('path');
const resolve = require('resolve');

module.exports = function() {
  return {
    setupTestFrameworkScriptFile: resolve.sync('jest-enzyme', { basedir: process.cwd() }),
    transform: {
      '.(ts|tsx)': path.join(
        resolve.sync('ts-jest', { basedir: process.cwd() }).split('ts-jest')[0],
        'ts-jest/preprocessor.js',
      ),
    },
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': require.resolve(
        './__mocks__/fileMock.js',
      ),
    },
    transformIgnorePatterns: ['node_modules/(?!z-)'],
    mapCoverage: true,
    collectCoverage: false,
    collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!**/node_modules/**', '!**/vendor/**'],
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    notify: true,
    globals: {
      'ts-jest': {
        useBabelrc: true,
      },
      __MOCK_MODE__: true,
    },
  };
};
