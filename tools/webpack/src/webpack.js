const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const express = require('express');
const path = require('path');
const fs = require('fs');
const globSync = require('glob').sync;
let getWebpackConfig = require('./webpack.client.config.js');

const proxies = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

const projectsWebPackConfigPath = path.join(process.cwd(), './webpack.client.config.js');
if (fs.existsSync(projectsWebPackConfigPath)) {
  getWebpackConfig = require(projectsWebPackConfigPath); // eslint-disable-line import/no-dynamic-require, global-require
}

module.exports = function run() {
  const app = express();

  // const envVars = {
  //   ENV: process.env.ENV,
  //   NO_MAPS: process.env.NO_MAPS ? 1 : 0,
  // }

  // const envVarsStr = Object.keys(envVars).map(v => `${v}:${envVars[v]}`).join('+');

  const configsConfig = { port: process.env.PORT || 3023 };
  const compiler = webpack(getWebpackConfig(configsConfig));
  // compiler.run();
  app.use(
    webpackDev(compiler, {
      // headers: {'Access-Control-Allow-Origin': '*'},
      // noInfo: true,
      // publicPath: '/assets/',
      stats: {
        colors: true,
        chunks: false,
        chunkModules: false,
        children: false,
      },
    }),
  );

  app.use('/', express.static('public'));
  app.use(webpackHot(compiler));
  proxies.forEach(proxy => proxy(app));

  app.listen(configsConfig.port);

  console.log(`dev server started on http://localhost:${configsConfig.port}`);
};
