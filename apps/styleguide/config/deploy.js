const generateZenefitsDeployEnv = require('ember-cli-deploy-zenefits/lib/environment-config'); // eslint-disable-line import/no-extraneous-dependencies

function getDeployConfig(deployTarget) {
  // see https://github.com/zenefits/ember-cli-deploy-zenefits/blob/beta/lib/environment-config.js
  const ENV = generateZenefitsDeployEnv({
    type: 'app',
    repoName: 'z-frontend',
    appName: 'styleguide',
    s3: { bucket: 'ui.zenefits.com', region: 'us-east-1' },
  });

  ENV.s3.prefix = '';
  ENV['s3-index'].prefix = '';
  ENV.build.outputPath = './dist/';
  ENV.build.environment = deployTarget;

  const customDomainUrl = ENV['github-deployment-status'].targetUrl.replace(
    'beta.zenefits.com/app/styleguide',
    'ui.zenefits.com',
  );
  ENV['github-deployment-status'].targetUrl = customDomainUrl;
  return ENV;
}

module.exports = getDeployConfig;
