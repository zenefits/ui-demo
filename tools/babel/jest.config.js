const path = require('path');

module.exports = {
  testPathIgnorePatterns: ['/node_modules/', path.resolve(__dirname, 'test.js')],
};
