#!/usr/bin/env node

const checkDependencies = require('../../../src/scripts/checkDependencies');
const webpackCommands = require('../src/webpack');

const procArgs = process.argv.slice(2);
const command = procArgs[0] || 'start';

if (command !== 'build') {
  checkDependencies();
}

(async () => {
  let outputPath;
  try {
    outputPath = await webpackCommands[command]();
  } catch (e) {
    console.log('\n', e, '\n');
    process.exit(1);
  }

  if (outputPath) {
    console.log(`\nSuccessfully built at ${outputPath}\n`);
  }
})();
