#!/bin/bash

source ./ci/setup_env.sh
# TODO: collapse scripts in travis using travis_fold or similar
NODE_ENV=production lerna run build --parallel=false $RUN_SINCE

### deploys are disabled
# lerna run deploy $RUN_SINCE
# if [ $TRAVIS_PULL_REQUEST ] && [ $TRAVIS_PULL_REQUEST = "false" ] && [ $TRAVIS_BRANCH = "production" ]; then
#   echo "Activating $TRAVIS_COMMIT for production build";
#   lerna run activate $RUN_SINCE;
# elif [ $TRAVIS_PULL_REQUEST ] && [ $TRAVIS_PULL_REQUEST = "false" ] && [ $TRAVIS_BRANCH = "master" ]; then
#   echo "Activating $TRAVIS_COMMIT for master build. Only for those packages that implement `master-only-activate`";
#   lerna run master-only-activate $RUN_SINCE;
# else
#   echo "Deployed, but didn't activate anything";
# fi
