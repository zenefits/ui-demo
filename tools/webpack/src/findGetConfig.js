const path = require('path');
const fs = require('fs');

const getWebpackConfig = require('./webpack.client.config.js');

module.exports = () => {
  const projectsWebPackConfigPath = path.join(process.cwd(), './webpack.client.config.js');
  if (fs.existsSync(projectsWebPackConfigPath)) {
    return require(projectsWebPackConfigPath); // eslint-disable-line import/no-dynamic-require, global-require
  }
  return getWebpackConfig;
};
