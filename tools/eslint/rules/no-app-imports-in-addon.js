/* eslint-env node */
const apps = {
  'client-app': true,
  'console-app': true,
  'style-guide': true,
  'public-app': true,
};

module.exports = function noImportsInAddon(context) {
  return {
    ImportDeclaration: node => {
      if (!node.source || node.source.type !== 'Literal') {
        return;
      }
      if (node.source.value[0] !== '.') {
        const module = node.source.value.split('/')[0];
        if (apps[module]) {
          context.report({
            node: node.source,
            message: `component-library module should not have dependency on module from consuming application ${module})`,
          });
        }
      }
    },
  };
};
