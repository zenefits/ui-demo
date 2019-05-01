#!/bin/bash
echo "do not need a visual test so faking status from chromatic...";
curl -v \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{ "state": "success", "description": "No component changes detected — skipped visual tests", "context": "ci/chromatic"}' \
  https://api.github.com/repos/zenefits/z-frontend/statuses/$NOTIFICATION_SHA
