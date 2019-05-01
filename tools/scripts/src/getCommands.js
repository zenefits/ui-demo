const glob = require('glob');

function getCommands() {
  const pattern = './commands/*.js';
  const fileNames = glob.sync(pattern, { cwd: __dirname, absolute: true });
  return fileNames.map(require);
}

module.exports = getCommands;
