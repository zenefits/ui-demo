#!/usr/bin/env node
/* eslint-disable */

/**
 * Runs `nsp check` from old folders for all package.json files passed in
 */

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const filesList = process.argv.slice(2);

Promise.all(
  filesList.map(
    packageJsonPath =>
      new Promise((resolve, reject) => {
        exec(
          'z-run nsp check',
          { cwd: path.dirname(packageJsonPath) },
          (error, stdout) => (error ? reject(`nsp failed for ${packageJsonPath} with error: \n${stdout}`) : resolve()),
        );
      }),
  ),
).catch(e => {
  console.log(e);
  process.exit(1);
});
