/* eslint-disable import/no-extraneous-dependencies */
const baseConfig = require('z-frontend-jest')({
  root: __dirname,
});

module.exports = Object.assign(baseConfig, {
  // ignore tests for react native components
  testPathIgnorePatterns: baseConfig.testPathIgnorePatterns.concat(['/src/native/']),
});
