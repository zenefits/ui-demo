# tslint-config-z-frontend

Provides an eslint configuration to be used by packages in this repo.

## Installation

Each package that uses typescript needs tslint-config-z-frontend, tslint and typescript packages.
Apps need to define their own `tslint.json` and extend this configuration:

```json
{
  "extends": "tslint-config-z-frontend"
}
```
