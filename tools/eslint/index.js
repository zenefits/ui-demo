function resolveExtends(...configs) {
  return configs.map(config => require.resolve(`eslint-config-${config}`));
}
module.exports = {
  extends: resolveExtends('airbnb', 'prettier', 'prettier/react'),
  // extends: resolveExtends('prettier', 'prettier/react'),
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  globals: {
    cy: true,
  },
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'react/prop-types': 'off', // TODO: enable later
    'react/forbid-prop-types': 'off', // TODO: enable later
    'jsx-a11y/no-static-element-interactions': 'off', // TODO: enable later
    'no-restricted-properties': ['error', { object: 'window', property: 'fetch' }],
    'no-restricted-globals': ['error', 'fetch', 'saveAs'],
    // 'jsx-a11y/label-has-for': 'off',
    // 'max-len': ['error', 120, 2, {
    //   ignoreUrls: true,
    //   ignoreComments: false,
    //   ignoreRegExpLiterals: true,
    //   ignoreStrings: true,
    //   ignoreTemplateLiterals: true,
    // }],
    // "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }]
  },
  plugins: ['react', 'import'],
  settings: {
    'import/parser': 'babel-eslint',
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src'],
    },
  },
};
