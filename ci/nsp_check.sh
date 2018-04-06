#!/bin/bash

source ./ci/setup_env.sh
lerna run nsp --parallel=false $RUN_SINCE
