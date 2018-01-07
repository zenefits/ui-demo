#!/bin/bash

# this is really a shell script, but yarn or lerna won't create the binary correctly unless this has a .js extension

../../node_modules/stylelint-config-z-frontend/node_modules/.bin/stylelint '**/*.tsx'
