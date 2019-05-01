// @ts-check

const { spawn } = require('child_process');
const path = require('path');

const run = (...givenArgs) => {
  const cypressPath = path.dirname(require.resolve('cypress/package.json'));
  const cypressBinPath = path.join(cypressPath, 'bin', 'cypress');
  const zfrontendCypressPath = path.dirname(require.resolve('z-frontend-cypress/package.json'));

  // cypress command runs from the project's folder
  const projectPath = process.cwd();
  const cypressArgs = givenArgs.concat(['--project', zfrontendCypressPath, '--env', `projectPath=${projectPath}`]);

  const pr = spawn(cypressBinPath, cypressArgs, {
    stdio: 'inherit',
  });
  pr.on('exit', code => {
    process.exit(code);
  });
};

module.exports = {
  name: 'cypress',
  info: 'Equivalent to `../../node_modules/cypress/bin/cypress open --project ../../tools/cypress/',
  run,
};
