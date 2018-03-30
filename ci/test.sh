#!/bin/bash

source ./ci/setup_env.sh
lerna run test --parallel=false $RUN_SINCE
