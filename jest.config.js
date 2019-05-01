// @ts-check

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const { workspaces } = require(path.join(__dirname, './package.json')); // eslint-disable-line import/no-dynamic-require
const workspacePackages = _.flatten(workspaces.map(name => glob.sync(path.join(__dirname, name))));

// Ignores z-frontened-storybook since each package runs its own storyshots so we don't want to run them twice
// Ignores z-frontend-talent-native since those are currently broken (no test until jest and babel are upgraded to latest)
const blacklist = ['z-frontend-jest', 'z-frontend-expo-wrapper', 'z-frontend-storybook', 'z-frontend-talent-native'];

// filter out packages that are in blacklist OR don't have jest in their package.json
const projects = workspacePackages.filter(p => {
  const pkgPath = path.resolve(p, 'package.json');
  let pkgExists = true;
  try {
    pkgExists = fs.statSync(pkgPath).isFile();
  } catch (e) {
    pkgExists = false;
  }
  if (!pkgExists) {
    return false;
  }
  const pkg = require(pkgPath); // eslint-disable-line import/no-dynamic-require, global-require
  return !blacklist.includes(pkg.name) && JSON.stringify(pkg).indexOf('jest') !== -1;
});

module.exports = {
  projects,
};
