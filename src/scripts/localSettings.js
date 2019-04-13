// @ts-check

const path = require('path');
const fs = require('fs');

const localSettingsPath = path.resolve(__dirname, '../../local-settings.json');

const settingsDefaults = {
  disableWebpackNotifications: false,
};

let localSettings = {};

if (fs.existsSync(localSettingsPath)) {
  try {
    localSettings = require(localSettingsPath); // eslint-disable-line
  } catch (e) {
    console.log(`could not parse local-settings.json file, please make sure it's valid (path: ${localSettingsPath})`);
    process.exit(1);
  }
}

const settings = {
  ...settingsDefaults,
  ...localSettings,
};

module.exports = settings;
