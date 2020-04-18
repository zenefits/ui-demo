#!/usr/bin/env node
/* eslint-disable */
// @ts-check

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const program = require('commander');

program.version('0.1.0').parse(process.argv);

const cwd = process.cwd();

(async function() {
  const { packageList, packages, packagesCounter } = await getAllPackageJsonFiles();

  const depNameToUpgrade = process.argv[3];
  const newVersion = process.argv[4];

  if (depNameToUpgrade) {
    if (newVersion) {
      console.log(`upgrading ${depNameToUpgrade} to ${newVersion}`);
      upgradeDependencies(packages, packageList, [{ name: depNameToUpgrade, newVersion }], true);
    } else {
      console.log(`checking versions for ${depNameToUpgrade}`);
      upgradeDependencies(packages, packageList, [{ name: depNameToUpgrade, newVersion }]);
    }
  } else {
    checkAllForDifferentVersions(packages);

    console.log(JSON.stringify(packagesCounter, null, '  '));
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

  console.log('results', results);

  results.push(['./']);

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

  const packagesCounter = {};

  function countPackages(dependenciesMap = {}) {
    Object.keys(dependenciesMap).forEach(k => {
      if (!packagesCounter[k]) {
        packagesCounter[k] = 0;
      }
      packagesCounter[k]++;
    });
  }

  packageList.forEach(({ pkg, json }) => {
    // console.log(pkg, json.name);
    const depMap = json.dependencies || {};
    mapDependencies(json.dependencies || {}, json.name);
    mapDependencies(json.devDependencies || {}, json.name);
    countPackages(json.dependencies);
    countPackages(json.devDependencies);
  });

  const packagesCounterArr = [];
  Object.keys(packagesCounter)
    .sort()
    .forEach(k => {
      // packagesCounterSorted[k] = packagesCounter[k];
      packagesCounterArr.push([k, packagesCounter[k]]);
    });

  packagesCounterArr.sort((a, b) => {
    if (a[1] > b[1]) {
      return 1;
    } else if (a[1] < b[1]) {
      return -1;
    } else {
      if (a[0] > b[0]) {
        return 1;
      } else if (a[0] < b[0]) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  const packagesCounterSorted = {};
  packagesCounterArr.forEach(d => {
    packagesCounterSorted[d[0]] = d[1];
  });

  return { packageList, packages, packagesCounter: packagesCounterSorted };
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

    packageList
      .filter(({ json }) => packagesToUpgrade.includes(json.name))
      .forEach(({ pkg, json, pkgPath }) => {
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
      packageList
        .filter(({ json }) => filesToWrite[json.name])
        .forEach(({ json, pkgPath }) => {
          console.log(`  write updates to ${pkgPath}/package.json`);
          fs.writeFileSync(path.join(pkgPath, 'package.json'), JSON.stringify(json, undefined, '  ') + '\n');
        });
      console.log(`  package.json files updated`);
    });
  }
}
