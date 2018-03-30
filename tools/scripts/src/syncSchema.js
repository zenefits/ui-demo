// @ts-check

const fs = require('fs');
const { spawn } = require('child_process');
const fetch = require('node-fetch');
const path = require('path');
const { introspectionQuery } = require('graphql');
const { getSchemaPaths, generateTypes } = require('z-frontend-yp-schema');

let server;
const PORT = '3001';
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

function loadSchema() {
  const serverUrl = `http://localhost:${PORT}`;

  fetch(`${serverUrl}/graphql?`, {
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
      console.log(`[2/3] schema loaded (${schemaPaths.jsonPath}) ✅\n`);
      fs.writeFileSync(schemaPaths.jsonPath, JSON.stringify(json, undefined, '  '));

      console.log('[3/3] generating typescript types for schema');
      return generateTypes({
        files: [],
        generateDocuments: false,
        generateSchemaTypes: true,
        schemaPath: schemaPaths.jsonPath,
      });
    })
    .then(generatedTypesStr => {
      console.log(`[3/3] types generated (${schemaPaths.schemaTypesPath}) ✅\n`);
      fs.writeFileSync(schemaPaths.schemaTypesPath, generatedTypesStr);
      console.log('🎉   server schema sync complete! exiting...');
      server.kill('SIGTERM');
      process.kill(-server.pid);
    });
}

console.log('[1/3] starting graphql server...');
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
    console.log('[1/3] graphql server started ✅\n');
    console.log('[2/3] loading schema...');
    setTimeout(loadSchema, 1000);
  }
});

server.on('error', err => {
  console.log('error spawning', err);
});
server.on('exit', err => {
  if (err > 0) {
    console.log(`\n\nERROR while running the server graphql server\n\n`);
    process.exit(1);
  }
});
