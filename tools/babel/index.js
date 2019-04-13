// All babel config needs to be in one file, since babel caching mechanism won't check other "require"d modules/file

const packageRoots = require('../../lerna.json').packages;

const plugins = [
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  ['@babel/plugin-proposal-class-properties', { loose: true }],
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-object-rest-spread',
  ['@quickbaseoss/babel-plugin-styled-components-css-namespace', { rawCssNamespace: '&&&&' }],
  'babel-plugin-styled-components',
];

const envConfigs = {
  development: {
    loose: true,
    modules: false,
    targets: {
      chrome: 59,
    },
  },

  production: {
    loose: true,
    modules: false,
    targets: {
      browsers: ['last 2 versions', 'safari >= 7'],
      ie: 11,
    },
  },

  test: { targets: { node: 'current' } },
};

module.exports = function babelConfig(api) {
  const env = process.env.BABEL_ENV || process.env.NODE_ENV || 'development';
  // console.log(`\nbabel env: ${env}`);

  api.cache(() => env);

  const resultPlugins = plugins.slice();
  if (env === 'test') {
    resultPlugins.push('babel-plugin-require-context-hook', 'dynamic-import-node-babel-7');
  }

  const resultEnvConfig = envConfigs[env];

  return {
    // need to explicitly define package roots that need to be transpiled,
    // otherwise babel will transpile only current package files
    // more info: https://babeljs.io/docs/en/options#babelrcroots
    babelrcRoots: packageRoots.map(p => `${__dirname}/../../${p}`),

    presets: ['@babel/preset-typescript', ['@babel/preset-env', resultEnvConfig], '@babel/preset-react'],
    plugins: resultPlugins,
  };
};
