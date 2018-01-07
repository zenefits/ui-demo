const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const express = require('express');
const path = require('path');
const fs = require('fs');
const globSync = require('glob').sync;
let getWebpackConfig = require('./webpack.client.config.js');
const getAppName = require('./getAppName');

const proxies = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

const projectsWebPackConfigPath = path.join(process.cwd(), './webpack.client.config.js');
if (fs.existsSync(projectsWebPackConfigPath)) {
  getWebpackConfig = require(projectsWebPackConfigPath); // eslint-disable-line import/no-dynamic-require, global-require
}

const getDefaultConfigOptions = () => ({ port: process.env.PORT || 3023 });

const appName = getAppName();

module.exports = {
  start() {
    const app = express();

    const pathPrefix = '/app';
    const mountPath = `${pathPrefix}/:appName/`;
    app.get('/', (req, res) => {
      res.redirect(`${pathPrefix}/${appName}/`);
    });
    app.get(`${pathPrefix}/:appName`, (req, res, next) => {
      if (req.url[req.url.length - 1] !== '/') {
        res.redirect(`${pathPrefix}/${req.params.appName}/`);
      } else {
        next();
      }
    });

    const configOptions = getDefaultConfigOptions();
    const webpackConfig = getWebpackConfig(configOptions);
    const compiler = webpack(webpackConfig);
    app.use(
      mountPath,
      webpackDev(compiler, {
        stats: {
          colors: true,
          chunks: false,
          chunkModules: false,
          children: false,
        },
      }),
    );

    app.use(mountPath, express.static('public'));
    app.use(
      mountPath,
      webpackHot(compiler, {
        reload: true,
      }),
    );
    proxies.forEach(proxy => proxy(app));

    app.listen(configOptions.port);

    console.log(`dev server started on http://localhost:${configOptions.port}`);
  },
  build() {
    const configOptions = getDefaultConfigOptions();
    const webpackConfig = getWebpackConfig(configOptions);
    const compiler = webpack(webpackConfig);
    compiler.run((err, stats) => {
      if (err) {
        throw new Error(err);
      }

      console.log(
        stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true, // Shows colors in the console
        }),
      );
      if (stats.hasErrors()) {
        throw new Error('There were compilation errors. See stats above for more details');
      }
      const outputPath = webpackConfig.output.path;
      if (!fs.existsSync(outputPath)) {
        throw new Error(`Expected ${outputPath} to exist, but it wasn't generated`);
      }

      console.log('Hunky-dory. Successfully built at', outputPath);
    });
  },
};
