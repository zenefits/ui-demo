const { generateStorybookDeployConfig } = require('./');

describe('Given the correct process.env for a production deployTarget', () => {
  beforeAll(() => {
    delete process.env.AWS_ACCESS_KEY_ID;
    delete process.env.AWS_SECRET_ACCESS_KEY;
    delete process.env.GITHUB_TOKEN;
    delete process.env.BUILD_SHA;
    delete process.env.NOTIFICATION_SHA;
    process.env.AWS_ACCESS_KEY_ID = 'FAKE_AWS_ACCESS_KEY_ID';
    process.env.AWS_SECRET_ACCESS_KEY = 'FAKE_AWS_SECRET';
    process.env.GITHUB_TOKEN = 'FAKE_GITHUB_TOKEN';
    process.env.TRAVIS_PULL_REQUEST_SHA = 'FAKE_TRAVIS_PULL_REQUEST_SHA';
    process.env.TRAVIS_COMMIT = 'FAKE_TRAVIS_COMMIT';
  });
  describe('generateStorybookDeployConfig', () => {
    it('matches snapshot using travis env vars', () =>
      expect(generateStorybookDeployConfig('production')).toMatchSnapshot());
    it('matches snapshot using gondor env vars', () => {
      process.env.BUILD_SHA = 'FAKE_SHA';
      process.env.NOTIFICATION_SHA = 'FAKE_NOTIFICATION_SHA';
      expect(generateStorybookDeployConfig('production')).toMatchSnapshot();
    });

    it('uses the correct s3prefix', () => {
      const config = generateStorybookDeployConfig('production');
      expect(config.s3.prefix).toEqual('app/stories');
      expect(config['s3-index'].prefix).toEqual('app/stories');
    });
  });
});
