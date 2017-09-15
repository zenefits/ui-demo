# z-frontend-jest

Provides the necessary jest configuration to be used by packages in this repo.

## Installation

You need to install this and all its dependencies (see `package.json`). Jest looks for `jest.config.js` inside of your project, so you need to create the config file, then create and export a config using `z-frontend-jest` package:

```js
module.exports = require('z-frontend-jest')();
```

If you need to override the config, you could get the config, use it as a base and expose something different. 

**NOTE**: make sure you set tsconfig.json to jsx: "react", `preserve` doesn't work due to a [known limitation](https://www.npmjs.com/package/ts-jest#known-limitations-for-ts-compiler-options)

## Testing

This project is for configuration only, we currently don't have any tests for this package. 
