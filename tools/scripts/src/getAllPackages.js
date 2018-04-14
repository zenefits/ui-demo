// @ts-check

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const zFrontendRoot = path.resolve('../../');
const rootPackageJson = require(path.resolve(zFrontendRoot, 'package.json')); // eslint-disable-line import/no-dynamic-require

if (rootPackageJson.name !== 'z-frontend') {
  throw new Error('root package.json not found');
}

module.exports = async function getAllPackageJsonFiles() {
  // get package folders
  // unwrap globs

  const results = await Promise.all(
    rootPackageJson.workspaces.map(pattern => {
      const promise = new Promise((resolve, reject) => {
        glob(path.join(zFrontendRoot, pattern), (err, pkgList) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(pkgList);
        });
      });
      return promise;
    }),
  );

  const packageList = results
    .reduce((r, v) => r.concat(v), [])
    .filter(pkg => {
      try {
        const r = fs.statSync(path.join(pkg, 'package.json'));
        return r.isFile();
      } catch (e) {
        return false;
      }
    })
    .map(packagePath => {
      const json = require(path.join(packagePath, 'package.json')); // eslint-disable-line import/no-dynamic-require, global-require
      return {
        fullPath: packagePath,
        shortPath: packagePath.replace(`${zFrontendRoot}/`, ''),
        name: json.name,
        json,
      };
    });

  return packageList;
};
