// @ts-check

const fs = require('fs-extra');
const path = require('path');
const { getSchemaPaths, generateTypes } = require('z-frontend-yp-schema');

const run = async () => {
  const appPath = process.cwd();
  const pkgJson = require(path.join(appPath, 'package.json')); // eslint-disable-line global-require, import/no-dynamic-require
  const args = process.argv.slice(2);

  const filesIncluded = args.includes('--files');
  if (filesIncluded) {
    const idx = args.indexOf('--files');
    const files = args.slice(idx + 1, idx + 2);
    console.log('checking files for "gql" tags', files);
    const allFilesContent = await Promise.all(
      files.map(
        filePath =>
          new Promise((resolve, reject) => {
            fs.readFile(path.join(process.cwd(), filePath), (err, data) => {
              if (err) {
                return reject(err);
              }
              return resolve(data.toString());
            });
          }),
      ),
    );

    if (!allFilesContent.some(content => /gql`/.test(content))) {
      console.log('changed files do not contain gql tags, exiting.');
      return;
    }
  }

  const compareWithExisting = !!process.env.CI || args.includes('--compare');

  console.log(`${compareWithExisting ? 'Comparing generated' : 'Generating'} types for app "${pkgJson.name}"...`);

  const schemaPaths = getSchemaPaths(appPath);

  await generateTypes({
    files: [`${appPath}/src/**/!(*.stories).!(md)`],
    generateDocuments: true,
    generateSchemaTypes: false,
    schemaPath: fs.existsSync(schemaPaths.graphqlPath) ? schemaPaths.graphqlPath : schemaPaths.jsonPath,
  }).then(resultStr => {
    const existingFile = fs.existsSync(schemaPaths.appTypesPath)
      ? fs.readFileSync(schemaPaths.appTypesPath).toString()
      : '';
    if (compareWithExisting) {
      if (resultStr !== existingFile) {
        console.log(
          `\nERROR!\nGenerated types don't match existing file for ${pkgJson.name}\n` +
            `Need to regenerate TS types for app queries. This is done automatically during webpack builds. To do it manually run ` +
            `\`yarn run generateAppTypes\` in your app folder.\nMore info about type generation for GraphQL ` +
            `https://github.com/zenefits/z-frontend/blob/master/tools/yp-schema/README.md\n`,
        );
        process.exit(1);
      } else {
        console.log(`Generated types match existing file (${schemaPaths.appTypesPath})`);
      }
    } else if (resultStr !== existingFile) {
      fs.outputFileSync(schemaPaths.appTypesPath, resultStr);
      console.log(`Types generated! (${schemaPaths.appTypesPath})`);
    } else {
      console.log(`Generated types match existing file (${schemaPaths.appTypesPath})`);
    }
  });
};

module.exports = {
  name: 'generateAppTypes',
  info: 'generate TS types for queries, mutations and fragments in current app',
  run,
};
