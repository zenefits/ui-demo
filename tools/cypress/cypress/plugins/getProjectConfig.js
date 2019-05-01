const path = require('path');
const assert = require('assert');

function getPort(projectPath) {
  const packageJson = require(path.join(projectPath, '/package.json')); // eslint-disable-line import/no-dynamic-require, global-require
  assert(
    packageJson.config && packageJson.config.port,
    "A port needs to be specified on the project's package.json config",
  );
  return packageJson.config.port;
}

function getProjectConfig(config) {
  assert(
    config.env && config.env.projectPath,
    'A projectPath needs to be provided via config.env.projectPath (or --env projectPath=<projectPath>',
  );
  const { projectPath } = config.env;
  const port = getPort(projectPath);

  const projectName = path.basename(projectPath);

  let baseUrlPath = '';
  const projectPathArr = projectPath.split('/');
  if (projectPathArr[projectPathArr.length - 2] === 'apps') {
    baseUrlPath = `/app/${projectName}`;
  }
  const baseUrl =
    process.env.CYPRESS_BASEURL === undefined ? `http://localhost:${port}${baseUrlPath}` : process.env.CYPRESS_BASEURL;

  return Object.assign({}, config, {
    baseUrl,
    video: false,
    screenshots: false,
    // screenshotsFolder: path.join(projectPath, 'cypress/screenshots'),
    // supportFile: path.join(appPath, 'cypress/support'),
    fixturesFolder: path.join(projectPath, 'cypress/fixtures'),
    // TODO: come up with a better name
    // should probably be "./" to support tests alongside code
    integrationFolder: path.join(projectPath, 'cypress/no-backend'),
    // videosFolder: path.join(projectPath, 'cypress/videos'),
  });
}

module.exports = getProjectConfig;
