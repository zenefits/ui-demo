# z-frontend

## News

- 2018-05-16: [Changelog now available](https://github.com/zenefits/z-frontend/wiki/Changelog)
- 2018-04-05: [UIE and UIP Update presentation](https://docs.google.com/presentation/d/1e-RQdgIm29QuNRvgl9E4WM_mRPs-xg_p3-Oe5Eatkeo/edit?usp=sharing) and [Projects Timeline](https://confluence.inside-zen.com/display/ENG/UI+Projects+and+Timeline)
- 2018-03-29: [We hit 1000 PRs](https://github.com/zenefits/z-frontend/pull/1000)
- 2018-02-27: [UI Platform training workshop now available](apps/training)
- 2018-01-10: [General Availability of the new UI Platform](https://github.com/zenefits/z-frontend/wiki/Availability-of-the-new-UI-Platform)

## Repo Structure

This is the mono-repo for all (new) frontend apps at Zenefits. The mono-repo uses [lerna](https://github.com/lerna/lerna/) to help us run scripts across the different packages. Each package defines its own yarn dependencies and it can be developed, tested and deployed independently of other packages.

The repo is broken into 3 main areas:

- Apps: for now it's mostly react apps. It also contains an example app that is used as the template for other apps.
- Components: for now it's only react components. It contains forms elements, modals, wizards and other components
- Tools: re-usable configuration for linters, webpack and other infra pieces

At the root we also have another package, that contains global dependencies as well as tooling.

## Work with z-frontend

### Installation

- Install [nvm](https://github.com/creationix/nvm) `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash` (you might need reopen the terminal window or run `source ~/.bash_profile`)
- Install node 10 using nvm `nvm install 10`
- Install [yarn](https://yarnpkg.com/lang/en/docs/install/#alternatives-tab) `curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.3.2`
- Install lerna `npm i -g lerna@3`

It is recommended, but not required, to use [VS Code](https://code.visualstudio.com/) because it integrates so well with
Typescript. Once installed, it will prompt you to install our recommended extensions, which will provide an optimized
development experience.

### Development

- Run `lerna bootstrap` at the root of the repo to install the node dependencies for all the packages in the mono-repo

Each package has its own README.md and you can find specifics of working on each app there, but most of them share the following set of commands(these commands are to be run from the app folder):

- `yarn start` and `MOCK_MODE=1 yarn start`
- `yarn build` and `NODE_ENV=production yarn build`
- `yarn test`
- `yarn lint`

See the [testing guide](docs/testing.md) for helpful information on writing frontend tests.

#### App Development

When working end to end, you need to start graphql and yp3 on different shells:

```
$ cd yourPeople3 && uwsgi yourpeople/uwsgi-dev.ini --home /Users/mmadero/code/yourPeople3/venv # start yp3
$ cd yourPeople3/graphql && yarn start # start graphql
```

For full details about setting up and starting yp3 see [Local Machine Setup](https://confluence.inside-zen.com/pages/viewpage.action?spaceKey=ENG&title=Local+Machine+Setup+Guide)
For full details about setting up and starting graphql see [yp3/graphl's README](https://github.com/zenefits/yourPeople3/tree/master/graphql#to-run-server-locally)

When starting an app, you can also set the following flags:

- MOCK_MODE (default: false, true from jest). If true, it won't talk to the backend and instead use mocks. This is always true for tests.
- OPEN_NETWORK (default: false). If true, makes the localhost on the network accessible using the computer's IP address and the port.
- YP_BASEURL (default: http://localhost:8000). You can change it to proxy a spoof instead.
- GRAPHQL_BASEURL (default: http://localhost:3000). You can change it to https://zgraphql-dev-devservices.zncloud.net or https://zgraphql-devservices.zncloud.net to proxy our test or beta versions of graphql.

See the [testing guide](docs/testing.md) for helpful information on writing frontend tests.

### GraphQL workflow

See [z-frontend-yp-schema](https://github.com/zenefits/z-frontend/tree/master/tools/yp-schema#z-frontend-yp-schema) for the developer
workflow when making GraphQL schema or query/mutation/fragment updates.

### CI

We use [gondor](https://gondor-api-devservices.zncloud.net/g2) to run our builds. If you've used gondor in the past with yp3 you may notice a few known issues with the integration. The feature gaps are due to the fact that we recently moved from travis ci to gondor, but we're workin on them!

- Currently the `log` tab for a gondor tasks doesn't work. However, all logs can be found in the `traceback` tab
- Can't filter gondor plans by repository
- All builds (including master builds) are run with purpose = `buildkite`
- No tests owners are currently set

### Deployment and activation

**Deployment** means publishing the assets to AWS. These assets can only be accessed directly by using a specific URL.

**Activation** promotes the deployed assets as the default version which makes them available to users on production.

As part of CI, Gondor will deploy each build (PRs and standard branches) to AWS and notify GitHub of the new deployment. From that notification you can access that particular version of the app.

#### Hotfix process

The fastest way to get back to a good state is to use the [Deployment Dashboard](https://console.zenefits.com/app/deployment-dashboard/#/console/history/example) to reactive an earlier version of your app. This does not require CI, so it's very fast. Then do a normal release with the fix.

#### Release process

Currently, each team takes care of releasing to production on their own cadence and cycle.

Steps to release/activate:

1.  Create release branch from master in this format: `release/{appname}-v{version}`. Example: `git checkout -b release/{appname}-v0.1.0`
2.  Add commits as necessary
3.  Push the branch
4.  Create PR with base branch `production-{appname}`, head branch `release/{appname}-v{version}`. For first-time app deployment, you'll need to create the base branch `production-{appname}`.
5.  Do QA, wait for build etc
6.  Merge the PR

At this point, our [deploy service](https://github.com/zenefits/z-frontend/tree/master/services/deployment) will activate
the build and merge `production-{appname}` into master.

Note:

1. If there is no file change in the release PR, it will not activate the new build
2. If a previous release PR is merged but no new build is activated, the production-xxx branch can have merge commits that are not in master branch. This will cause a diverged status between the production-xxx branch and master branch and later release PRs might not get new builds activated. To solve this, merge the production-xxx branch back to master branch and then do a new release PR.

#### App URLs:

| AppName        | Host                                                                                  | URL              |
| -------------- | ------------------------------------------------------------------------------------- | ---------------- |
| styleguide     | ui.zenefits.com                                                                       | /                |
| apps/{appName} | \*spoof.zenefits.com, beta.zenefits.com, secure.zenefits.com and console.zenefits.com | `/app/{appName}` |

### Branching model

We're following a slightly modified version of [git-flow](https://danielkummer.github.io/git-flow-cheatsheet/)

- `master` is our main development branch, equivalent to `develop` in standard gitflow. Cut feature branches from here.
- `release/*` used for releases. Cut from master. Merges to `production` and cascades to `master` when complete.
- `production` reflects what's "active" in production, used for activations, during build. Equivalent to master in standard gitflow.
- `hotfix/*` used for hotfixes. Merges directly into `production` and cascades from there to `release/*` and `master`

**NOTE:** these above is changing based on a new release process. Details coming soon.

### Creating an app

```
yarn zcli newApp my-new-app
lerna bootstrap
cd apps/my-new-app
MOCK_MODE=1 yarn start
```

Make sure the `port` number in package.json is unique among all apps.

Make a separate PR with just the new files created by the newApp command.

### Creating a UI platform component module

1.  Copy `components/example` and change folder name.
1.  Update `package.json`. Remember to change the portal for `start` script so that there is no conflict to other modules.

### Troubleshooting

- Running `yarn` or `yarn add` on some packages may fail since lerna is responsible of creating symlinks between packages in this repo. If that is the case, manually modify `package.json` as needed and run `lerna bootstrap` to install the dependencies.

- If lerna can't be found after installing, make sure you ran `yarn global add lerna`.

- If `lerna bootstrap` or `yarn install` fail, you may have a yarn version that is too new. Install a specific version (eg 1.3.2) with
  `curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version <version>`

### Creating a changelog

To keep product engineers updated on platform changes, we regularly send updates via slack to `#dev-announcements` and email to engineers@zenefits.com, product@zenefits.com.

Process:

1.  Open the [changelog](https://github.com/zenefits/z-frontend/wiki/Changelog) and find the date of the last update
1.  Open all relevant PRs since the last update: `yarn zcli changelog <date>` (eg 2018-10-26)
1.  Flip through each PR and record a line for each relevant one using prefix 'New', 'Changed' or 'Fixed'). Include links for more details as much as possible. Changes that a product engineeer will likely not care about do not need to be included.

## Conventions

### Coding style

In most cases, our use of Prettier automates coding style if you have it configured in your IDE.

Component filenames must be CamelCase, as per React conventions. Folder and package names, on the other hand, use `kebab-case`. For example: `date-time-text/DateTimeText.tsx`.

Otherwise, please refer to our [Javascript style guide](https://github.com/zenefits/javascript). Although this is not Typescript specific, most Typescript constructs should be covered.

### App folder structure and corresponding URLs

| Category    | File                                           | URL                                | Example                                                                       |
| ----------- | ---------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| Singleton   | `resource/Resource.tsx`                        | `/resource`                        | `/blog/Blog.tsx` -> `/blog`                                                   |
| Singleton   | `resource/ResourceRoutes.tsx`                  | `/resource/*`                      | `/blog/BlogRoutes.tsx` -> `/blog/*`                                           |
| Collection  | `resources/Resources.tsx`                      | `/resources`                       | `/articles/Articles.tsx` -> `/articles`                                       |
| Collection  | `resources/ResourcesRoutes.tsx`                | `/resources/*`                     | `/articles/ArticlesRoutes.tsx` -> `/articles/*`                               |
| Instance    | `resources/resource/Resource.tsx`              | `/resources/:id`                   | `/articles/article/Article.tsx` -> `/articles/:id/*`                          |
| Instance    | `resources/resource/ResourceRoutes.tsx`        | `/resources/:id/*`                 | `/articles/article/ArticleRoutes.tsx` -> `/articles/:id/*`                    |
| Action      | `resource[s/resource]/action/Action.tsx`       | `/resource[s/:id]/action`          | `/articles/new/New.tsx` -> `/articles/new`                                    |
| Action      | `resource[s/resource]/action/ActionRoutes.tsx` | `/resource[s/:id]/action/*`        | `/articles/article/publish/PublishRoutes.tsx` -> `/articles/:id/publish/*`    |
| Action      | `resource[s/resource]/action/ActionStepX.tsx`  | `/resource[s/:id]/action/stepX`    | `/articles/article/publish/PublishStep1.tsx` -> `/articles/:id/publish/step1` |
| Subresource | `resource[s/resource]/subresource/*.tsx`       | `/resource[s/:id]/subresource[/*]` | `/blog/articles/article/comments/*.tsx` -> `/blog/articles/:id/comments/*`    |

#### Routes files

`XxxRoutes.tsx` files are always optional. They contain routing definitions and common layout for the corresponding route.
It is not necessary to define a routes file for the route with only one page.

#### Actions

- An action is a VERB like `new`, `edit`, or `start`.
- The folder structure and URL are in same format as resource instance and Use VERB instead of NOUN.
- Action can be either simple or complex (multi-steps).

#### `/components` directories

z-frontend apps distinguish between route components and non-route components.

- Route components are:
  - The `XxxRoutes.tsx` components.
  - The components that receive route props (e.g. `match`, `location`) from react-router. For example, via `<Route component={ARouteComponent} />`.
- Non-route components are all other React components.

By convention, non-route components are put under `/components` directory, while route components are not.

#### Example

```
/blog                       // Singleton resource
  /BlogRoutes.tsx           // Where to define routes and common layout
  /articles                 // Resource collection
    /ArticlesRoutes.tsx
    /Articles.tsx
    /new                    // Single step action
      /New.tsx
    /article                // Resource instance
      /components           // Non-route components
        /Title.tsx
      /ArticleRoutes.tsx
      /Article.tsx
      /publish              // Multi-step action
        /PublishRoutes.tsx
        /Publish.tsx
        /PublishStep1.tsx
        /PublishStep2.tsx
      /comments             // Single page subresource
        /Comments.tsx
```

## Resources

- [Flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [GraphQL](http://graphql.org/learn/queries/)
- [React](https://facebook.github.io/react/docs)
- [Lodash](https://lodash.com/docs)
- [Apollo React](http://dev.apollodata.com/react)
- [Apollo Server (Schema/Resolvers/Mocking)](http://dev.apollodata.com/tools/graphql-tools/resolvers.html)
- [Faker](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html) - random data generator
