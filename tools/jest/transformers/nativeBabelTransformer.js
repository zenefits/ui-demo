// @ts-check

// Use babel-jest transformer, but pass react-native preset and disable .babelrc files

const babelJestTransformer = require('babel-jest').createTransformer;

module.exports = babelJestTransformer({
  presets: ['react-native'],
  babelrc: false,
});
