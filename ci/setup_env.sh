#!/bin/bash

set -ex
if [ $TRAVIS_EVENT_TYPE ] && [ $TRAVIS_EVENT_TYPE = "cron" ]; then
  # export RUN_SINCE="7c89eb7e" # first commit
  export RUN_SINCE="" # empty string, no filter here means run everything
elif [ $TRAVIS_PULL_REQUEST ] && [ $TRAVIS_PULL_REQUEST = "false" ]; then
  # NOTE: HEAD~1 assumes a merge commit to master or production
  export RUN_SINCE="--since HEAD~1";
else
  export RUN_SINCE="--since $TRAVIS_BRANCH"
  git fetch origin $TRAVIS_BRANCH:$TRAVIS_BRANCH --depth=1;
fi
echo RUN_SINCE=$RUN_SINCE
lerna updated $RUN_SINCE --loglevel=error || true # swallow errors if there is nothing to build
