# z-frontend

This is the mono-repo for all (new) frontend apps at Zenefits. The mono-repo uses [lerna](github.com/lerna/lerna/) to help us run scripts across the different packages. Each package defines its own yarn dependencies and it can be developed, tested and deployed independently of other packages.

The repo is broken into 3 main areas:

* Apps: for now it's mostly react apps. It also contains an example app that is used as the template for other apps.
* Components: for now it's only react components. It contains forms elements, modals, wizards and other components
* Tools: re-usable configuration for linters, webpack and other infra pieces

At the root we also have another package, that contains global dependencies as well as tooling.


## Installation

* Install [nvm](https://github.com/creationix/nvm)
* Install node 8 using nvm `nvm install 8`
* Install [yarn](https://yarnpkg.com/lang/en/docs/install/#alternatives-tab)
* Install lerna `yarn global add lerna`

## Development

* Run `lerna bootstrap` at the root of the repo to install the node dependencies for all the packages in the mono-repo

Each package has its own README.md and you can find specifics of working on each app there, but most of them share the following set of commands.

* `yarn start` and `MOCK_MODE=true yarn start`
* `yarn build` and `NODE_ENV=production yarn build`
* `yarn test`
* `yarn lint`

## Deployment and activation

**Deployment:** means publishing the assets to AWS. This assets could be only accessed directly by using a specific URL.
**Activation:** promotes the deployed assets as the `default` version which makes them available to users on production.

Travis, as part of CI will deploy each PR to AWS and notify git of the new deployment. From that git notification you can access that particular verison of the app.
Travis will also deploy to production as soon as we merge to master.

## Creating an app

* Copy apps/example folder as apps/{your-app-name}
* Run `lerna bootstrap` at the root to install node dependencies for your new app

## Troubleshooting

  * Running `yarn` or `yarn add` on some packages may fail since lerna is responsible of creating symlinks between packages in this repo. If that is the case, manually modify `package.json` as needed and run `lerna boostrap` to install the dependencies.

  * If lerna can't be found after installing, make sure you ran `yarn global add lerna` with node version `8.2.*`.

