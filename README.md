# z-frontend

[![Build Status](https://travis-ci.org/zenefits/ui-demo.svg?branch=master)](https://travis-ci.org/zenefits/ui-demo)

**NOTE:** as the name implies, this is for demo purposes. Use it for reference, but it may not be a a good idea to use as is. This project was extracted from what we use internally and may not be updated in a regular basis. If you're looking at it and find any issues, feeel free to open any issues. We would certainly appreciate your feedback and will give you some OS karma points in the form of an emoji. 

## Packages

This is the mono-repo for all (new) frontend apps at Zenefits. The mono-repo uses [lerna](github.com/lerna/lerna/) to help us run scripts across the different packages. Each package defines its own yarn dependencies and it can be developed, tested and deployed independently of other packages.

The repo is broken into 3 main areas:

* Apps: for now it's mostly react apps. It also contains an example app that is used as the template for other apps.
* Components: for now it's only react components. It contains forms elements, modals, wizards and other components
* Tools: re-usable configuration for linters, webpack and other infra pieces

At the root we also have another package, that contains global dependencies as well as tooling.


## Work with z-frontend
### Installation

* Install [nvm](https://github.com/creationix/nvm)
* Install node 8 using nvm `nvm install 8`
* Install [yarn](https://yarnpkg.com/lang/en/docs/install/#alternatives-tab)
* Install lerna `yarn global add lerna`

### Development

* Run `lerna bootstrap` at the root of the repo to install the node dependencies for all the packages in the mono-repo

Each [package](#packages) has its own README.md and you can find specifics of working on each app there, but most of them share the following set of commands.

* `yarn start` and `MOCK_MODE=true yarn start`
* `yarn build` and `NODE_ENV=production yarn build`
* `yarn test`
* `yarn lint`

When starting an app, you can set the following flags:

* MOCK_MODE (defaults: false). If true, it won't talk to the backend and instead use mocks
* YP_BASEURL (default:  http://localhost:8000). You can change it to proxy gimli or a spoof instead.
* GRAPHQL_BASEURL (default: http://localhost:3000). You can change it to https://zgraphql-dev-devservices.zncloud.net or https://zgraphql-devservices.zncloud.net to proxy master or our beta version of graphql.

### Deployment and activation

**Deployment:** means publishing the assets to AWS. This assets could be only accessed directly by using a specific URL.
**Activation:** promotes the deployed assets as the `default` version which makes them available to users on production.

Travis, as part of CI will deploy each PR to AWS and notify git of the new deployment. From that git notification you can access that particular verison of the app.
Travis will also deploy to production as soon as we merge to master.

### Creating an app

* Copy apps/example folder as apps/{your-app-name}
* Run `lerna bootstrap` at the root to install node dependencies for your new app

### Troubleshooting

  * Running `yarn` or `yarn add` on some packages may fail since lerna is responsible of creating symlinks between packages in this repo. If that is the case, manually modify `package.json` as needed and run `lerna boostrap` to install the dependencies.

  * If lerna can't be found after installing, make sure you ran `yarn global add lerna` with node version `8.2.*`.


## Conventions
### App folder structure and URLs

Category | File | URL | Example
--- | --- | --- | ---
Singleton | `resource/ResourceRoutes.tsx` | `/resource/*` | `/blog/BlogRoutes.tsx -> /blog/*`
Singleton | `resource/Resource.tsx` | `/resource` | `/blog/Blog.tsx -> /blog`
Collection | `resources/ResourcesRoutes.tsx` | `/resources/*` | `/articles/ArticlesRoutes.tsx -> /articles/*`
Collection | `resources/Resources.tsx` | `/resources` | `/articles/Articles.tsx -> /articles`
Instance | `resources/resource/ResourceRoutes.tsx` | `/resources/:id/*` | `/articles/article/ArticleRoutes.tsx -> /articles/:id/*`
Instance | `resources/resource/Resource.tsx` | `/resources/:id` | `/articles/article/Article.tsx -> /articles/:id/*`
Action | `[resource\|resources]/action/Action.tsx` | `/resource[s/:id]/action` | `/articles/new/New.tsx -> /articles/new`
Action | `[resource\|resources]/action/ActionRoutes.tsx` | `/resource[s/:id]/action/*` | `/articles/article/publish/PublishRoutes.tsx -> /articles/:id/publish/*`
Action | `[resource\|resources]/action/ActionStepX.tsx` |  `/resource[s/:id]/action/stepX` | `/articles/article/publish/PublishStep1.tsx -> /articles/:id/publish/step1`
Subresource | `[resource\|resources]/subresource/*.tsx` | `/resource[s/:id]/subresource` | `/blog/articles/comments/* -> /blog/articles/:id/comments/*`

#### Routes files
`XxxRoutes.tsx` files are always optional. They contain routing definitions and common layout for the corresponding route.  
It is not necessary to define a routes file for the route with only one page.

#### Actions
- An action is a VERB like `new`, `edit`, or `start`.
- The folder structure and URL are in same format as resource instance and Use VERB instead of NOUN.
- Action can be either simple or complex (multi-steps).

#### Example
```
/blog -> Singleton Resource
  /components
  /BlogRoutes.tsx -> Where to define routes and common layout
  /articles -> Resource collection
    /components
    /ArticlesRoutes.tsx
    /Articles.tsx
    /new -> Single step action
      /New.tsx
    /article -> Resource instance
      /ArticleRoutes.tsx
      /Article.tsx
      /publish -> Multi-step action
        /PublishRoutes.tsx
        /Publish.tsx
        /PublishStep1.tsx
        /PublishStep2.tsx
      /comments -> Single page subresource
        /Comments.tsx
```


## Resources

* [Flex](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [GraphQL](http://graphql.org/learn/queries/)
* [React](https://facebook.github.io/react/docs)
* [LoDash](https://lodash.com/docs)
* [Apollo React](http://dev.apollodata.com/react)
* [Apollo Server (Schema/Resolvers/Mocking)](http://dev.apollodata.com/tools/graphql-tools/resolvers.html)
* [Rebass](http://jxnblk.com/rebass/getting-started)
* [Faker](https://cdn.rawgit.com/Marak/faker.js/master/examples/browser/index.html) - random data generator
