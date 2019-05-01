// @ts-check

const { regEx, getAppNameFromReleaseOrHotfixBranch } = require('./getAppNameFromReleaseOrHotfixBranch');

describe('getAppNameFromReleaseOrHotfixBranch', () => {
  it('Gets app name from release branch', () => {
    const appName = getAppNameFromReleaseOrHotfixBranch('release/company-hub-v0.1.1');
    expect(appName).toBe('z-frontend-company-hub');
  });

  it('Throws if branch name does not match valid app', () => {
    // user entered bad branch name: should be company-hub not company_hub
    const fn = () => getAppNameFromReleaseOrHotfixBranch('release/company_hub-v0.1.1');
    expect(fn).toThrowError(/Invalid app name/);
  });

  it('Matches release and hotfix branch pattern', () => {
    expect('release/talent-v1').toMatch(regEx);
    expect('release/talent-v1.2.3').toMatch(regEx);
    expect('release/hr/groups-v1.2.3').toMatch(regEx);
    expect('hotfix/talent-v1').toMatch(regEx);

    expect('feature/talent-v1').not.toMatch(regEx);
    expect('release/v1').not.toMatch(regEx);
    expect('release/appnamewithoutversion').not.toMatch(regEx);
    expect('hotfix/appnamewithoutversion').not.toMatch(regEx);
  });
});
