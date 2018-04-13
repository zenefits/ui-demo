#!/usr/bin/env node
/* eslint-disable */
// @ts-check
/**
  WIP: a tool to manage dependency upgrades across all packages in the repo
  run from repo root:
  - `node ./src/scripts/managePackageJson.js` to check if there are packages with different versions across the repo
  - `node ./src/scripts/managePackageJson.js <dependency-name>` to check what versions are being used across the repo
      example: `node ./src/scripts/managePackageJson.js redux-actions`
  - `node ./src/scripts/managePackageJson.js <dependency-name> <new-version>` to upgrade version for the dependency
      everywhere in the repo (will replace the versions on all package.json files). Need to run lerna bootstrap after
      example: `node ./src/scripts/managePackageJson.js redux-actions ^1.0.4`
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const npmCheck = require('npm-check');
const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

program
  .version('0.1.0')
  .option('--old', 'Use old way')
  .parse(process.argv);

const cwd = process.cwd();

(async function() {
  const { packageList, packages } = await getAllPackageJsonFiles();

  if (program.old) {
    const depNameToUpgrade = process.argv[3];
    const newVersion = process.argv[4];

    if (depNameToUpgrade) {
      if (newVersion) {
        console.log(`upgrading ${depNameToUpgrade} to ${newVersion}`);
      } else {
        console.log(`checking versions for ${depNameToUpgrade}`);
      }
    }

    if (depNameToUpgrade) {
      if (newVersion) {
        upgradeDependencies(packages, packageList, [{ name: depNameToUpgrade, newVersion }], true);
      } else {
        upgradeDependencies(packages, packageList, [{ name: depNameToUpgrade, newVersion }]);
      }
    } else {
      checkAllForDifferentVersions(packages);
    }
  } else {
    const hasNoPackagesWithMultipleVerions = checkAllForDifferentVersions(packages);

    // commenting out this check, since we have 2 versions of RN, (regular and expo) and it blocks the script
    // if (!hasNoPackagesWithMultipleVerions) {
    //   throw new Error(`can't run when there are packages with multiple versions`);
    // }

    console.log('loading...');
    const packageListNpm = await Promise.all(
      packageList.map(async pkgInfo => {
        const npmInfo = await npmCheck({
          cwd: pkgInfo.pkgPath,
        });
        pkgInfo.npmInfo = npmInfo.get('packages');
        return pkgInfo;
      }),
    );

    // console.log(JSON.stringify(packageListNpm, undefined, '  '));
    const packagesToUpgrade = {};
    packageListNpm.forEach(pkgInfo => {
      const pkgNameShort = pkgInfo.json.name.replace('z-frontend-', '');
      pkgInfo.npmInfo
        .filter(pkgNpm => pkgNpm.moduleName.indexOf('z-frontend') === -1)
        .filter(pkgNpm => pkgNpm.installed !== pkgNpm.latest)
        .forEach(pkgNpm => {
          if (!packagesToUpgrade[pkgNpm.moduleName]) {
            packagesToUpgrade[pkgNpm.moduleName] = {
              value: pkgNpm.moduleName,
              name: chalk` {bold ${pkgNpm.moduleName}} from {yellow.bold ${pkgNpm.packageJson}} (installed ${
                pkgNpm.installed
              }) to {green.bold ^${pkgNpm.latest}} in ${pkgNameShort}`,
              short: `${pkgNpm.moduleName}: ^${pkgNpm.latest}`,
              newVersion: `^${pkgNpm.latest}`,
            };
          } else {
            packagesToUpgrade[pkgNpm.moduleName].name += `, ${pkgNameShort}`;
          }
        });
    });

    const choices = Object.keys(packagesToUpgrade)
      .sort()
      .map(k => packagesToUpgrade[k]);

    const inqResults = await inquirer.prompt([
      {
        type: 'checkbox',
        pageSize: 140,
        name: 'packages',
        message: 'Select packages to upgrade',
        choices,
      },
    ]);

    console.log('inqResults.packages');
    console.log(JSON.stringify(inqResults.packages, undefined, '  '));

    const upgrades = choices
      .filter(pkg => inqResults.packages.includes(pkg.value))
      .map(pkg => ({ name: pkg.value, newVersion: pkg.newVersion }));

    await upgradeDependencies(packages, packageList, upgrades, true);

    console.log('Success!');
  }
})();

async function getAllPackageJsonFiles() {
  // get package folders
  // unwrap globs
  const rootPackageJson = require(path.join(cwd, 'package.json'));
  const packages = {};
  function mapDependencies(depMap, pkgName) {
    Object.keys(depMap).forEach(depName => {
      if (!packages[depName]) {
        packages[depName] = {};
      }
      if (!packages[depName][depMap[depName]]) {
        packages[depName][depMap[depName]] = {};
      }
      packages[depName][depMap[depName]][pkgName] = true;
    });
  }

  const results = await Promise.all(
    rootPackageJson.workspaces.map(pattern => {
      return new Promise((resolve, reject) => {
        glob(pattern, (err, pkgList) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(pkgList);
        });
      });
    }),
  );

  let packageList = results
    .reduce((r, v) => r.concat(v), [])
    .filter(pkg => {
      try {
        const r = fs.statSync(path.join(cwd, pkg, 'package.json'));
        return r.isFile();
      } catch (e) {
        return false;
      }
    })
    .map(pkg => {
      const pkgPath = path.join(cwd, pkg);
      return {
        pkg,
        pkgPath,
        json: require(path.join(pkgPath, 'package.json')),
      };
    });

  packageList.forEach(({ pkg, json }) => {
    // console.log(pkg, json.name);
    const depMap = json.dependencies || {};
    mapDependencies(json.dependencies || {}, json.name);
    mapDependencies(json.devDependencies || {}, json.name);
  });

  return { packageList, packages };
}

function checkAllForDifferentVersions(packages) {
  const packagesWithMultipleVersions = Object.keys(packages)
    .sort()
    .filter(depName => Object.keys(packages[depName]).length > 1);

  if (packagesWithMultipleVersions.length) {
    packagesWithMultipleVersions.forEach(depName => {
      const versions = Object.keys(packages[depName]);
      console.log(`${depName} has ${versions.length} versions: ${versions.join(', ')}`);
    });
    return false;
  } else {
    console.log(`there are no packages with multiple versions`);
    return true;
  }
}

async function upgradeDependencies(packages, packageList, upgrades, writeFiles = false) {
  upgrades.forEach(({ name }) => {
    if (!packages[name]) {
      throw new Error(`dependency ${name} is not found in any packages`);
    }
  });

  const filesToWrite = {};

  upgrades.forEach(({ name, newVersion }) => {
    const versionsMap = packages[name];
    const versionsArr = Object.keys(versionsMap);
    if (versionsArr.length !== 1) {
      const msg = versionsArr.map(version => `"${version}" in ${Object.keys(versionsMap[version]).join(', ')}; `);
      throw new Error(`dependency ${name} has different versions defined in packages: ${msg}`);
    }

    const oldVersion = versionsArr[0];
    const packagesToUpgrade = Object.keys(versionsMap[versionsArr[0]]);
    console.log(`  old version for ${name} is ${oldVersion}, installed in ${packagesToUpgrade.join(', ')}`);

    packageList.filter(({ json }) => packagesToUpgrade.includes(json.name)).forEach(({ pkg, json, pkgPath }) => {
      if (json.dependencies[name]) {
        json.dependencies[name] = newVersion;
      }
      if (json.devDependencies[name]) {
        json.devDependencies[name] = newVersion;
      }
      filesToWrite[json.name] = true;
    });
  });

  if (writeFiles) {
    upgrades.forEach(({ name, newVersion }) => {
      packageList.filter(({ json }) => filesToWrite[json.name]).forEach(({ json, pkgPath }) => {
        console.log(`  write updates to ${pkgPath}/package.json`);
        fs.writeFileSync(path.join(pkgPath, 'package.json'), JSON.stringify(json, undefined, '  ') + '\n');
      });
      console.log(`  package.json files updated`);
    });
  }
}
