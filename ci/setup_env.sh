#!/bin/bash

set -ex

LABEL_CHECK_RESULT="$(node ./ci/checkFullBuildLabel.js $TRAVIS_PULL_REQUEST)"
APP_NAME_FROM_RELEASE_OR_HOTFIX_BRANCH="$(node ./ci/getAppNameFromReleaseOrHotfixBranch.js $TRAVIS_BRANCH)"

if [ "${LABEL_CHECK_RESULT}" = "has label" ]; then
  echo "full CI label is applied to the PR, therefore running full CI"
  export RUN_SINCE="" # empty string, no filter here means run everything
elif [ $TRAVIS_EVENT_TYPE ] && [ $TRAVIS_EVENT_TYPE = "cron" ]; then
  echo "Cron job detected, running full CI"
  export RUN_SINCE="" # empty string, no filter here means run everything
elif [ $TRAVIS_PULL_REQUEST ] && [ $TRAVIS_PULL_REQUEST = "false" ] && [ ${TRAVIS_BRANCH} ] && [ ${TRAVIS_BRANCH} = "master" ]; then
  # NOTE: HEAD~1 assumes a merge commit and we take the left side.
  export RUN_SINCE="--since HEAD~1";
elif [ $TRAVIS_PULL_REQUEST ] && [ $TRAVIS_PULL_REQUEST = "false" ] && [ ${TRAVIS_BRANCH} ] && [ $APP_NAME_FROM_RELEASE_OR_HOTFIX_BRANCH ]; then
  # TODO: consider later to use a "fast-build" label or for hotfixes to ignore dependencies. For now, this is the safest option to always run all dependencies
  export RUN_SINCE="--scope=$APP_NAME_FROM_RELEASE_OR_HOTFIX_BRANCH --include-filtered-dependencies";  # Runs only the app we're deploying and its dependencies
else
  # For PR Builds, travis will `git checkout +refs/pull/{pullId}/merge:` which
  # fetches a merge commit from the PR into the HEAD of the base branch (master, production, etc)
  # in this case HEAD^1 means the HEAD of the base branch (e.g. master, production).
  # HEAD^2 is the head of the target branch (e.g. feature branch)
  export RUN_SINCE="--since HEAD^1"
fi

echo RUN_SINCE=$RUN_SINCE
lerna ls --all $RUN_SINCE --loglevel=error || true # swallow errors if there is nothing to build
