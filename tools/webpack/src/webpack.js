const webpack = require('webpack');
const webpackDev = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const opn = require('opn');

const getAppName = require('./getAppName');
const findGetConfig = require('./findGetConfig');
const proxies = require('./proxies');

const verboseLogging = !!process.env.WEBPACK_VERBOSE || process.env.NODE_ENV === 'production';

const getWebpackConfig = findGetConfig();

// NOTE: leaving PORT for backwards compat and in case someone wants to use it as override
// like iframe-router-example
const port = process.env.PORT || process.env.npm_package_config_port || 3023;
const getDefaultConfigOptions = () => ({
  port,
  openNetwork: process.env.OPEN_NETWORK || false,
});

const appName = getAppName();

module.exports = {
  start() {
    const app = express();

    const pathPrefix = '/app';
    const mountPath = `${pathPrefix}/${appName}/`;

    app.use(cors());

    app.get('/', (req, res) => {
      res.redirect(`http://localhost:${port}${pathPrefix}/${appName}/`);
    });

    app.get(`${pathPrefix}/${appName}`, (req, res, next) => {
      if (req.url[req.url.length - 1] !== '/') {
        res.redirect(`${pathPrefix}/${req.params.appName}/`);
      } else {
        next();
      }
    });

    const configOptions = getDefaultConfigOptions();
    const webpackConfig = getWebpackConfig(configOptions);
    const compiler = webpack(webpackConfig);

    proxies.forEach(proxy => proxy(app));

    app.use(
      mountPath,
      webpackDev(compiler, {
        stats: verboseLogging
          ? {
              colors: true,
              chunks: false,
              chunkModules: false,
              children: false,
            }
          : 'minimal',
      }),
    );
    app.use(mountPath, express.static('public'));
    app.use(
      mountPath,
      webpackHot(compiler, {
        reload: true,
      }),
    );

    app.listen(configOptions.port, configOptions.openNetwork ? '0.0.0.0' : '127.0.0.1');

    console.log(`dev server started on http://localhost:${configOptions.port}`);

    opn(`http://localhost:${configOptions.port}/app/${appName}/`);
  },
  async build() {
    const configOptions = getDefaultConfigOptions();
    const webpackConfig = getWebpackConfig(configOptions);
    const compiler = webpack(webpackConfig);

    return new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          return reject(new Error(err));
        }

        console.log(
          stats.toString({
            chunks: false, // Makes the build much quieter
            colors: true, // Shows colors in the console
          }),
        );

        if (stats.hasErrors()) {
          return reject(new Error('There were compilation errors. See stats above for more details'));
        }

        const outputPath = webpackConfig.output.path;
        if (!fs.existsSync(outputPath)) {
          return reject(new Error(`Expected ${outputPath} to exist, but it wasn't generated`));
        }

        return resolve(outputPath);
      });
    });
  },
};
