// @ts-check

const path = require('path');

const run = () => {
  require(path.join(__dirname, '../../../../src/scripts/checkIfUsingYarn')); // eslint-disable-line
};

module.exports = {
  name: 'checkIfUsingYarn',
  info: 'Check if we use yarn for installing dependencies',
  run,
};
