'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Lint = require('tslint');
const path = require('path');
const findUpSync = require('find-up').sync;
class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile) {
    return this.applyWithWalker(new NoExternalRelativeImportsWalker(sourceFile, this.getOptions()));
  }
}
exports.Rule = Rule;
class NoExternalRelativeImportsWalker extends Lint.RuleWalker {
  constructor() {
    super(...arguments);
    this.getModuleDirectoriesUp = moduleName => {
      let directoriesUp = 0;
      let traversedModuleName = moduleName;
      while (traversedModuleName.substring(0, 3) === '../') {
        directoriesUp += 1;
        traversedModuleName = traversedModuleName.substring(3);
      }
      return directoriesUp;
    };
    this.packageDirectoriesUp = -1;
    this.getPackageDirectoriesUp = () => {
      if (this.packageDirectoriesUp > -1) {
        return this.packageDirectoriesUp;
      }
      const sourcePath = path.resolve(this.getSourceFile().fileName);
      const packagePath = findUpSync('package.json', { cwd: sourcePath });
      this.packageDirectoriesUp = sourcePath.split('/').length - packagePath.split('/').length;
      return this.packageDirectoriesUp;
    };
  }
  createNodeError(node, text) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text));
  }
  visitImportDeclaration(node) {
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
