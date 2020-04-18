import {
  redirectIfNecessary,
  PrerequisiteRedirect,
} from '../../src/top-nav-bar/components/utils/prerequisiteRedirectUtil';

describe('Enforced Redirection in TopNavBar', () => {
  it('test redirectIfNecessary', () => {
    const redirect1: PrerequisiteRedirect = { id: '1' };
    redirect1.group = 'test-group';

    // do not redirect because this is a part of whitelist
    let redirected = redirectIfNecessary([], '/app/support-flow/', '/');
    expect(redirected).is.equal(false);

    // redirect; not a part of whitelist
    redirected = redirectIfNecessary([redirect1], '/app/company-setup/', '/');
    expect(redirected).is.equal(true);

    // don redirect; no redirect on dashboard
    redirected = redirectIfNecessary([redirect1], '/app/boot/', '/');
    expect(redirected).is.equal(false);

    redirected = redirectIfNecessary([redirect1], '/dashboard/', '/');
    expect(redirected).is.equal(false);

    // check redirection with hash
    redirected = redirectIfNecessary([redirect1], '/app/company-setup/', '/tasks_overview');
    expect(redirected).is.equal(true);

    // check redirection with hash
    redirected = redirectIfNecessary([], '/app/support-flow/', '/final');
    expect(redirected).is.equal(false);

    redirect1.group = 'actual-group';

    // do not redirect because this is group is not a part of the group whitelist
    redirected = redirectIfNecessary([], '/app/support-flow/', '/');
    expect(redirected).is.equal(false);
  });
});
