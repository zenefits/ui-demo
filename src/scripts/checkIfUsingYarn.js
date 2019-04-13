// @ts-check

if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.log(`\n\n+++++++++++++++++++++++++++++++++++++++++++++++++++++\n`);
  console.log(
    `Please use "yarn add" command to add dependencies, or add then manually in package.json of your package and then run "lerna bootstrap"`,
  );
  console.log(`\n+++++++++++++++++++++++++++++++++++++++++++++++++++++\n\n`);

  throw new Error('Use yarn for installing: https://yarnpkg.com/en/docs/install');
}
