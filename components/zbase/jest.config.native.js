/* eslint-disable import/no-extraneous-dependencies */
const baseConfig = require('z-frontend-jest/native')({
  root: __dirname,
});

module.exports = Object.assign(baseConfig, {
  // include only react native components tests
  testRegex: `${__dirname}/src/native/(__tests__/.*|.*?\\.(test|spec))\\.(ts|tsx|js|jsx)$`,
});
