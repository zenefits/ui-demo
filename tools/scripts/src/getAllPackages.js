const fs = require('fs');
const path = require('path');
const glob = require('glob');

const zFrontendRoot = path.resolve(path.join(__dirname, '../../../'));
const globOptions = { cwd: zFrontendRoot, absolute: true, ignore: ['node_modules/**', 'dist/**'] };

function getAppNames() {
  // sync so we can use from bash script like `setup_env.sh`
  const packagePaths = glob.sync('apps/**/package.json', globOptions);
  return packagePaths.map(packagePath => {
    const json = require(packagePath); // eslint-disable-line import/no-dynamic-require, global-require
    return json.name;
  });
}

function getAllPackageJsonFiles({ includeRoot = false } = {}) {
  const rootPackageJson = require(path.resolve(zFrontendRoot, 'package.json')); // eslint-disable-line import/no-dynamic-require, global-require

  if (rootPackageJson.name !== 'z-frontend') {
    throw new Error('root package.json not found');
  }

  // get package folders
  // unwrap globs

  const results = rootPackageJson.workspaces.map(pattern => glob.sync(path.join(zFrontendRoot, pattern)));

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

  if (includeRoot) {
    const json = require(path.join(zFrontendRoot, 'package.json')); // eslint-disable-line import/no-dynamic-require, global-require
    packageList.push({
      fullPath: zFrontendRoot,
      shortPath: '.',
      name: json.name,
      json,
    });
  }

  return packageList;
}

function getAppPackages() {
  const packages = getAllPackageJsonFiles();
  return packages.filter(pkg => pkg.json.zenefits && pkg.json.zenefits.level && pkg.json.zenefits.level === 'app');
}

function getAppPorts() {
  return getAppPackages()
    .map(appPackage => ({
      appName: appPackage.name,
      port: appPackage.json.config && appPackage.json.config.port,
    }))
    .filter(app => app.port);
}

module.exports = {
  getAllPackageJsonFiles,
  getAppPackages,
  getAppNames,
  getAppPorts,
};
