#!/bin/bash

source ./ci/setup_env.sh
yarn run prettierCheck
# lerna run generateAppTypes --parallel=false --stream $RUN_SINCE -- --compare
# lerna run lint --parallel=false --stream $RUN_SINCE
node ./ci/runScriptLerna.js generateAppTypes $RUN_SINCE -- --compare
node ./ci/runScriptLerna.js lint $RUN_SINCE
# yarn run zcli securityAudit

