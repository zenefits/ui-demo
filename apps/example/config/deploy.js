const generateZenefitsDeployEnv = require('ember-cli-deploy-zenefits/lib/environment-config'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function deployConfig(deployTarget) {
  const ENV = generateZenefitsDeployEnv({
    type: 'app',
    repoName: 'z-frontend',
    appName: 'example', // TODO: get actual app name
  });
  ENV.build.outputPath = './dist/';
  ENV.build.environment = deployTarget;

  return ENV;
};
