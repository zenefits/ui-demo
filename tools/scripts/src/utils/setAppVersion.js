const getHeadCommit = require('./getHeadCommit');

module.exports = function setAppVersion(src, packageJsonVersion) {
  const sha = getHeadCommit(process.cwd(), true);
  return src.replace('<__APP_VERSION__>', `${packageJsonVersion}.${sha}`);
};
