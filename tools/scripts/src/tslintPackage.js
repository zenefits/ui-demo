// @ts-check

const { spawn } = require('child_process');
const getAllPackages = require('./getAllPackages');

const cwd = process.cwd();
const otherArgs = process.argv.slice(2);

getAllPackages().then(packagesList => {
  if (!packagesList.some(p => p.fullPath === cwd)) {
    throw new Error('this script must run from a package root');
  }

  const otherPackagesPaths = packagesList.filter(p => p.fullPath !== cwd).map(p => p.shortPath);
  const tslintExcludeGlob = `'/**/{${otherPackagesPaths.join(',')}}/**'`;

  const pr = spawn(
    './node_modules/.bin/tslint',
    ['--exclude', tslintExcludeGlob, '--project', './'].concat(otherArgs),
    {
      cwd,
      stdio: 'inherit',
    },
  );

  pr.on('exit', code => {
    process.exit(code);
  });
});
