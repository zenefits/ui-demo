#!/bin/bash

source ./ci/setup_env.sh
yarn run prettierCheck
lerna run lint --parallel=false  $RUN_SINCE
