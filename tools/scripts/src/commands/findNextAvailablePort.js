const { getAppPorts } = require('../getAllPackages');

const run = () => {
  const max = Math.max(...getAppPorts().map(app => app.port)) + 1;
  console.log(`Next available port number: ${max}`);
};

module.exports = {
  name: 'findNextAvailablePort',
  info: 'Finds next available port number',
  run,
};
