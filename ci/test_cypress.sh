#!/bin/bash

source ./ci/setup_env.sh

node ./ci/runScriptLerna.js cy:ci $RUN_SINCE
