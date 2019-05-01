// @ts-check

module.exports = {
  process(src, path) {
    if (path.endsWith('schema.generated.graphql')) {
      return `module.exports = \`\n${src.replace(/`/g, "'")}\`;\n`;
    }
    return src;
  },
};
