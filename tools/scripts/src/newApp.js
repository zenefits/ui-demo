// // @ts-check
const path = require('path');
const fs = require('fs');
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const newAppName = args[0];

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
  return src.replace(/z-frontend-example/g, newAppName);
}

function addKeyWords(src) {
  const json = JSON.parse(src);
  json.keywords = json.keywords || [];
  json.keywords.push('z-frontend-app');
  return JSON.stringify(json, null, 2);
}

function updatePackageJson() {
  const packageJsonPath = path.join(target, 'package.json');
  const src = fs.readFileSync(packageJsonPath).toString();

  fs.writeFileSync(packageJsonPath, addKeyWords(replaceAppName(src)));
}

updatePackageJson();
spawnSync('lerna', ['link'], { stdio: 'inherit' });
