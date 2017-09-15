#!/usr/bin/env node
/* eslint-disable */
// NOTE: eslint is disabled since this file needs to work with node 0.10 and up (no esnext)

/**
 * Simple script to check engines versions, defined in package.json.
 * Supports a subset of semver:
 *  - works only with full version patterns that contain all 3 parts (major, minor and patch parts),
 *  - supports ^, ~, >, <, >=, <= as version pattern prefix
 *
 * Designed to run in preinstall hook of package.json
 *
 * Example:
 *   "scripts": {
 *     "preinstall": "node ./src/scripts/checkEngines.js",
 *   },
 *
 */

var fs = require('fs');
var path = require('path');
var spawnSync = require('child_process').spawnSync;

var packageJson = require(path.join(process.cwd(), 'package.json'));
var engines = packageJson.engines;
var unmatchingEngines = [];

var versionPatternRx = /^([\^~]{0,1}|[>|<][=]{0,1})[ ]*([\d]+)\.([\d]+)\.([\d]+)$/;
var versionRx = /^[v]*([\d]+)\.([\d]+)\.([\d]+)$/;

Object.keys(engines).forEach(function(engine) {
  var requiredVersionPattern = engines[engine];

  if (!versionPatternRx.test(requiredVersionPattern)) {
    throw new Error(
      'checkEngines script does not support the pattern "' +
        requiredVersionPattern +
        '" specified for engine "' +
        engine +
        '"',
    );
  }
  var matches = requiredVersionPattern.match(versionPatternRx);
  var required = {
    modifier: matches[1],
    major: parseInt(matches[2]),
    minor: parseInt(matches[3]),
    patch: parseInt(matches[4]),
  };

  var currentVersion = spawnSync(engine, ['--version'])
    .stdout.toString()
    .replace(/\s/g, '');
  if (!versionRx.test(currentVersion)) {
    throw new Error(
      'checkEngines script was not able to get current version for engine "' +
        engine +
        '", ' +
        'or the version was in unsupported format (got "' +
        currentVersion +
        '")',
    );
  }
  matches = currentVersion.match(versionRx);
  var current = {
    major: parseInt(matches[1]),
    minor: parseInt(matches[2]),
    patch: parseInt(matches[3]),
  };

  var isExactMatch = function() {
    return current.major === required.major && current.minor === required.minor && current.patch === required.patch;
  };

  var satisfies = false;
  if (required.modifier === '') {
    // exact match
    satisfies = isExactMatch();
  } else if (required.modifier === '^') {
    // exact match for major version, and exact match for minor version if required major version is 0
    satisfies =
      current.major === required.major &&
      ((required.major > 0 && current.minor > required.minor) ||
        (current.minor === required.minor && current.patch >= required.patch));
  } else if (required.modifier === '~') {
    // exact match for major and minor versions
    satisfies = current.major === required.major && current.minor === required.minor && current.patch >= required.patch;
  } else if (required.modifier[0] === '>') {
    satisfies =
      (required.modifier[1] === '=' && isExactMatch()) ||
      current.major > required.major ||
      (current.major === required.major && current.minor > required.minor) ||
      (current.major === required.major && current.minor === required.minor && current.patch > required.patch);
  } else if (required.modifier[0] === '<') {
    satisfies =
      (required.modifier[1] === '=' && isExactMatch()) ||
      current.major < required.major ||
      (current.major === required.major && current.minor < required.minor) ||
      (current.major === required.major && current.minor === required.minor && current.patch < required.patch);
  } else {
    throw new Error('unexpected modifier in version pattern ' + required.modifier);
  }

  if (!satisfies) {
    unmatchingEngines.push({
      name: engine,
      currentVersion: currentVersion,
      neededVersion: requiredVersionPattern,
    });
  }
});

if (unmatchingEngines.length) {
  var errorMessage = unmatchingEngines
    .map(function(eng) {
      return 'required version for "' + eng.name + '" is ' + eng.neededVersion + ', but found ' + eng.currentVersion;
    })
    .join('\n');

  errorMessage += '\nPlease install required versions.\n\n';
  throw new Error(errorMessage);
}
