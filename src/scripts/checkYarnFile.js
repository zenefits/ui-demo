#!/usr/bin/env node
/* eslint-disable */
// @ts-check

const fs = require('fs');
const path = require('path');
const semver = require('semver');
const _ = require('lodash');

const args = process.argv.slice(2);
const yarnFilePath = path.join(__dirname, '../../yarn.lock');
const packageJson = require(path.join(__dirname, '../../package.json'));
const yarnFile = fs.readFileSync(yarnFilePath).toString();
const entries = yarnFile.match(/[^@\n]+@(.+\n)+\n/gm);

const pkgMap = {};

entries.forEach(entry => {
  let pkgName = entry.match(/^["]?([\S\s]+?)@/)[1];

  if (packageJson.resolutions[pkgName]) {
    return;
  }

  if (!pkgMap[pkgName]) {
    pkgMap[pkgName] = [];
  }

  const data = {
    entry,
    resolvedVersion: (entry.match(/version "(.+?)"/) || [])[1],
    requiredVersions: entry
      .split('\n')[0]
      .split(', ')
      .map(v => v.match(/(?:"@.+?@|[^@]+@)(.+?)"?\:?$/)[1]),
  };
  if (!data.requiredVersions.some(reqV => reqV.indexOf('#') !== -1)) {
    pkgMap[pkgName].push(data);
  } else if (data.requiredVersions.length > 1) {
    console.log(`found entry with github link and more than 1 required versions\n ${JSON.stringify(data, null, '  ')}`);
  }
});

const packagesWithDupsData = {};

function mapOfArraysToString(map) {
  return JSON.stringify(
    Object.keys(map)
      .sort()
      .map(k => `${k} => ${map[k].sort()}`),
  );
}

Object.keys(pkgMap).forEach(name => {
  const data = pkgMap[name];

  const allRequiredVersions = _.flatten(data.map(d => d.requiredVersions));
  const allResolvedVersions = _.reverse(_.sortBy(data.map(d => d.resolvedVersion)));

  const oldResolutions = {};
  data.forEach(d => {
    if (!oldResolutions[d.resolvedVersion]) {
      oldResolutions[d.resolvedVersion] = [];
    }
    oldResolutions[d.resolvedVersion].push(...d.requiredVersions);
    oldResolutions[d.resolvedVersion].sort();
  });

  const newResolutions = {};

  allRequiredVersions.forEach(reqV => {
    const resV = allResolvedVersions.find(resV => semver.satisfies(resV, reqV));
    if (!resV) {
      throw JSON.stringify({ name, reqV, data, allResolvedVersions }, null, '  ');
    }
    if (!newResolutions[resV]) {
      newResolutions[resV] = [];
    }
    newResolutions[resV].push(reqV);
  });

  if (mapOfArraysToString(newResolutions) !== mapOfArraysToString(oldResolutions)) {
    const oldEntries = data.map(d => d.entry);
    const newEntries = Object.keys(newResolutions).map(resV => {
      const reqVData = data.find(d => d.resolvedVersion === resV);
      if (!reqVData) {
        throw JSON.stringify({ data, resV }, null, '  ');
      }
      const newFirstLine = `${newResolutions[resV]
        .map(reqV => {
          if (name.indexOf('@') !== -1 || reqV.indexOf(' ') !== -1) {
            return `"${name}@${reqV}"`;
          } else {
            return `${name}@${reqV}`;
          }
        })
        .join(', ')}:`;
      return [newFirstLine, ...reqVData.entry.split('\n').slice(1)].join('\n');
    });

    packagesWithDupsData[name] = {
      allRequiredVersions,
      allResolvedVersions,
      oldResolutions,
      newResolutions,
      newEntries,
      oldEntries,
    };
  }
});

let newYarnLock = yarnFile;

console.log(`items to optimize count ${Object.keys(packagesWithDupsData).length}\n\n\n`);

console.log(Object.keys(packagesWithDupsData));
console.log('\n\n\n');

Object.keys(packagesWithDupsData).map(name => {
  const res = packagesWithDupsData[name];
  newYarnLock = newYarnLock.replace(res.oldEntries[0], res.newEntries.join(''));
  res.oldEntries.slice(1).forEach(en => {
    newYarnLock = newYarnLock.replace(en, '');
  });
});

if (args.indexOf('--write') !== -1) {
  console.log('writing new yarn.lock file');
  fs.writeFileSync(yarnFilePath, newYarnLock);
} else {
  console.log(JSON.stringify(packagesWithDupsData, null, '  '));
  console.log(`\n\n\n${newYarnLock}`);
}
