// @ts-check
const { spawn } = require('child_process');
const path = require('path');

const zFrontendRoot = path.resolve(path.join(__dirname, '../../../../'));
const run = (...args) => {
  const jscodeshiftPath = path.dirname(require.resolve('z-frontend-jscodeshift/package.json'));
  const jscodeshiftBinPath = path.join(jscodeshiftPath, 'node_modules', '.bin', 'jscodeshift');

  // "z-frontend-jscodeshift/node_modules/.bin/jscodeshift --ignore-pattern <zFrontEndroot>/!{component/apps}/**  --transform --extensions [ts, tsx] <zFrontEndroot>"
  const pr = spawn(
    jscodeshiftBinPath,
    args.concat([
      '--parser',
      'tsx',
      '--extensions',
      'ts,tsx',
      '--ignore-pattern',
      '**/node_modules/**',
      `${zFrontendRoot}/components`,
      `${zFrontendRoot}/apps`,
    ]),
    {
      stdio: 'inherit',
    },
  );

  pr.on('exit', code => {
    process.exit(code);
  });
};

module.exports = {
  name: 'jscodeshift',
  info: `Must provide path to file with --transform argument. "z-frontend-jscodeshift/.bin/jscodeshift --extensions [ts, tsx] <zFrontEndroot>/{components, apps}/**/*"`,
  run,
};
