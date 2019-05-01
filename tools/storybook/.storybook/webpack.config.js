const getStorybookConfig = require('z-frontend-webpack/src/getStorybookConfig');
const path = require('path');

module.exports = getStorybookConfig(path.join(__dirname, '../src/manager/index.js'));
