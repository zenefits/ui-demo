#!/usr/bin/env node
// @ts-check

const path = require('path');
const fs = require('fs-extra');
const { spawnSync, spawn } = require('child_process');
const { getAllPackageJsonFiles } = require('z-frontend-scripts');

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

const RUN_PART_START = process.env.RUN_PART_START ? parseFloat(process.env.RUN_PART_START) : null;
const RUN_PART_END = process.env.RUN_PART_END ? parseFloat(process.env.RUN_PART_END) : null;
if ((RUN_PART_START === null && RUN_PART_END !== null) || (RUN_PART_START === null && RUN_PART_END !== null)) {
  throw new Error(
    `both RUN_PART_START and RUN_PART_END should be defined. RUN_PART_START="${
      process.env.RUN_PART_START
    }", RUN_PART_END="${process.env.RUN_PART_END}`,
  );
}

const historyObjPath = path.join(__dirname, '../node_modules/.cache/runScriptLernaHistory.json');

function getPackagesListForPrevRun(scriptName) {
  if (scriptName) {
    const scriptsRuns = fs.readJsonSync(historyObjPath, { throws: false }) || [];
    const prevRun = scriptsRuns.reverse().find(run => run.scriptName === scriptName);
    if (prevRun) {
      return prevRun.packageNames;
    }
    throw new Error(`can't find prev run info for script "${scriptName}"`);
  }
  return null;
}

function writeRunInfo(scriptName, runPackages) {
  const scriptsRuns = fs.readJsonSync(historyObjPath, { throws: false }) || [];
  scriptsRuns.push({
    scriptName,
    packageNames: runPackages,
  });
  fs.writeJsonSync(historyObjPath, scriptsRuns);
}

function shuffleList(names) {
  const namesShuffled = [];
  while (names.length) {
    namesShuffled.push(names.length % 2 ? names.shift() : names.pop());
  }
  return namesShuffled;
}

const delimeterLine = '------------------------------------------------------------------------------------';
const scriptParamsDelimeter = '--';

// identify yarn script name to run, extra params for yarn script, and lerna command scripts
const prevScriptName = process.env.PACKAGES_FROM_PREV_RUN;
const returnPackagesCount = !!process.env.RETURN_PACKAGES_COUNT;
const args = process.argv.slice(2);
const yarnScriptName = args[0];
const otherParams = args.slice(1);
let yarnCommandParams = [];
let lernaCommandParams = otherParams.slice();
if (otherParams.includes(scriptParamsDelimeter)) {
  const deviderIndex = otherParams.indexOf(scriptParamsDelimeter);
  yarnCommandParams = otherParams.splice(deviderIndex + 1, otherParams.length - deviderIndex);
  lernaCommandParams = otherParams.slice(0, otherParams.length - 1);
}

// get the list of packages to run the given yarn script for
function getPackageNames() {
  const lernaSpawnArgs = ['list', '--all', '--json', ...lernaCommandParams];
  const packageListStr = spawnSync('lerna', lernaSpawnArgs).stdout.toString();
  // removing this extra string from lerna
  const packagesListJson = packageListStr.replace(', info cli using local version of lerna', '');
  const packageNames = JSON.parse(packagesListJson).map(pkg => pkg.name);

  if (!returnPackagesCount) {
    console.log('packageNames', packageNames.length, packageNames.join(','), lernaSpawnArgs);
  }
  return packageNames;
}

const packageNames = getPackageNames();

let CONCURRENT_EXEC_COUNT = process.env.CONCURRENT_EXEC_COUNT ? parseInt(process.env.CONCURRENT_EXEC_COUNT, 10) : 2;
CONCURRENT_EXEC_COUNT = Math.min(packageNames.length, CONCURRENT_EXEC_COUNT);

// utility variables
let packagesToRun = [];
let childHasFailed = false;
const executedPackages = [];
const erroredPackages = {};
const runTimes = {};

// run a yarn script
function runPackage(packageName, scriptNameToRun, packagesInfo) {
  return new Promise(resolve => {
    const pkgInfo = packagesInfo.find(p => p.name === packageName);

    const foldingHeader = `${scriptNameToRun}: ${packageName}`;
    const logPrefix = `travis_fold:start:${scriptNameToRun}--${packageName}\n${foldingHeader}\n${delimeterLine}\n`;
    const logSuffix = `\n${delimeterLine}\ntravis_fold:end:${scriptNameToRun}--${packageName}`;

    let log = '';
    function addLog(str) {
      if (CONCURRENT_EXEC_COUNT === 1) {
        console.log(str);
      } else {
        log += str;
      }
    }

    if (CONCURRENT_EXEC_COUNT === 1) {
      console.log(logPrefix);
    }

    runTimes[packageName] = Date.now();

    // log something every n minutes, because Travis kills the job it nothing was logged for 10 minutes
    let timer;
    function renewTimer() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        console.log('---');
      }, 5 * 60 * 1000);
    }

    const extraArgs = [];
    if (
      scriptNameToRun === 'test' &&
      (pkgInfo.json.scripts[scriptNameToRun].indexOf('zrun jest') !== -1 ||
        pkgInfo.json.scripts[scriptNameToRun].indexOf('jest') !== -1)
    ) {
      // is using jest for testing, run it with --runInBand param, since it's faster in Travis
      extraArgs.push('--runInBand');
    }

    const cp = spawn('yarn', ['run', scriptNameToRun, ...yarnCommandParams, ...extraArgs], {
      cwd: pkgInfo.fullPath,
      detached: true,
    });
    cp.stderr.on('data', d => {
      renewTimer();
      addLog(d.toString());
    });
    cp.stdout.on('data', d => {
      renewTimer();
      addLog(d.toString());
    });
    cp.on('exit', code => {
      clearTimeout(timer);

      if (code !== 0) {
        if (CONCURRENT_EXEC_COUNT === 1) {
          console.log(logSuffix);
        } else {
          const errorPrefix = logPrefix.replace(foldingHeader, `ERROR ${foldingHeader}`);
          console.log(`${errorPrefix}${log}${logSuffix}`);
        }
        childHasFailed = true;
        erroredPackages[packageName] = true;
      } else if (CONCURRENT_EXEC_COUNT === 1) {
        console.log(logSuffix);
      } else {
        console.log(`${logPrefix}${log}${logSuffix}`);
      }

      executedPackages.push(packageName);
      runTimes[packageName] = Date.now() - runTimes[packageName];
      resolve();
    });
  }).then(() => {
    if (packagesToRun.length) {
      return runPackage(packagesToRun.shift(), scriptNameToRun, packagesInfo);
    }
    return null;
  });
}

let running = 0;

const packagesData = getAllPackageJsonFiles();
const promises = [];

// filter out packages that don't have needed script
const infoMap = packagesData.reduce((acc, pkg) => {
  acc[pkg.name] = pkg;
  return acc;
}, {});

function filterPackagesByScriptName(packageNamesArr, scriptName) {
  const list = packageNamesArr.filter(
    p => infoMap[p] && infoMap[p].json.scripts && infoMap[p].json.scripts[scriptName],
  );
  return shuffleList(list);
}

if (returnPackagesCount) {
  const totalPackagesCount = filterPackagesByScriptName(packageNames, yarnScriptName).length;
  console.log(totalPackagesCount);
  process.exit();
} else if (prevScriptName) {
  packagesToRun = getPackagesListForPrevRun(prevScriptName);
  packagesToRun = filterPackagesByScriptName(packagesToRun, yarnScriptName);
  console.log(`using packages list from previous run of script "${prevScriptName}"`);
} else {
  packagesToRun = filterPackagesByScriptName(packageNames, yarnScriptName);
  if (RUN_PART_START !== null && RUN_PART_END !== null) {
    console.log(`total packages count = ${packagesToRun.length}, slicing from ${RUN_PART_START}% to ${RUN_PART_END}%`);
    packagesToRun = packagesToRun.slice(
      Math.ceil((packagesToRun.length * RUN_PART_START) / 100),
      Math.ceil((packagesToRun.length * RUN_PART_END) / 100),
    );
  }
}

writeRunInfo(yarnScriptName, packagesToRun);

console.log(`Running ${yarnScriptName} in ${packagesToRun.length} packages:\n ${packagesToRun.join(', ')}\n`);

while (running < CONCURRENT_EXEC_COUNT && packagesToRun.length > 0) {
  running += 1;
  console.log('start!');
  promises.push(runPackage(packagesToRun.shift(), yarnScriptName, packagesData));
}

Promise.all(promises).then(() => {
  const plog = executedPackages.map(n =>
    [
      '- ',
      n.padEnd(30, ' '),
      `${(runTimes[n] / 1000).toFixed(2)}s`.padEnd(8),
      erroredPackages[n] ? 'ERROR!!!' : '',
    ].join(''),
  );

  console.log(`\n\nscript "${yarnScriptName}" run in:\n${plog.join('\n')}\n\n`);

  process.exit(childHasFailed ? 1 : 0);
});
