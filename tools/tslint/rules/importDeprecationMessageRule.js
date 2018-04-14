'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Lint = require('tslint');
class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile) {
    return this.applyWithWalker(new ImportFilterWalker(sourceFile, this.getOptions()));
  }
}
exports.Rule = Rule;
// The walker takes care of all the work.
class ImportFilterWalker extends Lint.RuleWalker {
  createNodeError(node, text) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text));
  }
  visitImportDeclaration(node) {
    // create a failure at the current position
    const options = this.getOptions();
    Object.keys(options[0]).forEach(moduleName => {
      if (node.moduleSpecifier.getText().replace(/['"]/g, '') === moduleName) {
        const opts = options[0][moduleName];
        if (typeof opts === 'string') {
          // check if whole module is deprecated
          this.createNodeError(node /* .moduleSpecifier */, opts);
        } else {
          // check the default export deprecation
          if (node.importClause && node.importClause.name && opts.default) {
            this.createNodeError(node.importClause.name, opts.default);
          }
          // check named exports
          // check for cases when importing the namespace with the star (import * from ...)
          const nameSpaceImportKind = 244;
          if (
            node.importClause &&
            node.importClause.namedBindings &&
            node.importClause.namedBindings.kind === nameSpaceImportKind
          ) {
            this.createNodeError(
              node,
              Object.keys(opts)
                .map(k => opts[k])
                .join('; '),
            );
          }
          // check named exports
          if (node.importClause && node.importClause.namedBindings) {
            node.importClause.namedBindings.forEachChild(el => {
              const name = (el.propertyName && el.propertyName.text) || (el.name && el.name.text);
              if (name && opts[name]) {
                this.createNodeError(el, opts[name]);
              }
            });
          }
        }
      }
    });
    // call the base version of this visitor to actually parse this node
    super.visitImportDeclaration(node);
  }
}
