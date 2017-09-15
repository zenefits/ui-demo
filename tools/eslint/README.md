# eslint-config-z-frontend

Provides an eslint configuration to be used by packages in this repo.

## Installation

You shouldn't need to install this since all react apps and components will get this dependency from the root. The configuration for `eslint-config-z-frontend` is set at the root of the repo and apps generally don't need to override it. Apps could define their own `.eslintrc.js` if they need to override it.

`lerna bootstrap` command at the root of the repo covers dependencies installation for this package.

## Testing

`yarn test`
