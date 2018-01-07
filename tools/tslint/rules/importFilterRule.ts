import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new ImportFilterWalker(sourceFile, this.getOptions()));
  }
}

// The walker takes care of all the work.
class ImportFilterWalker extends Lint.RuleWalker {
  createNodeError(node, text) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text));
  }

  public visitImportDeclaration(node: ts.ImportDeclaration) {
    // create a failure at the current position
    const options = this.getOptions();
    Object.keys(options[0]).forEach(moduleName => {
      if (node.moduleSpecifier.getText().replace(/['"]/g, '') === moduleName) {
        const opts = options[0][moduleName];

        if (opts === true) {
          // check if while module is not allowed
          this.createNodeError(node.moduleSpecifier, `Imports from module '${moduleName}' are not allowed.`);
        } else {
          // check the default export
          if (
            node.importClause &&
            node.importClause.name &&
            ((opts.whitelist && opts.whitelist.indexOf('default') === -1) ||
              (!opts.whitelist && opts.blacklist && opts.blacklist.indexOf('default') !== -1))
          ) {
            this.createNodeError(
              node.importClause.name,
              `Importing a default from module '${moduleName}' is not allowed.`,
            );
          }

          // check for cases when importing module with no names (import 'module-name';)
          if (!node.importClause) {
            this.createNodeError(node, `Importing the module '${moduleName}' is not allowed.`);
          }

          // check named exports
          // check for cases when importing the namespace with the star (import * from ...)
          const nameSpaceImportKind = 240;
          if (
            node.importClause &&
            node.importClause.namedBindings &&
            node.importClause.namedBindings.kind === nameSpaceImportKind
          ) {
            this.createNodeError(
              node.importClause.namedBindings,
              `Importing the namespace from module '${moduleName}' is not allowed.`,
            );
          }

          // check named exports
          if (node.importClause && node.importClause.namedBindings && (opts.whitelist || opts.blacklist)) {
            node.importClause.namedBindings.forEachChild((el: ts.ImportSpecifier) => {
              const name = (el.propertyName && el.propertyName.text) || (el.name && el.name.text);
              if (
                name &&
                ((opts.whitelist && opts.whitelist.indexOf(name) === -1) ||
                  (!opts.whitelist && opts.blacklist && opts.blacklist.indexOf(name) !== -1))
              ) {
                this.createNodeError(el, `Importing '${name}' from module '${moduleName}' is not allowed.`);
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
