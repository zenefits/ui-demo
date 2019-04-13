// @ts-check

const path = require('path');
const assert = require('assert');
const startAndTest = require('start-server-and-test');
const fs = require('fs');
const { execSync, spawn } = require('child_process');

const packageJson = require(path.join(process.cwd(), '/package.json')); // eslint-disable-line import/no-dynamic-require

const run = () => {
  assert(
    packageJson.config && packageJson.config.port,
    "A port needs to be specified on the project's package.json config",
  );
  const { port } = packageJson.config;

  const args = process.argv.slice(3);
  if (args.includes('--reuse-assets')) {
    const cwd = process.cwd();

    const appName = packageJson.name.replace('z-frontend-', '');

    let distFolder;
    if (fs.existsSync(path.join(cwd, 'storybook-static'))) {
      distFolder = path.join(cwd, 'storybook-static');
    } else {
      execSync(`mkdir -p dist/app/${appName} && cp dist/*.* dist/app/${appName}/`);
      distFolder = path.join(cwd, 'dist');
    }

    const serveProcess = spawn('yarn', ['run', 'serve', '--silent', '--port', port, distFolder], {
      cwd: path.join(__dirname, '../../'),
      stdio: 'inherit',
    });

    serveProcess.on('exit', code => {
      if (code !== 0) {
        console.log(`serveProcess exited with code ${code}`);
        process.exit(1);
      }
    });

    const testProcess = spawn('yarn', ['run', 'cy:run'], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });

    testProcess.on('exit', code => {
      process.exit(code);
    });
  } else {
    startAndTest({ url: `http-get://localhost:${port}`, start: 'start', test: 'cy:run' });
  }
};

module.exports = {
  name: 'startServerTest',
  info: 'run Cypress (cy:run) tests using assets from dist folder. Assets should be built beforehand.',
  run,
};
