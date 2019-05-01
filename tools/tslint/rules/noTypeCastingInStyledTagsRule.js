'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Lint = require('tslint');
const noNestedStyledComponentsAmpersandRule_1 = require('./noNestedStyledComponentsAmpersandRule');
class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile) {
    const typeCastingRegExp = /\sas\s/m;
    const error = 'You may not perform type casting in the body of styled components tag.';
    return this.applyWithWalker(
      new noNestedStyledComponentsAmpersandRule_1.StyledComponentsWalker(
        sourceFile,
        this.getOptions(),
        typeCastingRegExp,
        error,
      ),
    );
  }
}
exports.Rule = Rule;
