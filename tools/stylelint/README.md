# stylelint-config-z-frontend

Provides a stylelint configuration to be used by packages in this repo.

## Installation

Update `package.json` as follows:

1.  Add to `devDependencies`: `"stylelint-config-z-frontend": "*",`.
1.  Add to `scripts`: `"stylelint": "z-frontend-stylelint",`
1.  Update `lint` script to include `yarn stylelint`

Configuration comes from `stylelintrc.js` at the root.

## Usage

Runs as part of `yarn lint`.

## Editor support

### VS Code

If you install the recommended extensions, you should be done. Otherwise:

- Install the [vscode-stylelint](https://github.com/shinnn/vscode-stylelint) extension
- Add the following to your user settings:

```json
"stylelint.enable": true,
"css.validate": false,
"scss.validate": false,
"stylelint.additionalDocumentSelectors": [
  "typescriptreact",
  "js",
  "jsx",
  "ts",
  "tsx"
]
```
