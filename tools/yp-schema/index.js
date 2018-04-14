const path = require('path');
const fs = require('fs');
const prettier = require('prettier');
const prettierConfig = require('../../prettier.config');
const _ = require('lodash');

// using a fork with a dirty fix for "Kind" import, a breaking change
// in the graphql package https://github.com/graphql/graphql-js/releases/tag/v0.13.0
// that we have in our locked graphql version (git://github.com/graphql/graphql-js.git#ed289645372f9bca17b5c8582c94ce4421445424)
const gqlGenTool = require('graphql-code-generator/packages/graphql-codegen-cli/dist/cli').executeWithOptions;

function getSchemaPaths(appRoot) {
  if (!appRoot) {
    throw new Error('appRoot is not defined for getSchemaPath util');
  }
  return {
    jsonPath: path.join(appRoot, 'schema/schema.json'),
    schemaTypesPath: path.join(appRoot, 'schema/schemaTypes.d.ts'),
    appTypesPath: path.join(appRoot, 'src/gqlTypes.d.ts'),
    fragmentTypesPath: path.join(appRoot, 'schema/fragmentTypes.json'),
  };
}

// e.g. cli command: gql-gen --file ../schema.json --template typescript --out ./typings/ "./src/**/*.tsx"

function generateTypes(options = {}) {
  const { files, generateDocuments, generateSchemaTypes, schemaPath } = options;
  return new Promise((resolve, reject) => {
    gqlGenTool({
      file: schemaPath,
      template: 'typescript',
      // out: outPath,
      args: files,
      documents: generateDocuments,
      schema: generateSchemaTypes,
    }).then(
      value => {
        // console.log('end gen', value);
        const resultStr = value[0].content;

        // check for clashing namespace names
        const exportedNamespaces = (resultStr.match(/export namespace (\S+) \{/g) || []).map(
          m => m.match(/export namespace (\S+) {/)[1],
        );

        if (exportedNamespaces.length !== _.uniq(exportedNamespaces).length) {
          const namesMap = exportedNamespaces.reduce((acc, v) => {
            acc[v] = acc[v] === undefined ? 1 : acc[v] + 1;
            return acc;
          }, {});
          const clashingNames = Object.keys(namesMap).filter(n => namesMap[n] > 1);
          return reject(new Error(`Query/Mutation names clash for ${clashingNames.join(', ')}`));
        }

        // prettify the result
        const prettifiedResultStr = prettier.format(
          resultStr,
          Object.assign(
            {
              parser: 'typescript',
            },
            prettierConfig,
          ),
        );

        resolve(prettifiedResultStr);
      },
      error => {
        console.log('yp-schema: types generation error', error);
        reject(error);
      },
    );
  });
}

module.exports = {
  generateTypes,
  getSchemaPaths,
};
