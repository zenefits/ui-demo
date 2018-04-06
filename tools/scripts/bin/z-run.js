#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const file = process.argv[1];
const command = process.argv[2];
const commandArgs = process.argv.slice(3);

if (command) {
  const commandPath = path.join(fs.realpathSync(file), `../../node_modules/.bin/${command}`);
  if (fs.existsSync(commandPath)) {
    exec(`${commandPath} ${commandArgs.join(' ')}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`Command ${command} failed with output:\n${stderr || stdout}.`);
        process.exit(1);
      } else {
        console.log(stdout);
        process.exit(0);
      }
    });
  } else {
    console.log(`Command ${commandPath} not found.`);
    process.exit(1);
  }
} else {
  console.log(`You must supply a command name to z-run: \neg. z-run nsp`);
}
