#!/usr/bin/env node

// @ts-check
'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const spawnSync = require('child_process').spawnSync;
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');

const args = process.argv.slice(2);
const script = args[0];
const currentPath = process.cwd();
const pkgJson = require(path.join(currentPath, 'package.json'));
const currentPackageName = pkgJson.name;
const isApp = /\/(apps|apps-native)\/[^\/]+$/.test(currentPath);

const fullScriptsList = [
  {
    name: 'syncSchema',
    info: 'download schema from your local server and generate TS types for schema',
    appsOnly: true,
  },
  { name: 'rnPreBundle', info: '', packageWhitelist: ['z-frontend-talent-native'] },
  { name: 'rnProcessEnvVars', info: '', packageWhitelist: ['z-frontend-talent-native'] },
  {
    name: 'generateAppTypes',
    info: 'generate TS types for queries, mutations and fragments in current app',
    appsOnly: true,
  },
  {
    name: 'tslintPackage',
    info: 'run tslint only for current package files (exclude dpendencies)',
  },
  {
    name: 'newApp',
    info: 'Creates a new app',
  },
];

// TODO: add the scripts as commands to commander
program.version('0.1.0').parse(process.argv);

const availableScriptsList = fullScriptsList
  .filter(script => !(script.appsOnly && !isApp))
  .filter(script => !(script.packageWhitelist && !script.packageWhitelist.includes(currentPackageName)));

if (script) {
  // if script name is provided, check if it's correct and run it
  const scriptNames = availableScriptsList.map(s => s.name);
  if (!scriptNames.includes(script)) {
    throw new Error(`Unknown script "${script || ''}". Available scripts: ${scriptNames.join(', ')}`);
  }

  runScript(script);
} else {
  // if script name is not provided, show a list of available scripts to user to choose
  (async function() {
    // TODO: show the scripts that are not available to run in this folder
    const choices = availableScriptsList.map(({ name: scriptName, info }) => ({
      value: scriptName,
      name: chalk` {green.bold ${scriptName}} ${info}`,
      short: scriptName,
    }));

    const inqResults = await inquirer.prompt([
      {
        type: 'list',
        pageSize: 140,
        name: 'script',
        message: 'Select a script to run',
        choices,
      },
    ]);

    const resultScriptName = inqResults.script;
    console.log(`running "${resultScriptName}"...\n`);
    runScript(resultScriptName);
  })();
}

function runScript(scriptName) {
  const scriptArgs = args.slice(1);

  const result = spawnSync('node', [require.resolve('./src/' + scriptName)].concat(scriptArgs), { stdio: 'inherit' });

  if (result.signal) {
    if (result.signal === 'SIGKILL') {
      console.log(
        'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.',
      );
    } else if (result.signal === 'SIGTERM') {
      console.log(
        'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.',
      );
    }
    process.exit(1);
  }

  process.exit(result.status);
}
