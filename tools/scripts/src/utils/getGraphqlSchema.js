const loadSchemaFromFS = require('z-frontend-talent/mock/typeDefsFS'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = function getGraphqlSchema(getAsEs6Export) {
  const gqlFiles = loadSchemaFromFS();
  return `${getAsEs6Export ? 'export default' : 'module.exports ='} \`\n${gqlFiles.join('\n')}\`;\n`;
};
