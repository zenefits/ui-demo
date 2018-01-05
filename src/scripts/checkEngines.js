/* eslint-disable */
// NOTE: eslint is disabled since this file needs to work with node 0.10 and up (no esnext)

/**
 * Simple script to check engine versions (semver) as defined in package.json.
 *
 * Designed to run in preinstall hook of package.json, so it cannot depend on NPM modules.
 *
 * Example:
 *   "scripts": {
 *     "preinstall": "node ./src/scripts/checkEngines.js",
 *   },
 *
 */

var path = require('path');
var spawnSync = require('child_process').spawnSync;
var semver = require('./lib/semver');

var packageJson = require(path.join(process.cwd(), 'package.json'));
var engines = packageJson.engines;
var unmatchingEngines = [];

Object.keys(engines).forEach(function(engine) {
  var requiredVersionInput = engines[engine];

  var requiredVersion = semver.validRange(requiredVersionInput);
  if (!requiredVersion) {
    throw new Error(
      'checkEngines script found invalid range "' + requiredVersionInput + '" specified for engine "' + engine + '"'
    );
  }

  var currentVersionOutput = spawnSync(engine, ['--version']).stdout;
  var currentVersion = currentVersionOutput &&
    currentVersionOutput.toString()
    .replace(/\s/g, '');

  var currentVersion = semver.valid(currentVersion);
  if (!currentVersion) {
    throw new Error(
      'checkEngines script was not able to get current version for engine "' +
        engine +
        '", ' +
        'or the version was invalid (got "' +
        currentVersion +
        '")'
    );
  }

  if (!semver.satisfies(currentVersion, requiredVersion)) {
    unmatchingEngines.push({
      name: engine,
      currentVersion: currentVersion,
      neededVersion: requiredVersion,
    });
  }
});

if (unmatchingEngines.length) {
  var errorMessage = unmatchingEngines
    .map(function(engine) {
      var whichEng = spawnSync('which', [engine.name])
        .stdout.toString()
        .replace(/\s/g, '');
      return 'required version for "' + engine.name + '" (' + whichEng + ') is ' + engine.neededVersion + ', but found ' + engine.currentVersion;
    })
    .join('\n');

  errorMessage += '\nPlease install required versions. See z-frontend/README.md for details.\n\n';
  throw new Error(errorMessage);
}
