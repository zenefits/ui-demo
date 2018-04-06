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
var Rule = /** @class */ (function(_super) {
  __extends(Rule, _super);
  function Rule() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  Rule.prototype.apply = function(sourceFile) {
    return this.applyWithWalker(new ImportFilterWalker(sourceFile, this.getOptions()));
  };
  return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
// The walker takes care of all the work.
var ImportFilterWalker = /** @class */ (function(_super) {
  __extends(ImportFilterWalker, _super);
  function ImportFilterWalker() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  ImportFilterWalker.prototype.createNodeError = function(node, text) {
    this.addFailure(this.createFailure(node.getStart(), node.getWidth(), text));
  };
  ImportFilterWalker.prototype.visitImportDeclaration = function(node) {
    var _this = this;
    // create a failure at the current position
    var options = this.getOptions();
    Object.keys(options[0]).forEach(function(moduleName) {
      var foundModuleName = node.moduleSpecifier.getText().replace(/['"]/g, '');
      var isFolderBan = moduleName.substr(-2) === '/*';
      var folder = moduleName.replace(/\/\*$/, '/');
      if (isFolderBan) {
        if (foundModuleName.indexOf(folder) === 0) {
          // if specified modulename ends with `/*`, ban all the imports from that folder
          var opts = options[0][moduleName];
          if (opts) {
            _this.createNodeError(
              node.moduleSpecifier,
              "Imports from folder '" +
                folder +
                "' are not allowed. Instead please use named imports from the package.",
            );
          }
        }
      } else if (foundModuleName === moduleName) {
        var opts_1 = options[0][moduleName];
        if (opts_1 === true) {
          // check if while module is not allowed
          _this.createNodeError(node.moduleSpecifier, "Imports from module '" + moduleName + "' are not allowed.");
        } else {
          // check the default export
          if (
            node.importClause &&
            node.importClause.name &&
            ((opts_1.whitelist && opts_1.whitelist.indexOf('default') === -1) ||
              (!opts_1.whitelist && opts_1.blacklist && opts_1.blacklist.indexOf('default') !== -1))
          ) {
            _this.createNodeError(
              node.importClause.name,
              "Importing a default from module '" + moduleName + "' is not allowed.",
            );
          }
          // check for cases when importing module with no names (import 'module-name';)
          if (!node.importClause) {
            _this.createNodeError(node, "Importing the module '" + moduleName + "' is not allowed.");
          }
          // check named exports
          // check for cases when importing the namespace with the star (import * from ...)
          var nameSpaceImportKind = 240;
          if (
            node.importClause &&
            node.importClause.namedBindings &&
            node.importClause.namedBindings.kind === nameSpaceImportKind
          ) {
            _this.createNodeError(
              node.importClause.namedBindings,
              "Importing the namespace from module '" + moduleName + "' is not allowed.",
            );
          }
          // check named exports
          if (node.importClause && node.importClause.namedBindings && (opts_1.whitelist || opts_1.blacklist)) {
            node.importClause.namedBindings.forEachChild(function(el) {
              var name = (el.propertyName && el.propertyName.text) || (el.name && el.name.text);
              if (
                name &&
                ((opts_1.whitelist && opts_1.whitelist.indexOf(name) === -1) ||
                  (!opts_1.whitelist && opts_1.blacklist && opts_1.blacklist.indexOf(name) !== -1))
              ) {
                _this.createNodeError(el, "Importing '" + name + "' from module '" + moduleName + "' is not allowed.");
              }
            });
          }
        }
      }
    });
    // call the base version of this visitor to actually parse this node
    _super.prototype.visitImportDeclaration.call(this, node);
  };
  return ImportFilterWalker;
})(Lint.RuleWalker);
