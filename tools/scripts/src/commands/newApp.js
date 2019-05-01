// // @ts-check
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const run = newAppName => {
  if (!newAppName) {
    throw new Error('appName needs to be provided');
  }

  const source = path.join(process.cwd(), 'apps/example');
  const target = path.join(process.cwd(), `apps/${newAppName}`);
  if (fs.existsSync(target)) {
    throw new Error(`There is already app with the appName ${newAppName} on ${target}`);
  }
  spawnSync('cp', ['-R', source, target], { stdio: 'inherit' });

  function replaceAppName(src) {
    return src.replace(/z-frontend-example/g, `z-frontend-${newAppName}`);
  }

  function addKeyWords(src) {
    const json = JSON.parse(src);
    json.keywords = json.keywords || [];
    return JSON.stringify(json, null, 2);
  }

  function updatePackageJson() {
    const packageJsonPath = path.join(target, 'package.json');
    const src = fs.readFileSync(packageJsonPath).toString();

    fs.writeFileSync(packageJsonPath, addKeyWords(replaceAppName(src)));
  }

  updatePackageJson();
  spawnSync('lerna', ['link'], { stdio: 'inherit' });
};

module.exports = { name: 'newApp', info: 'Creates a new app', run };
