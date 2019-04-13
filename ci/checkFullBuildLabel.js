const checkFullBuildLabelUtil = require('./checkFullBuildLabelUtil');

const pullRequestId = process.env.TRAVIS_PULL_REQUEST;
const githubToken = process.env.GITHUB_TOKEN;

checkFullBuildLabelUtil(pullRequestId, githubToken).then(ciEnabledLabel => {
  if (ciEnabledLabel) {
    console.log('has label');
  } else {
    console.log('no label');
  }
  process.exit(0);
});
