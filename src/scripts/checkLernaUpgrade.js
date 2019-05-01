// @ts-check
/* eslint-disable */

var path = require('path');
var spawnSync = require('child_process').spawnSync;
var semver = require('./lib/semver');
var fs = require('fs');

var packageJson = require(path.join(__dirname, '../../package.json'));

var pkgVersion = packageJson.devDependencies.lerna;
var nodeModulesVersion;
var localLernaBinPath = path.join(__dirname, '../../node_modules/.bin/lerna');
if (fs.existsSync(localLernaBinPath)) {
  nodeModulesVersion = spawnSync(localLernaBinPath, ['--version'])
    .stdout.toString()
    .replace(/\s/g, '');
  nodeModulesVersion = semver.valid(nodeModulesVersion);
}

if (nodeModulesVersion && !semver.satisfies(nodeModulesVersion, pkgVersion)) {
  console.log(
    `upgrading local lerna package (package.json version ${pkgVersion}, local version ${nodeModulesVersion})`,
  );
  spawnSync('rm', [
    '-rf',
    path.join(__dirname, '../../node_modules/lerna'),
    path.join(__dirname, '../../node_modules/.yarn-integrity'),
  ]);
}
