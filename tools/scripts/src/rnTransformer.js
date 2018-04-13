// @ts-check

const tsTransformer = require('react-native-typescript-transformer');

module.exports.transform = function rnTransformer({ src, filename, options }) {
  return tsTransformer.transform({
    src,
    filename,
    options,
  });
};
