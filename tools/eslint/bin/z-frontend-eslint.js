#!/bin/bash

# this is really a shell script, but yarn or lerna won't create the binary correctly unless this has a .js extension

../../node_modules/eslint-config-z-frontend/node_modules/.bin/eslint --ignore-path ../../.eslintignore --format '../../node_modules/eslint-friendly-formatter' **/*.js **/*.jsx
