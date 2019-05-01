const { getAppPackages } = require('../getAllPackages');

async function getAppAndOwners() {
  const appPackages = getAppPackages();
  return appPackages.map(pkg => ({
    appName: pkg.name.replace('z-frontend-', ''),
    uiReviewer: pkg.json.zenefits.uiReviewer,
  }));
}

const getRuleForApp = ({ appName, uiReviewer }) =>
  console.log(`  ${appName}_app_uie:
    actions:
      pr_comment:
        comment_body: '@${uiReviewer}, this PR touches:'
    included_paths:
      - apps/${appName}/
    comment_filter:
      - '@${uiReviewer}'
    min_files: 1`);

async function run() {
  const appAndOwners = await getAppAndOwners();
  console.log('  ### Generated code begins');
  appAndOwners.forEach(getRuleForApp);
  console.log('  ### Generated code ends');
}

module.exports = {
  name: 'generateAppReviewsRules',
  info: 'Generates Sauron rules for App Reviewers',
  run,
};
