#!/usr/bin/env node

// @ts-check
/* eslint-disable */

const path = require('path');
const fs = require('fs');
const execa = require('execa');

const sendToSignalfx = require('../../src/scripts/sendToSignalfx');

process.on('unhandledRejection', err => {
  throw err;
});

const startTime = Date.now();
const cwd = process.cwd();
const repoRoot = path.resolve(__dirname, '../..');
const pathInRepo = cwd.replace(`${repoRoot}/`, '');
const historyFilePath = path.join(repoRoot, 'node_modules/.cache/zrun-history.json');
const packageName = process.env.npm_package_name;
const npmScriptName = process.env.npm_lifecycle_event;
const commandToRun = process.argv.slice(2).join(' ');
const commandsArr = commandToRun.split(/\s+&&\s+/);
const isPreScript = npmScriptName.indexOf('pre') === 0;
const isPostScript = npmScriptName.indexOf('post') === 0;
const hasPreScript = !isPostScript && !isPreScript && !!process.env[`npm_package_scripts_pre${npmScriptName}`];
const hasPostScript = !isPostScript && !isPreScript && !!process.env[`npm_package_scripts_post${npmScriptName}`];
const isWatchMode = commandToRun.indexOf(' --watch') !== -1 || commandToRun.indexOf(' -w') !== -1;

console.log(`Running "${npmScriptName}" in ${packageName} (path: ${pathInRepo}, command: ${commandToRun})`);

function saveResultForLater(scriptName, total) {
  console.log('saveResultForLater', scriptName, total);
  const history = fs.existsSync(historyFilePath) ? require(historyFilePath) : [];
  history.unshift({
    scriptName,
    total,
  });
  fs.writeFileSync(historyFilePath, JSON.stringify(history.slice(0, 20), null, '  '));
}

function getResultFromBefore(scriptName) {
  const history = fs.existsSync(historyFilePath) ? require(historyFilePath) : [];
  const results = history.find(h => h.scriptName === scriptName);
  console.log('getResultFromBefore', scriptName, results);
  if (results) {
    return results.total;
  }
  return 0;
}

function reportScript(scriptName, total, isPreOrPostScript = false) {
  const timeTotalSeconds = parseFloat((total / 1000).toFixed(2));
  console.log(
    `reporting npm script run: ${scriptName} in ${packageName} (${pathInRepo}) took ${timeTotalSeconds} sec.`,
  );

  sendToSignalfx('uiplatform.npm-script', Math.round(total / 1000), {
    packageName,
    scriptName,
    isPreOrPostScript: isPreOrPostScript ? 'yes' : 'no',
  });
}

let resultPromise = Promise.resolve();

commandsArr.forEach(command => {
  resultPromise = resultPromise.then(() => {
    return execa(command.split(/\s/)[0], command.split(/\s/).slice(1), { stdio: 'inherit' });
  });
});

resultPromise.then(() => {
  if (isWatchMode) {
    return;
  }

  const endTime = Date.now();
  const resultTime = endTime - startTime;

  if (isPreScript) {
    // save result for later
    saveResultForLater(npmScriptName, resultTime);
    // report pre task result
    reportScript(npmScriptName, resultTime, true);
  } else if (isPostScript) {
    const preResult = getResultFromBefore(npmScriptName.replace('post', 'pre'));
    const mainResult = getResultFromBefore(npmScriptName.replace('post', ''));
    // get result for pre task and main task, and combine it with post task,
    // report post result
    reportScript(npmScriptName, resultTime, true);
    // report main result
    reportScript(npmScriptName.replace('post', ''), preResult + mainResult + resultTime);
  } else if (hasPostScript) {
    // save result for later, post will do reporting
    saveResultForLater(npmScriptName, resultTime);
  } else {
    // report total
    const total = resultTime + (hasPreScript ? getResultFromBefore(npmScriptName.replace('post', 'pre')) : 0);
    reportScript(npmScriptName, total);
  }
});
