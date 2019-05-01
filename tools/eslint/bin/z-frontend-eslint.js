#!/usr/bin/env node

const path = require('path');
const findUp = require('find-up').sync;
const eslintFriendlyFormatterPath = path.dirname(require.resolve("eslint-friendly-formatter/package.json"));
const eslintIgnorePath = findUp('.eslintignore');

const params = ['ignored-by-eslint', 'ignored-by-eslint',
  '--ignore-path',
  eslintIgnorePath,
  '--format',
  eslintFriendlyFormatterPath,
  '**/*.js',
  '**/*.jsx',
];

require("eslint/lib/cli").execute(params);
