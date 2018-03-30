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
      if (node.moduleSpecifier.getText().replace(/['"]/g, '') === moduleName) {
        var opts_1 = options[0][moduleName];
        if (typeof opts_1 === 'string') {
          // check if whole module is deprecated
          _this.createNodeError(node /* .moduleSpecifier */, opts_1);
        } else {
          // check the default export deprecation
          if (node.importClause && node.importClause.name && opts_1['default']) {
            _this.createNodeError(node.importClause.name, opts_1['default']);
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
              node,
              Object.keys(opts_1)
                .map(function(k) {
                  return opts_1[k];
                })
                .join('; '),
            );
          }
          // check named exports
          if (node.importClause && node.importClause.namedBindings) {
            node.importClause.namedBindings.forEachChild(function(el) {
              var name = (el.propertyName && el.propertyName.text) || (el.name && el.name.text);
              if (name && opts_1[name]) {
                _this.createNodeError(el, opts_1[name]);
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
