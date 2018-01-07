#!/usr/bin/env node
/* eslint-disable */

/**
 * Runs `yarn run tslint --fix` for all passed files from closest folder containing package.json
 * Designed to be used with lint-staged in precommit hook
 */

const findUp = require('find-up');
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

const filesList = process.argv.slice(1).filter(f => f.match(/\.(ts|tsx)$/));

if (filesList.length === 0) {
  process.exit(0);
}

Promise.all(filesList.map(file => findUp('package.json', { cwd: path.dirname(file) })))
  .then(results => {
    const filesMap = {};
    results.forEach((packageJsonPath, i) => {
      if (!filesMap[packageJsonPath]) {
        filesMap[packageJsonPath] = [];
      }
      filesMap[packageJsonPath].push(filesList[i]);
    });

    const packagesWithTslint = Object.keys(filesMap)
      .map(packageJsonPath => ({
        path: packageJsonPath,
        config: require(packageJsonPath),
      }))
      .filter(d => d.config.scripts && d.config.scripts.tslint)
      .map(d => d.path);

    if (packagesWithTslint.length === 0) {
      process.exit(0);
    }

    return Promise.all(
      packagesWithTslint.map(packageJsonPath => {
        return new Promise((resolve, reject) => {
          exec(
            'yarn run tslint --fix ' + filesMap[packageJsonPath].join(' '),
            { cwd: path.dirname(packageJsonPath) },
            error => {
              if (error) {
                reject('yarn run tslint failed for ' + packageJsonPath);
                return;
              }
              resolve();
            },
          );
        });
      }),
    );
  })
  .catch(e => {
    console.log('failed to run relativeTslint, ' + e);
    process.exit(1);
  });
