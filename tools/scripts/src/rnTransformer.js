// @ts-check

const tsTransformer = require('react-native-typescript-transformer');
const getGraphqlSchema = require('./utils/getGraphqlSchema');
const { graphqlSchemaFileName } = require('z-frontend-yp-schema');

module.exports.transform = function rnTransformer({ src, filename, options }) {
  let resultSrc = src;

  if (filename.endsWith(graphqlSchemaFileName)) {
    resultSrc = getGraphqlSchema({ src });
  }

  return tsTransformer.transform({
    filename,
    options,
    src: resultSrc,
  });
};
