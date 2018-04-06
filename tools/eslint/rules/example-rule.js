module.exports = {
  meta: {
    docs: {
      description: 'avoid foo variables',
      category: 'Possible Errors',
    },
    schema: [], // no options
  },
  create(context) {
    return {
      Identifier(node) {
        if (node.name === 'foo') {
          context.report({
            node,
            message: 'foo var are not allowed',
          });
        }
      },
    };
  },
};
