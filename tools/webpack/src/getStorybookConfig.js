/* eslint-disable no-param-reassign */

const path = require('path');

const rules = require('./rules');
const plugins = require('./plugins');

const getConfig = pathToManagerEntrypoint => (baseConfig, env, defaultConfig) => {
  // console.log(`get storybook webpack config for env: ${env}`, baseConfig.module.rules);

  /**
   * fix code loaders in defaultConfig
   */

  // add mjs, ts and tsx
  defaultConfig.resolve.extensions = ['.mjs', '.js', '.jsx', '.ts', '.tsx'];

  // add ts and tsx
  defaultConfig.module.rules[0].test = /\.(jsx|js|ts|tsx)$/;

  // by default "include" is defined and has only current package
  // deleting "include" param so storybook can transpile imports from out of this package (other z-packages)
  // excluding node_modules with "exclude" param
  delete defaultConfig.module.rules[0].include;
  defaultConfig.module.rules[0].exclude = [/\/node_modules\//];

  // in production env storybook adds babel-preset-minify right after preset-env, but before our babel.config
  // so minification messes with types and typescript preset doesn't remove them
  // to fix this - placing typescript preset as the very first preset
  if (env.toLowerCase() === 'production') {
    defaultConfig.module.rules[0].use[0].options.presets.unshift(require.resolve('@babel/preset-typescript'));
  }

  defaultConfig.module.rules.unshift(rules.getMjsRule());

  // storysource addon: https://github.com/storybooks/storybook/tree/next/addons/storysource
  defaultConfig.module.rules.push(rules.getStorySourceAddonRule());

  // this is .d.ts file, they are ignored by babel, but we are re-exporting types from it, and webpack/jest
  // get confused by export from non-existing (or empty) file
  defaultConfig.resolve.alias['./wizardGraphqlTypes'] = path.resolve(__dirname, 'emptyModule.js');

  // We use our own manager/index.js to allow us to use a custom iframe url which we need for fingerprinted iframe files
  if (pathToManagerEntrypoint) {
    defaultConfig.entry.manager = defaultConfig.entry.manager.map(entry => {
      if (entry.includes('manager/index.js')) {
        return pathToManagerEntrypoint;
      }
      return entry;
    });
  }

  /**
   * add our rules and plugins
   */

  // adding image loader
  baseConfig.module.rules.push(rules.getImageRule());
  baseConfig.module.rules.push(rules.getCoveoSvgRule());

  const commitSha = process.env.BUILD_SHA || process.env.TRAVIS_COMMIT;
  baseConfig.plugins.push(
    plugins.createDefinePlugin({
      isStorybook: true,
      otherDefinitions: {
        __STORYBOOK_IFRAME_URL__: commitSha
          ? JSON.stringify(encodeURIComponent(`iframe.html:${commitSha}`))
          : JSON.stringify('iframe.html'),
      },
    }),
  );

  // ignoring typescript types imports related warnings
  baseConfig.plugins.push(plugins.createWarningFilterPlugin());

  return defaultConfig;
};

module.exports = getConfig;
