module.exports = {
  extends: [require.resolve('tslint-config-airbnb'), require.resolve('tslint-react')],
  rules: {
    'import-name': false, // disabled because `import React from 'react'`
    'variable-name': false, // disabled because Classes should use PascalCase and this rule doesn't recognize them e.g. MyComponent = styled.div
    'max-line-length': 120,
    'jsx-boolean-value': [true, 'never'], // match airbnb jsx rule https://github.com/airbnb/javascript/tree/master/react#props
    'jsx-no-lambda': false, // disable because it's a misconception about perf issues with lambdas in JSX

    // The following rules come from tslint-config-prettier (https://github.com/alexjoverm/tslint-config-prettier/blob/master/src/index.js)
    // We disabled some of them to provide better editor support
    // tslint (https://palantir.github.io/tslint/rules/)
    align: false,
    'arrow-parens': false,
    eofline: false,
    'import-spacing': false,
    indent: false,
    'linebreak-style': false,
    // "max-line-length": false,  // So the editor complains at 120
    'new-parens': false,
    'no-consecutive-blank-lines': false,
    'no-irregular-whitespace': false,
    'no-trailing-whitespace': false,
    'object-literal-key-quotes': false,
    'one-line': false,
    quotemark: false,
    // prettier puts a semicolon after bound methods, while without 'ignore-bound-class-methods' tslint fails on those
    semicolon: [true, 'always', 'ignore-bound-class-methods'],
    'space-before-function-paren': false,
    'trailing-comma': false,
    'typedef-whitespace': false,
    whitespace: false,

    // tslint-react (https://github.com/palantir/tslint-react)
    'jsx-alignment': false,
    'jsx-curly-spacing': false,
    'jsx-no-multiline-js': false,
    'jsx-wrap-multiline': false,

    // tslint-eslint-rules (https://github.com/buzinas/tslint-eslint-rules)
    'block-spacing': false,
    'brace-style': false,
    'no-multi-spaces': false,
    'object-curly-spacing': false,
    'space-in-parens': false,
    'ter-arrow-parens': false,
    'ter-arrow-spacing': false,
    'ter-indent': false,
    'ter-max-len': false,
    'ter-no-irregular-whitespace': false,
  },
};
