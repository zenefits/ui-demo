// NOTE: this has to be a CommonJS file since cosmos will require it directly
// before we boot webpack/typescript
// Unfortunately VSCode will try to convert it, but we can't disable this warning
// yet on a file by file basis see: https://github.com/Microsoft/vscode/issues/47299
module.exports = {
  rootPath: process.cwd(), // The cosmos command is ran from the app's folder
  webpackConfigPath: require.resolve('./webpack.config'),
  proxiesPath: require.resolve('./cosmos.proxies'),
};
