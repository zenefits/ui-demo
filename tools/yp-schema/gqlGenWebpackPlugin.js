const path = require('path');
const fs = require('fs');
const ypSchema = require('./index');

const appPath = process.cwd();

function generateTypes(callback) {
  const schemaPaths = ypSchema.getSchemaPaths(appPath);
  ypSchema
    .generateTypes({
      files: [appPath + '/src/**/*.*'],
      generateDocuments: true,
      schemaPath: schemaPaths.jsonPath,
    })
    .then(
      generatedTypesStr => {
        let currentFile;
        try {
          currentFile = fs.readFileSync(schemaPaths.appTypesPath).toString();
        } catch (e) {}

        if (generatedTypesStr !== currentFile) {
          fs.writeFile(schemaPaths.appTypesPath, generatedTypesStr, err => {
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

const GqlTsGenWebpackPlugin = function() {};

GqlTsGenWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('run', function(compilation, callback) {
    generateTypes(callback);
  });
  compiler.plugin('watch-run', function(compiler, callback) {
    generateTypes(callback);
  });
};

module.exports = GqlTsGenWebpackPlugin;
