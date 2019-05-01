import * as ts from 'typescript';
import * as Lint from 'tslint';

const stripComments = (text: string): string => {
  let newString = '';
  let isInBlockComment = false;
  let isInLineComment = false;
  let skipNext = false;
  for (let i = 0; i < text.length; i += 1) {
    if (skipNext) {
      skipNext = false;
      continue;
    }

    const nextTwo = text.slice(i, i + 2);
    if (nextTwo === '/*' && !isInLineComment) {
      isInBlockComment = true;
      skipNext = true;
      continue;
    }

    if (nextTwo === '*/') {
      isInBlockComment = false;
      skipNext = true;
      continue;
    }

    if (nextTwo === '//' && !isInBlockComment) {
      isInLineComment = true;
      skipNext = true;
      continue;
    }

    if (text[i] === '\n') {
      isInLineComment = false;
    }

    if (!isInBlockComment && !isInLineComment) {
      newString += text[i];
    }
  }
  return newString;
};

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    const ampersandRegExp = /^.*\S.*&.*{/m;
    const error = '& may not be used in the latter part of a css selector';
    return this.applyWithWalker(new StyledComponentsWalker(sourceFile, this.getOptions(), ampersandRegExp, error));
  }
}

export class StyledComponentsWalker extends Lint.RuleWalker {
  styleRegExp: RegExp;
  errorMessage: string;

  constructor(sourceFile, options, styleRegExp, errorMessage) {
    super(sourceFile, options);
    this.styleRegExp = styleRegExp;
    this.errorMessage = errorMessage;
  }

  createNodeError(node, text) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text));
  }

  public visitNode(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.TaggedTemplateExpression) {
      const { tag } = node as any;

      // Find all tags that match pattern css`` for styled()``
      const isStyledTag = tag.expression && tag.expression.escapedText === 'styled';
      const isCssTag = tag.escapedText === 'css';

      if (isStyledTag || isCssTag) {
        // If reg exp is found, fail test
        const nodeText: string = node.getText();
        const templateText = stripComments(nodeText.slice(nodeText.indexOf('`')));
        if (this.styleRegExp.test(templateText)) {
          this.createNodeError(node, this.errorMessage);
        }
      }
    }

    super.visitNode(node);
  }
}
