#!/bin/bash

source ./ci/setup_env.sh
# TODO: collapse scripts in travis using travis_fold or similar

# BUILD
NODE_ENV=production RUN_PART_START=66 RUN_PART_END=100 node ./ci/runScriptLerna.js build $RUN_SINCE

# DEPLOY
# PACKAGES_FROM_PREV_RUN=build node ./ci/runScriptLerna.js deploy $RUN_SINCE
# if [ $TRAVIS_PULL_REQUEST ] && [ $TRAVIS_PULL_REQUEST = "false" ] && [ $TRAVIS_BRANCH = "master" ]; then
#   echo "Activating $TRAVIS_COMMIT for master build. Only for those packages that implement `master-only-activate`";
#   CONCURRENT_EXEC_COUNT=1 PACKAGES_FROM_PREV_RUN=build node ./ci/runScriptLerna.js master-only-activate $RUN_SINCE;
# else
#   echo "Deployed, but didn't activate anything";
# fi

# CYPRESS TEST
CONCURRENT_EXEC_COUNT=1 PACKAGES_FROM_PREV_RUN=build node ./ci/runScriptLerna.js cy:ci $RUN_SINCE -- --reuse-assets
