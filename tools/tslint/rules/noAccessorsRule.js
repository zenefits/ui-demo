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
    return this.applyWithWalker(new NoAccessorsWalker(sourceFile, this.getOptions()));
  };
  return Rule;
})(Lint.Rules.AbstractRule);
exports.Rule = Rule;
var NoAccessorsWalker = /** @class */ (function(_super) {
  __extends(NoAccessorsWalker, _super);
  function NoAccessorsWalker() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  NoAccessorsWalker.prototype.visitGetAccessor = function(node) {
    this.addFailure(this.createFailure(node.getStart(), 3, 'Getters are forbidden.'));
    _super.prototype.visitGetAccessor.call(this, node);
  };
  NoAccessorsWalker.prototype.visitSetAccessor = function(node) {
    this.addFailure(this.createFailure(node.getStart(), 3, 'Setters are forbidden.'));
    _super.prototype.visitGetAccessor.call(this, node);
  };
  return NoAccessorsWalker;
})(Lint.RuleWalker);
