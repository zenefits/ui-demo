import * as ts from 'typescript';
import * as Lint from 'tslint';
const path = require('path');
const findUpSync = require('find-up').sync;

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoExternalRelativeImportsWalker(sourceFile, this.getOptions()));
  }
}

class NoExternalRelativeImportsWalker extends Lint.RuleWalker {
  createNodeError(node, text) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text));
  }

  private getModuleDirectoriesUp = (moduleName: string): number => {
    let directoriesUp = 0;
    let traversedModuleName = moduleName;

    while (traversedModuleName.substring(0, 3) === '../') {
      directoriesUp += 1;
      traversedModuleName = traversedModuleName.substring(3);
    }

    return directoriesUp;
  };

  private packageDirectoriesUp: number = -1;
  private getPackageDirectoriesUp = (): number => {
    if (this.packageDirectoriesUp > -1) {
      return this.packageDirectoriesUp;
    }

    const sourcePath = path.resolve(this.getSourceFile().fileName);
    const packagePath = findUpSync('package.json', { cwd: sourcePath });
    this.packageDirectoriesUp = sourcePath.split('/').length - packagePath.split('/').length;
    return this.packageDirectoriesUp;
  };

  public visitImportDeclaration(node: ts.ImportDeclaration) {
    const moduleName = node.moduleSpecifier.getText().replace(/['"]/g, '');
    const moduleIsRelative = moduleName.charAt(0) === '.';

    if (moduleIsRelative) {
      const moduleDirectoriesUp = this.getModuleDirectoriesUp(moduleName);
      const packageDirectoriesUp = this.getPackageDirectoriesUp();

      if (moduleDirectoriesUp > packageDirectoriesUp) {
        this.createNodeError(node.moduleSpecifier, 'Relative imports may not originate from outside your npm package.');
      }
    }

    super.visitImportDeclaration(node);
  }
}
