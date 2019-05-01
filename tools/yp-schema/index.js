const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('../../prettier.config');
const _ = require('lodash');
const graphql = require('graphql');
const fs = require('fs-extra');

const { generate } = require('graphql-code-generator');

const graphqlSchemaFileName = 'schema.generated.graphql';

function getSchemaPaths(appRoot) {
  if (!appRoot) {
    throw new Error('appRoot is not defined for getSchemaPaths util');
  }
  return {
    jsonPath: path.join(appRoot, 'schema/schema.json'),
    graphqlPath: path.join(appRoot, 'schema/', graphqlSchemaFileName),
    schemaTypesPath: path.join(appRoot, 'schema/schemaTypes.ts'),
    appTypesPath: path.join(appRoot, 'src/gqlTypes.d.ts'),
    fragmentTypesPath: path.join(appRoot, 'schema/fragmentTypes.json'),
  };
}

// e.g. cli command: gql-gen --file ../../../yourPeople3/graphql/schema.json --template typescript --out ./typings/ "./src/**/*.tsx"

async function generateTypes(options = {}) {
  const { files, generateDocuments, generateSchemaTypes, schemaPath } = options;
  let schemaPathForGenTool = schemaPath;
  const usingGraphqlSource = schemaPath.endsWith('.graphql');
  if (usingGraphqlSource) {
    // build JSON schema from .graphql schema
    const gqlSchema = fs.readFileSync(schemaPath).toString();
    const schema = graphql.buildSchema(gqlSchema);
    const jsonSchema = await graphql.graphql(schema, graphql.introspectionQuery);
    const randomInt = parseInt(Math.random() * 10 ** 10, 10);
    schemaPathForGenTool = path.join(__dirname, `/.tmp/jsonSchema.${randomInt}.json`);
    fs.outputFileSync(schemaPathForGenTool, JSON.stringify(jsonSchema, null, '  '));
  }

  // Workaround until we upgrade to >= 0.13.0 https://github.com/dotansimha/graphql-code-generator/issues/656
  process.env.CODEGEN_RESOLVERS = false;

  return new Promise((resolve, reject) => {
    generate(
      {
        schema: schemaPathForGenTool,
        template: 'graphql-codegen-typescript-template',
        // out: outPath,
        args: files,
        skipDocuments: !generateDocuments,
        skipSchema: !generateSchemaTypes,
      },
      false,
    ).then(
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

        if (usingGraphqlSource) {
          fs.unlinkSync(schemaPathForGenTool);
        }

        return resolve(prettifiedResultStr);
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
  graphqlSchemaFileName,
};
