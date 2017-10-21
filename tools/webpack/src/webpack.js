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

const getDefaultConfigOptions = () => ({ port: process.env.PORT || 3023 });

module.exports = {
  start() {
    const app = express();
    const configOptions = getDefaultConfigOptions();
    const webpackConfig = getWebpackConfig(configOptions);
    const compiler = webpack(webpackConfig);
    app.use(
      webpackDev(compiler, {
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

    app.listen(configOptions.port);

    console.log(`dev server started on http://localhost:${configOptions.port}`);
  },
  build() {
    const configOptions = getDefaultConfigOptions();
    const webpackConfig = getWebpackConfig(configOptions);
    const compiler = webpack(webpackConfig);
    compiler.run(err => {
      if (err) {
        throw new Error(err);
      }
      console.log('Hunky-dory. Successfully built at', webpackConfig.output.path);
    });
  },
};
