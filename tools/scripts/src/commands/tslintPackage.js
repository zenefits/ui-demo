// @ts-check
const util = require('util');
const glob = util.promisify(require('glob'));
const { spawn } = require('child_process');
const exists = util.promisify(require('fs').exists);
// const fs = require('fs');

const cwd = process.cwd();
const lint = (projectPath, globPromise) =>
  globPromise.then(filesToLint => {
    const pr = spawn('./node_modules/.bin/tslint', ['--project', projectPath, ...filesToLint], {
      cwd,
      stdio: 'inherit',
    });
    return new Promise(resolve => pr.on('exit', code => resolve(code)));
  });

const lintCypress = () =>
  exists('./cypress/tsconfig.json').then(hasCypress => {
    if (hasCypress) {
      return lint('./cypress', glob('cypress/**/*.{ts,tsx}'));
    }
    return 0;
  });

const run = () =>
  Promise.all([
    lint('./', glob('**/*.{ts,tsx}', { ignore: ['cypress/**/*', 'node_modules/**', 'dist/**'] })),
    lintCypress(),
  ]).then(results => process.exit(Math.max(...results)));

module.exports = {
  name: 'tslintPackage',
  info: 'run tslint only for current package files (exclude dependencies)',
  run,
};
