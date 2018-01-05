// @ts-check

const replaceEnvVars = require('./replaceEnvVars');

describe('replaceEnvVars', () => {
  it('should replace the env vars expressions by the values', () => {
    const src = `
      const x = process.env.TEST_FOO;
      const y = process.env['SOME-OTHER-VAR'];
      const z = process.env.THIRD_ONE;

      lorem ipsum
    `;

    const fooValue = 'test foo value';
    process.env.TEST_FOO = fooValue;
    const otherValue = 'true';
    process.env['SOME-OTHER-VAR'] = otherValue;

    const result = replaceEnvVars(src);
    expect(result).toContain(`const x = '${fooValue}';`);
    expect(result).toContain(`const y = '${otherValue}';`);
    expect(result).toContain(`const z = undefined;`);
  });
});
