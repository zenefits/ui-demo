#!/usr/bin/env node

// @ts-check

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const path = require('path');
const getCommands = require('./src/getCommands');

const args = process.argv.slice(2);
const scriptNameArg = args[0];
const currentPath = process.cwd();
const pkgJson = require(path.join(currentPath, 'package.json')); // eslint-disable-line import/no-dynamic-require
const currentPackageName = pkgJson.name;
const isApp = /\/(apps|native-apps)\/[^/]+$/.test(currentPath);

// TODO: add the scripts as commands to commander
program.version('0.1.0').parse(process.argv);

const availableScriptsList = getCommands()
  .filter(script => !(script.appsOnly && !isApp))
  .filter(script => !(script.packageWhitelist && !script.packageWhitelist.includes(currentPackageName)));

function runScript(name) {
  const script = availableScriptsList.find(scriptObject => scriptObject.name === name);
  if (!script) {
    throw new Error(
      `Unknown script "${name || ''}". Available scripts: ${availableScriptsList.map(s => s.name).join(', ')}`,
    );
  }

  script.run(...args.slice(1));
}

function promptAndRun() {
  // if script name is not provided, show a list of available scripts to user to choose
  // TODO: show the scripts that are not available to run in this folder
  const choices = availableScriptsList.map(({ name: scriptName, info }) => ({
    value: scriptName,
    name: chalk` {green.bold ${scriptName}} ${info}`,
    short: scriptName,
  }));

  inquirer
    .prompt([
      {
        type: 'list',
        pageSize: 140,
        name: 'script',
        message: 'Select a script to run',
        choices,
      },
    ])
    .then(inqResults => {
      const resultScriptName = inqResults.script;
      console.log(`running "${resultScriptName}"...\n`);
      runScript(resultScriptName);
    });
}

if (scriptNameArg) {
  runScript(scriptNameArg);
} else {
  promptAndRun();
}
