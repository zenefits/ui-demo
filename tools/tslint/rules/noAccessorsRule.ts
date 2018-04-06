import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoAccessorsWalker(sourceFile, this.getOptions()));
  }
}

class NoAccessorsWalker extends Lint.RuleWalker {
  public visitGetAccessor(node: ts.GetAccessorDeclaration) {
    this.addFailure(this.createFailure(node.getStart(), 3, 'Getters are forbidden.'));
    super.visitGetAccessor(node);
  }

  public visitSetAccessor(node: ts.SetAccessorDeclaration) {
    this.addFailure(this.createFailure(node.getStart(), 3, 'Setters are forbidden.'));
    super.visitGetAccessor(node);
  }
}
