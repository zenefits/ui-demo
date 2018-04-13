#!/bin/bash

source ./ci/setup_env.sh
lerna run test --concurrency 2 --parallel=false $RUN_SINCE
