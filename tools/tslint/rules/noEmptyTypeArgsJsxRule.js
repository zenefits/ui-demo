'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const ts = require('typescript');
const Lint = require('tslint');
class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile) {
    return this.applyWithWalker(new NoEmptyTypeArgsJsxRule(sourceFile, this.ruleName, this.getOptions()));
  }
}
exports.Rule = Rule;
class NoEmptyTypeArgsJsxRule extends Lint.AbstractWalker {
  constructor(sourceFile, ruleName, options) {
    super(sourceFile, ruleName, options);
    this.checks = [];
    this.checks = options.ruleArguments[0].components.map(({ name, importPaths }) => ({
      componentName: name,
      importRx: new RegExp(
        `import.+?\\{.*? ${name.split('.')[0]} .*?\\} from '(:?${importPaths
          .map(path => path.replace(/\./g, '\\.'))
          .join('|')})';`,
      ),
    }));
  }
  walk(sourceFile) {
    const cb = node => {
      if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
        const tagName = node.tagName.getText();
        this.checks.forEach(({ importRx, componentName }) => {
          if (tagName === componentName && importRx.test(sourceFile.text) && !node.typeArguments) {
            this.addFailureAtNode(
              node,
              `"${componentName}" component must have type argument (e.g. <${componentName}<MyType> ... >)`,
            );
          }
        });
      }
      return ts.forEachChild(node, cb);
    };
    return ts.forEachChild(sourceFile, cb);
  }
}
