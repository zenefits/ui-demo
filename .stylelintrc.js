module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: ['stylelint-config-standard', 'stylelint-config-styled-components'],
  syntax: 'scss',
  rules: {
    'color-named': 'never',
    'color-no-hex': true,
    'comment-empty-line-before': null, // less readable in some cases
    'font-family-no-missing-generic-family-keyword': null, // icon fonts need no backup
    'max-nesting-depth': 2, // contributes to specificity bloat
    'no-descending-specificity': null, // awkward with selector nesting
    'string-quotes': 'single', // consistent with prettier
    'unit-whitelist': ['px', '%', 'deg', 'vh', 'vw', 's'], // avoid pt, mm, in etc
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-type-no-unknown': [true, { ignoreTypes: ['$dummyValue'] }],
    'selector-type-case': null,
  },
};
