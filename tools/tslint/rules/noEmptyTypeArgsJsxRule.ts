import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoEmptyTypeArgsJsxRule(sourceFile, this.ruleName, this.getOptions()));
  }
}

type RuleOptions = {
  componentName: { name: string; importPaths: string[] }[];
};

class NoEmptyTypeArgsJsxRule extends Lint.AbstractWalker<RuleOptions> {
  private checks: { componentName: string; importRx: RegExp }[] = [];

  constructor(sourceFile: ts.SourceFile, ruleName, options) {
    super(sourceFile, ruleName, options);

    this.checks = options.ruleArguments[0].components.map(({ name, importPaths }) => ({
      componentName: name,
      importRx: new RegExp(
        `import.+?\\{.*? ${name.split('.')[0]} .*?\\} from '(:?${importPaths
          .map(path => path.replace(/\./g, '\\.'))
          .join('|')})';`,
      ),
    }));
  }

  public walk(sourceFile: ts.SourceFile) {
    const cb = (node: ts.Node): void => {
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
