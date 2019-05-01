// @ts-check
/* eslint-disable */

const _ = require('lodash');
const path = require('path');
const sendToSignalfx = require('../../../src/scripts/sendToSignalfx');

function AnalyticsWebpackPlugin() {}

module.exports = AnalyticsWebpackPlugin;

const packageJson = require(path.join(process.cwd(), 'package.json'));

let initialRunDone = false;
let initialTsRunDone = false;

function getBuildType(isInitialRunDone, isWatchMode) {
  if (!isWatchMode) {
    return 'full';
  }

  return isInitialRunDone ? 'rebuild' : 'full-dev';
}

AnalyticsWebpackPlugin.prototype.apply = function analyticsWebpackPlugin(compiler) {
  compiler.hooks.done.tap('AnalyticsPlugin', stats => {
    const resultTime = _.round((stats.endTime - stats.startTime) / 1000, 2);

    sendToSignalfx('uiplatform.webpack-build', resultTime, {
      buildType: getBuildType(initialRunDone, compiler.watchMode),
      packageName: packageJson.name,
    });

    initialRunDone = true;
  });

  if (compiler.hooks.forkTsCheckerDone) {
    compiler.hooks.forkTsCheckerDone.tap('AnalyticsPlugin', (diagnostics, lints, elapsed) => {
      const resultTime = _.round(elapsed / 1000000000, 2);

      sendToSignalfx('uiplatform.webpack-ts-build', resultTime, {
        buildType: getBuildType(initialTsRunDone, compiler.watchMode),
        packageName: packageJson.name,
      });

      initialTsRunDone = true;
    });
  }
};
