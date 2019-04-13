The UI Platform Service Level Agreements are a commitment to consumers of the platform for us to maintain a minimum level on the specified categories. This also helps us prioritize work amongst seemingly larger priority items.

**NOTE: we're not meeting most SLAs and we're working outside of the current time frame to start meeting them so we can adhere to the commitment going forward.**

#### Time

The time is based on the severity, which is defined differently for each category. For bugs we'll use our standard severity and impact as a guideline.

- Critical: 2 days
- High: current sprint
- Medium: next sprint
- Low: withing the next 2 sprints

#### Areas

##### CI

Time to merge (not accounting for review).

- 95th `<` 10 minutes
- Median `<` 5 minutes
- App builds (no platform changes) `<` 5 minutes

**Current status:**

- We're far off and we don't have accurate measurements.
- Needs measurement: possible solution: move away from Travis or more expensive version of Travis https://matomo.org/blog/2014/10/introducing-ci-status-build-dashboard-travis-ci/
- Planned improvements: move to Jenkins to use better caching, update to Webpack 4, Babel 7 and TypeScript 2.8

##### Load times

- Time to first meaningful render:
  - Median `<` 500ms
  - 90th percentile `<` 1s
- Time to full render:
  - Median `<` 1s
  - 90th percentile `<` 2s

##### Activation time

- Time it takes to rollback or "activate" a previously built version (not accounting for CI)
  - `<` 1s for all z-frontend apps
  - `<` 60s for graphql schema (this could be easily improved if needed)
  - `<` 60s for canary/switch changes

##### Local build times

This is all about dev productivity and we track multiple metrics.

- Time it takes to see the changes refreshed in the browser:
  - 95th `<` 1s for apps, storybooks, styleguide, jest test and tests
- Time for a subsequent build
  - 95th `<` 30s
- Time for initial build (after `yarn install`, on a fresh clone or after wiping the build cache)
  - `<` 3 minutes
- Time to `yarn install` or `lerna bootstrap`
  - `<` 5 minutes

##### Maintain Libraries up to date

This is the time it takes from a minor or major release of a library until the time we merge that upgrade into master.

- Two weeks for standard cases
- Up to eight weeks for complicated cases with cross dependencies.

- Planned improvements: use greenkeeper or a similar product to automate the detection and updates, as we increase our test coverage, we should be able to confidently merge this out. For more complex cases, manual work will still be required.
