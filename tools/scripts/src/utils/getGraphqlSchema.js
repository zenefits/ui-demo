// @ts-check

const fs = require('fs');

module.exports = function getGraphqlSchema({ src, filePath, getAsEs6Export }) {
  const gqlFileSrc = src || fs.readFileSync(filePath).toString();

  return `${getAsEs6Export ? 'export default' : 'module.exports ='} \`\n${gqlFileSrc.replace(/`/g, "'")}\`;\n`;
};
