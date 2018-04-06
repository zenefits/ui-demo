// @ts-check

const tsTransformer = require('react-native-typescript-transformer');

const getGraphqlSchema = require('./utils/getGraphqlSchema');

module.exports.transform = function rnTransformer({ src, filename, options }) {
  let resultSrc = src;
  if (filename.endsWith('rootSchema.graphql')) {
    resultSrc = getGraphqlSchema();
  }

  return tsTransformer.transform({
    src: resultSrc,
    filename,
    options,
  });
};
