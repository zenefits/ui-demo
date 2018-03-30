'use strict';
var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b;
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
      };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
    };
  })();
exports.__esModule = true;
var Lint = require('tslint');
var path = require('path');
var findUpSync = require('find-up').sync;
var Rule = /** @class */ (function(_super) {
  __extends(Rule, _super);
  function Rule() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Rule.prototype.apply = function(sourceFile) {
    return this.applyWithWalker(new NoExternalRelativeImportsWalker(sourceFile, this.getOptions()));
  };
  return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
var NoExternalRelativeImportsWalker = /** @class */ (function(_super) {
  __extends(NoExternalRelativeImportsWalker, _super);
  function NoExternalRelativeImportsWalker() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.getModuleDirectoriesUp = function(moduleName) {
      var directoriesUp = 0;
      var traversedModuleName = moduleName;
      while (traversedModuleName.substring(0, 3) === '../') {
        directoriesUp += 1;
        traversedModuleName = traversedModuleName.substring(3);
      }
      return directoriesUp;
    };
    _this.packageDirectoriesUp = -1;
    _this.getPackageDirectoriesUp = function() {
      if (_this.packageDirectoriesUp > -1) {
        return _this.packageDirectoriesUp;
      }
      var sourcePath = path.resolve(_this.getSourceFile().fileName);
      var packagePath = findUpSync('package.json', { cwd: sourcePath });
      _this.packageDirectoriesUp = sourcePath.split('/').length - packagePath.split('/').length;
      return _this.packageDirectoriesUp;
    };
    return _this;
  }
  NoExternalRelativeImportsWalker.prototype.createNodeError = function(node, text) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text));
  };
  NoExternalRelativeImportsWalker.prototype.visitImportDeclaration = function(node) {
    var moduleName = node.moduleSpecifier.getText().replace(/['"]/g, '');
    var moduleIsRelative = moduleName.charAt(0) === '.';
    if (moduleIsRelative) {
      var moduleDirectoriesUp = this.getModuleDirectoriesUp(moduleName);
      var packageDirectoriesUp = this.getPackageDirectoriesUp();
      if (moduleDirectoriesUp > packageDirectoriesUp) {
        this.createNodeError(node.moduleSpecifier, 'Relative imports may not originate from outside your npm package.');
      }
    }
    _super.prototype.visitImportDeclaration.call(this, node);
  };
  return NoExternalRelativeImportsWalker;
})(Lint.RuleWalker);
