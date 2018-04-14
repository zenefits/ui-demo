// @ts-check
/* eslint-disable no-underscore-dangle, no-param-reassign */

const fs = require('fs');
const { spawn, spawnSync } = require('child_process');
const fetch = require('node-fetch');
const path = require('path');
const { introspectionQuery } = require('graphql');
const { getSchemaPaths, generateTypes } = require('z-frontend-yp-schema');
const prettier = require('prettier');
const prettierConfig = require('../../../prettier.config');

let server;
const PORT = '3001';
const serverUrl = `http://localhost:${PORT}`;
const schemaPaths = getSchemaPaths(process.cwd());
const serverPath = path.resolve(process.env.SERVER || path.join(__dirname, '../../../../server'));

try {
  if (!fs.statSync(serverPath).isDirectory()) {
    throw new Error('not a dir');
  }
  if (!fs.statSync(path.join(serverPath, 'graphql')).isDirectory()) {
    throw new Error('not a dir');
  }
} catch (e) {
  console.log(
    `\n\nERROR!\nserver repo not found in "${serverPath}".\n` +
      `Please define a path for your server repo folder using SERVER env variable:\n` +
      `example: "SERVER=../server yarn run ..."\n\n`,
  );
  process.exit(1);
}

function getServerHeadCommit() {
  const headSha = spawnSync('git', ['rev-parse', 'HEAD'], { cwd: serverPath }).stdout.toString();
  return headSha.trim();
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
      console.log(`[2/4] schema loaded (${schemaPaths.jsonPath}) ✅\n`);

      const headCommit = getServerHeadCommit();

      fs.writeFileSync(
        schemaPaths.jsonPath,
        prettifyJson({
          ...json,
          usedCommit: headCommit,
        }),
      );

      console.log('[3/4] generating typescript types for schema');
      return generateTypes({
        files: [],
        generateDocuments: false,
        generateSchemaTypes: true,
        schemaPath: schemaPaths.jsonPath,
      });
    })
    .then(generatedTypesStr => {
      console.log(`[3/4] types generated (${schemaPaths.schemaTypesPath}) ✅\n`);
      fs.writeFileSync(schemaPaths.schemaTypesPath, generatedTypesStr);
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
      fs.writeFileSync(schemaPaths.fragmentTypesPath, prettifyJson(result.data));
      console.log(`[4/4] fragment types loaded (${schemaPaths.fragmentTypesPath}) ✅\n`);
    });
}

function killProcess() {
  console.log('🎉   server schema sync complete! exiting...');
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
  cwd: path.resolve(serverPath, 'graphql'),
});

server.stderr.on('data', data => {
  console.log(data.toString());
});
server.stdout.on('data', data => {
  if (data.toString().indexOf('API Server is now running') !== -1) {
    console.log('[1/4] graphql server started ✅\n');
    console.log('[2/4] loading schema...');
    setTimeout(() => {
      loadSchema()
        .then(() => loadTypes())
        .then(() => {
          killProcess();
        });
    }, 1000);
  }
});

server.on('error', err => {
  console.log('error spawning', err);
});
server.on('exit', err => {
  if (err > 0) {
    console.log(`\n\nERROR while running the graphql server\n\n`);
    process.exit(1);
  }
});
