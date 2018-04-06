// @ts-check

const fs = require('fs');
const path = require('path');
const { getSchemaPaths, generateTypes } = require('z-frontend-yp-schema');

const appPath = process.cwd();
const pkgJson = require(path.join(appPath, 'package.json')); // eslint-disable-line import/no-dynamic-require

console.log(`\nGenerating types for app "${pkgJson.name}"...\n`);

const schemaPaths = getSchemaPaths(appPath);

generateTypes({
  files: [`${appPath}/src/**/*.*`],
  generateDocuments: true,
  generateSchemaTypes: false,
  schemaPath: schemaPaths.jsonPath,
}).then(resultStr => {
  fs.writeFileSync(schemaPaths.appTypesPath, resultStr);
  console.log(`\nTypes generated! (${schemaPaths.appTypesPath})\n`);
});
