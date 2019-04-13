const fs = require('fs-extra');
const ypSchema = require('./index');

const appPath = process.cwd();

function generateTypesForApp(callback) {
  const schemaPaths = ypSchema.getSchemaPaths(appPath);
  ypSchema
    .generateTypes({
      files: [`${appPath}/src/**/*.*`],
      generateDocuments: true,
      schemaPath: fs.existsSync(schemaPaths.graphqlPath) ? schemaPaths.graphqlPath : schemaPaths.jsonPath,
    })
    .then(
      generatedTypesStr => {
        let currentFile;
        try {
          currentFile = fs.readFileSync(schemaPaths.appTypesPath).toString();
        } catch (e) {
          // NOTE: intentionally swallowed the error
        }

        if (generatedTypesStr !== currentFile) {
          fs.outputFile(schemaPaths.appTypesPath, generatedTypesStr, () => {
            console.log('\nTS types for app queries and mutations are generated!\n');
            callback();
          });
        } else {
          callback();
        }
      },
      err => {
        console.log('ERROR during types generation', err);
        callback(err);
      },
    );
}

const GqlTsGenWebpackPlugin = function GqlTsGenWebpackPlugin() {};

GqlTsGenWebpackPlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('run', (compilation, callback) => {
    generateTypesForApp(callback);
  });
  compiler.plugin('watch-run', (compilation, callback) => {
    generateTypesForApp(callback);
  });
};

module.exports = GqlTsGenWebpackPlugin;
