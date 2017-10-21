#!/usr/bin/env node

const checkDependencies = require('../../../src/scripts/checkDependencies');
const webpackCommands = require('../src/webpack');

const procArgs = process.argv.slice(2);
const command = procArgs[0] || 'start';

if (command !== 'build') {
  checkDependencies();
}

webpackCommands[command]();
