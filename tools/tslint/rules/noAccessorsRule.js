'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Lint = require('tslint');
class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile) {
    return this.applyWithWalker(new NoAccessorsWalker(sourceFile, this.getOptions()));
  }
}
exports.Rule = Rule;
class NoAccessorsWalker extends Lint.RuleWalker {
  visitGetAccessor(node) {
    this.addFailure(this.createFailure(node.getStart(), 3, 'Getters are forbidden.'));
    super.visitGetAccessor(node);
  }
  visitSetAccessor(node) {
    this.addFailure(this.createFailure(node.getStart(), 3, 'Setters are forbidden.'));
    super.visitGetAccessor(node);
  }
}
