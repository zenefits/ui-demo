# Interim Deployment Improvements

## Current:

- We deploy every PR
- We activate based on the (merge) "commit message" based on the branch name.
  Conditions:
  - build branch = production
  - commit message contains matches '._talent-release._'
    In order to fullfil those conditions, teams send a PR where the base is production from a branch like talent-release-3.0.0-dummy-commit

### Problems with the current strategy

Different teams merge to production at different times, this causes some problems

- Confusion
- Team 2 can merge in advance of Team 1,
  - If Team 2's change include all of Team 1s changes (e.g. the changes were already in master) Team 1's PR will be considered merged. No activation will be done for Team 1 and they have to create a new PR with a dummy commit
  - If the PRs deferred, when Team 1 merges, it will also activate changes introduced by Team 1, which wasn't intended
- What we QE is different from what we build
- We need to build twice (on the PR) and then again for production, which introduces an extra delay.
- What we have in `production` (branch) isn't a good reflection of what is there, which leads to

## Final version

- Synchronize the deployment cadence with yp3
- Have a deployment dashboard and API to simply do rollbacks and releases to specific versions
- Add support for different versions
- More details on: [TODO](add link)

## Interim Solution

- Continue deploying every PR
- Open PRs against an `production/${short-app-name}` branch
- Activate the previously built SHA when merging (no need to rebuild)

### Tasks

- [x] Add an API (lamda or duplo) to "activate" (`ember deploy:activate SHA`)
- [x] Call that API from either Sauron or a GH webhook when merging a PR to any `production/${short-app-name}` branch
- [x] Create production branches per team
- [ ] Configure GitHub to require a fast forward merge for production branches
  - turns out this is not an option, but we can live with the merge commit
- [x] Auto-merge `production/${short-app-name}` to master or create a PR if it fails. This could potentially be done from the same `activate` API
- [x] Document the process, announce it and make sure all feature teams are familiar with it. Try it with one team at a time (Talent?)

#### Non-blocking

- [ ] Call this `activate` API from a slack bot
- [x] Send `activate` notifications to `#z-frontend-notify`
- [ ] Make sure that we only activate commits on top of a prior commit
- [ ] Add `rollback` API. Same as (`ember deploy:activate SHA`), but can be on a previous commit, but not diverging
      Can go back, but not back and forward at the same time.
