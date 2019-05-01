const mergeCsp = require('./mergeCsp');

test('mergeCsp overlapping directives', () => {
  const defaultCsp = { 'default-src': ["'self'", 'https://*'], 'form-action': [] };
  const appCsp = { 'default-src': ['https://*', 'google.com'], 'img-src': ['fb.com'] };
  const output = mergeCsp(defaultCsp, appCsp);
  expect(output).toEqual({
    'default-src': ["'self'", 'google.com', 'https://*'],
    'form-action': [],
    'img-src': ['fb.com'],
  });
});

test('mergeCsp empty app directives', () => {
  const defaultCsp = { 'default-src': ["'self'", 'https://*'] };
  const appCsp = {};
  const output = mergeCsp(defaultCsp, appCsp);
  expect(output).toEqual({ 'default-src': ["'self'", 'https://*'] });
});
