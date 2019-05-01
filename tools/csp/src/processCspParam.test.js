const contentSecurityPolicy = require('./processCspParam');
const mergeCsp = require('./mergeCsp');

test('contentSecurityPolicy generation overwrite defaults', () => {
  const appCsp = { 'default-src': ['https://*'], 'img-src': ['fb.com'] };
  expect(contentSecurityPolicy(appCsp)).toEqual('default-src https://*; img-src fb.com');
});

test('contentSecurityPolicy generation extends default', () => {
  const appContentSecurityPolicy = defaultCsp => {
    const appCsp = { 'default-src': ['https://*', "'unsafe-eval'"], 'img-src': ['fb.com'] };
    return mergeCsp(defaultCsp, appCsp);
  };

  expect(contentSecurityPolicy(appContentSecurityPolicy)).toMatchSnapshot();
});
