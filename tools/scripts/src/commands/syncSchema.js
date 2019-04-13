// @ts-check
/* eslint-disable no-underscore-dangle, no-param-reassign */

const fs = require('fs-extra');
const { spawn } = require('child_process');
const fetch = require('node-fetch');
const path = require('path');
const { introspectionQuery, buildClientSchema, printSchema } = require('graphql');
const { getSchemaPaths, generateTypes } = require('z-frontend-yp-schema');
const prettier = require('prettier');
const prettierConfig = require('../../../../prettier.config');
const getHeadCommit = require('../utils/getHeadCommit');

const run = () => {
  let server;
  const PORT = '3001';
  const serverUrl = `http://localhost:${PORT}`;
  const schemaPaths = getSchemaPaths(process.cwd());
  const yp3Path = path.resolve(process.env.YP3 || path.join(__dirname, '../../../../../yourPeople3'));

  try {
    if (!fs.statSync(yp3Path).isDirectory()) {
      throw new Error('not a dir');
    }
    if (!fs.statSync(path.join(yp3Path, 'graphql')).isDirectory()) {
      throw new Error('not a dir');
    }
  } catch (e) {
    console.log(
      `\n\nERROR!\nyourPeople3 repo not found in "${yp3Path}".\n` +
        `Please define a path for your yourPeople3 repo folder using YP3 env variable:\n` +
        `example: "YP3=../yp3 yarn run ..."\n\n`,
    );
    process.exit(1);
  }

  function prettifyJson(inputObject) {
    return prettier.format(
      JSON.stringify(inputObject, undefined, '  '),
      Object.assign(
        {
          parser: 'json',
        },
        prettierConfig,
      ),
    );
  }

  function prettifyGraphql(graphqlString) {
    return prettier.format(
      graphqlString,
      Object.assign(
        {
          parser: 'graphql',
        },
        prettierConfig,
      ),
    );
  }

  function loadSchema() {
    return fetch(`${serverUrl}/graphql?`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: serverUrl,
      },
      body: JSON.stringify({ query: introspectionQuery }),
    })
      .then(result => result.json())
      .then(json => {
        const headCommit = getHeadCommit(yp3Path);

        // remove existing schema.json since we use .graphql file for schema now
        if (fs.existsSync(schemaPaths.jsonPath)) {
          fs.unlink(schemaPaths.jsonPath);
        }

        const schema = buildClientSchema(json.data);
        const graphqlSchemaStr = `"""\nschema generated using server commit ${headCommit}\n"""\n\n${printSchema(
          schema,
        )}`;

        console.log(`[2/4] schema loaded (${schemaPaths.graphqlPath}) ✅\n`);

        fs.outputFileSync(schemaPaths.graphqlPath, prettifyGraphql(graphqlSchemaStr));

        console.log('[3/4] generating typescript types for schema');
        return generateTypes({
          files: [],
          generateDocuments: false,
          generateSchemaTypes: true,
          schemaPath: fs.existsSync(schemaPaths.graphqlPath) ? schemaPaths.graphqlPath : schemaPaths.jsonPath,
        });
      })
      .then(generatedTypesStr => {
        console.log(`[3/4] types generated (${schemaPaths.schemaTypesPath}) ✅\n`);
        fs.outputFileSync(schemaPaths.schemaTypesPath, generatedTypesStr);

        // delete old file with .d.ts extension
        const oldFileName = schemaPaths.schemaTypesPath.replace('.ts', '.d.ts');
        if (fs.existsSync(oldFileName)) {
          fs.unlinkSync(oldFileName);
        }
      });
  }

  /**
   * download types for apollo/IntrospectionFragmentMatcher
   * https://www.apollographql.com/docs/react/advanced/fragments.html#fragment-matcher
   */
  function loadTypes() {
    console.log('[4/4] loading fragment types for schema');
    return fetch(`${serverUrl}/graphql?`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: serverUrl,
      },
      body: JSON.stringify({
        query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
      }),
    })
      .then(result => result.json())
      .then(result => {
        // here we're filtering out any type information unrelated to unions or interfaces
        const filteredData = result.data.__schema.types.filter(type => type.possibleTypes !== null);
        result.data.__schema.types = filteredData;
        fs.outputFileSync(schemaPaths.fragmentTypesPath, prettifyJson(result.data));
        console.log(`[4/4] fragment types loaded (${schemaPaths.fragmentTypesPath}) ✅\n`);
      });
  }

  function killProcess(error) {
    if (error) {
      console.log('There was an error', error);
    } else {
      console.log('🎉   yp3 schema sync complete! exiting...');
    }
    server.kill('SIGTERM');
    process.kill(-server.pid);
  }

  console.log('[1/4] starting graphql server...');
  server = spawn('npm', ['run', 'start'], {
    detached: true,
    env: Object.assign({}, process.env, {
      NODE_ENV: 'development',
      PORT,
    }),
    cwd: path.resolve(yp3Path, 'graphql'),
  });

  server.stderr.on('data', data => {
    console.log(data.toString());
  });
  server.stdout.on('data', data => {
    console.log(data.toString());
    if (data.toString().indexOf('API Server is now running') !== -1) {
      console.log('[1/4] graphql server started ✅\n');
      console.log('[2/4] loading schema...');
      setTimeout(() => {
        loadSchema()
          .then(loadTypes)
          .then(() => killProcess(), e => killProcess(e));
      }, 1000);
    }
  });

  server.on('error', err => {
    console.log('error spawning', err);
  });
  server.on('exit', err => {
    if (err > 0) {
      console.log(`\n\nERROR while running the yp3 graphql server\n\n`);
      process.exit(1);
    }
  });
};

module.exports = {
  name: 'syncSchema',
  info: 'download schema from your local yp3 and generate TS types for schema',
  run,
};
