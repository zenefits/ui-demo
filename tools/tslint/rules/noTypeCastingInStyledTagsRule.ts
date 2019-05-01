import * as ts from 'typescript';
import * as Lint from 'tslint';

import { StyledComponentsWalker } from './noNestedStyledComponentsAmpersandRule';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const typeCastingRegExp = /\sas\s/m;
    const error = 'You may not perform type casting in the body of styled components tag.';
    return this.applyWithWalker(new StyledComponentsWalker(sourceFile, this.getOptions(), typeCastingRegExp, error));
  }
}
