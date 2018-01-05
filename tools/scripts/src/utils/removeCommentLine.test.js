// @ts-check

const { removeCommentLine, COMMENT } = require('./removeCommentLine');

describe('removeCommentLine', () => {
  it('should remove all lines with specified comment', () => {
    const src = `

      const foo = process.env.TEST_FOO;
      const bar = process.env['SOME_OTHER_VAR']; // ${COMMENT}${'  '}
      const x = 1;
      const y = 2; // ${COMMENT}
      const z = 3;
    `;

    const result = removeCommentLine(src);

    expect(result).not.toContain('const bar');
    expect(result).toContain('const foo');
    expect(result).toContain('const x');
    expect(result).not.toContain('const y');
    expect(result).toContain('const z');
  });
});
