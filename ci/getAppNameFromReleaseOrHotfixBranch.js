const { getAppNames } = require('../tools/scripts/src/getAllPackages');

const regEx = /^(release|hotfix)\/(.*)-v(.*)$/;

function getAppNameFromReleaseOrHotfixBranch(branchName) {
  if (branchName) {
    const matches = regEx.exec(branchName);

    if (matches && matches.length === 4) {
      const providedAppName = `z-frontend-${matches[2]}`;
      const validAppNames = getAppNames();
      if (!validAppNames.includes(providedAppName)) {
        throw new Error(
          `Invalid app name "${providedAppName}" in release/hotfix branch name. Example: provide "foo-bar" if package.json has "z-frontend-foo-bar".`,
        );
      }
      console.log(providedAppName);
      return providedAppName;
    }
  }
  return null;
}

const branchName = process.env.TRAVIS_BRANCH;
getAppNameFromReleaseOrHotfixBranch(branchName);

module.exports = {
  regEx,
  getAppNameFromReleaseOrHotfixBranch,
};
