A Content Security Policy (CSP) helps to keep our frontend code secure.
We generally don't need to update it unless integrating with third party libraries.
[Read more](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

### Adding to the CSP

1. Add a new file under `policies` (as strict as possible)
1. Reference the new file in `policies/index.js` and `processCspParam.js`
1. Run tests (`yarn test`) and possibly `yarn test -u` to update snapshots

Your changes should also cause updates `preview-head.html` files. This happens
automatically during the pre-commit hook (see `lint-staged` section of `package.json`).
