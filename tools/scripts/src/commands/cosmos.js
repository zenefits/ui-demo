// @ts-check

const { spawn } = require('child_process');
const path = require('path');

const run = (...args) => {
  const cosmosPath = path.dirname(require.resolve('react-cosmos/package.json'));
  const cosmosBinPath = path.join(cosmosPath, 'bin', 'cosmos.js');
  const cosmosConfigPath = require.resolve('z-frontend-cosmos/cosmos.config');

  // "../../node_modules/.bin/cosmos --config ../../tools/cosmos/cosmos.config.js"
  const pr = spawn(cosmosBinPath, ['--config', cosmosConfigPath].concat(args), {
    stdio: 'inherit',
  });

  pr.on('exit', code => {
    process.exit(code);
  });
};

module.exports = {
  name: 'cosmos',
  info: 'Equivalent to `../../node_modules/.bin/cosmos --config ../../tools/cosmos/cosmos.config.js`',
  run,
};
