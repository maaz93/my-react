module.exports = {
  rules: {
    'mark-create-element-as-used': context => ({
      Identifier: node => {
        if (node.name === 'createElement') {
          context.markVariableAsUsed(node.name);
        }
      }
    })
  }
};
