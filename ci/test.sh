#!/bin/bash

source ./ci/setup_env.sh

CONCURRENT_EXEC_COUNT=1 node ./ci/runScriptLerna.js test $RUN_SINCE

NODE_ENV=production node ./ci/runScriptLerna.js rn-build $RUN_SINCE
