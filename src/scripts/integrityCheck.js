// @ts-check

const path = require('path');
const _ = require('lodash');
const glob = require('glob');
const fs = require('fs');
const crypto = require('crypto');
const chalk = require('chalk');

const operation = process.argv[2];

const cacheDir = path.join(__dirname, '../../node_modules/.cache');
const yarnHashPath = path.join(cacheDir, 'yarnHash.txt');

const yarnLock = fs.readFileSync(path.join(__dirname, '../../yarn.lock')).toString();
const hash = crypto
  .createHash('md5')
  .update(yarnLock)
  .digest('hex');

if (operation === '--check') {
  let currentHash = null;
  try {
    currentHash = fs.readFileSync(yarnHashPath).toString();
  } catch (e) {}

  if (currentHash && hash !== currentHash) {
    console.log(chalk`\n\n{red INTEGRITY CHECK FAILED} {yellow.bold Please run "lerna bootstrap"}\n\n`);
    process.exit(1);
  }
} else if (operation === '--write') {
  let cacheDirExists = false;
  try {
    cacheDirExists = fs.statSync(cacheDir).isDirectory();
  } catch (e) {}

  if (!cacheDirExists) {
    fs.mkdirSync(cacheDir);
  }

  fs.writeFileSync(yarnHashPath, hash);
} else {
  throw new Error('unsupported operation');
}
