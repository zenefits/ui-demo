const generateZenefitsDeployEnv = require('ember-cli-deploy-zenefits/lib/environment-config'); // eslint-disable-line import/no-extraneous-dependencies

module.exports.generateStorybookDeployConfig = function generateStorybookDeployConfig(deployTarget) {
  // see https://github.com/zenefits/ember-cli-deploy-zenefits/blob/beta/lib/environment-config.js
  const ENV = generateZenefitsDeployEnv({
    type: 'app',
    repoName: 'z-frontend',
    appName: 'stories',
    s3: { bucket: 'ui.zenefits.com', region: 'us-east-1' },
  });

  ENV.s3.filePattern = '{**,docs}/*.{js,css,png,gif,ico,jpg,map,xml,txt,svg,swf,eot,ttf,woff,woff2,otf}';
  ENV.build.outputPath = './storybook-static/';
  ENV.build.environment = deployTarget;

  const customDomainUrl = ENV['github-deployment-status'].targetUrl.replace('beta.zenefits.com', 'ui.zenefits.com');
  ENV['github-deployment-status'].targetUrl = customDomainUrl;

  // We use s3-index twice, once to upload index.html and once to upload iframe.html
  ENV.pipeline = {
    alias: {
      's3-index': {
        as: ['s3-index', 's3-iframe'],
      },
    },
  };

  ENV['s3-iframe'] = {
    ...ENV['s3-index'],
    filePattern: 'iframe.html',
  };

  return ENV;
};
