'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tsutils_1 = require('tsutils');
const ts = require('typescript');
const Lint = require('tslint');
class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile) {
    return this.applyWithWalker(new Walker(sourceFile, this.ruleName, parseOptions(this.ruleArguments)));
  }
}
/* tslint:disable:object-literal-sort-keys */
Rule.metadata = {
  ruleName: 'ordered-imports',
  description: 'Requires that import statements be alphabetized and grouped.',
  descriptionDetails: Lint.Utils.dedent`
          Enforce a consistent ordering for ES6 imports:
          - Named imports must be alphabetized (i.e. "import {A, B, C} from "foo";")
              - The exact ordering can be controlled by the named-imports-order option.
              - "longName as name" imports are ordered by "longName".
          - Import sources must be alphabetized within groups, i.e.:
                  import * as foo from "a";
                  import * as bar from "b";
          - Groups of imports are delineated by blank lines. You can use these to group imports
              however you like, e.g. by first- vs. third-party or thematically or can you can
              enforce a grouping of third-party, parent directories and the current directory.`,
  hasFix: true,
  optionsDescription: Lint.Utils.dedent`
          You may set the \`"import-sources-order"\` option to control the ordering of source
          imports (the \`"foo"\` in \`import {A, B, C} from "foo"\`).

          Possible values for \`"import-sources-order"\` are:

          * \`"case-insensitive'\`: Correct order is \`"Bar"\`, \`"baz"\`, \`"Foo"\`. (This is the default.)
          * \`"lowercase-first"\`: Correct order is \`"baz"\`, \`"Bar"\`, \`"Foo"\`.
          * \`"lowercase-last"\`: Correct order is \`"Bar"\`, \`"Foo"\`, \`"baz"\`.
          * \`"any"\`: Allow any order.

          You may set the \`"grouped-imports"\` option to control the grouping of source
          imports (the \`"foo"\` in \`import {A, B, C} from "foo"\`).

          Possible values for \`"grouped-imports"\` are:

          * \`false\`: Do not enforce grouping. (This is the default.)
          * \`true\`: Group source imports by \`"bar"\`, \`"../baz"\`, \`"./foo"\`.

          You may set the \`"named-imports-order"\` option to control the ordering of named
          imports (the \`{A, B, C}\` in \`import {A, B, C} from "foo"\`).

          Possible values for \`"named-imports-order"\` are:

          * \`"case-insensitive'\`: Correct order is \`{A, b, C}\`. (This is the default.)
          * \`"lowercase-first"\`: Correct order is \`{b, A, C}\`.
          * \`"lowercase-last"\`: Correct order is \`{A, C, b}\`.
          * \`"any"\`: Allow any order.

          You may set the \`"module-source-path"\` option to control the ordering of imports based full path
          or just the module name

          Possible values for \`"module-source-path"\` are:

          * \`"full'\`: Correct order is  \`"./a/Foo"\`, \`"./b/baz"\`, \`"./c/Bar"\`. (This is the default.)
          * \`"basename"\`: Correct order is \`"./c/Bar"\`, \`"./b/baz"\`, \`"./a/Foo"\`.

      `,
  options: {
    type: 'object',
    properties: {
      'grouped-imports-regex': {
        type: 'string',
      },
      'import-sources-order': {
        type: 'string',
        enum: ['case-insensitive', 'lowercase-first', 'lowercase-last', 'any'],
      },
      'named-imports-order': {
        type: 'string',
        enum: ['case-insensitive', 'lowercase-first', 'lowercase-last', 'any'],
      },
      'module-source-path': {
        type: 'string',
        enum: ['full', 'basename'],
      },
    },
    additionalProperties: false,
  },
  optionExamples: [
    true,
    [true, { 'import-sources-order': 'lowercase-last', 'named-imports-order': 'lowercase-first' }],
  ],
  type: 'style',
  typescriptOnly: false,
};
/* tslint:enable:object-literal-sort-keys */
Rule.IMPORT_SOURCES_NOT_GROUPED =
  'Import sources of different groups must be sorted by: third parties, packages matching provided regex, relative imports.';
Rule.IMPORT_SOURCES_UNORDERED = 'Import sources within a group must be alphabetized.';
Rule.NAMED_IMPORTS_UNORDERED = 'Named imports must be alphabetized.';
exports.Rule = Rule;
const TRANSFORMS = new Map([
  ['any', () => ''],
  ['case-insensitive', x => x.toLowerCase()],
  ['lowercase-first', flipCase],
  ['lowercase-last', x => x],
  ['full', x => x],
  [
    'basename',
    x => {
      if (!ts.isExternalModuleNameRelative(x)) {
        return x;
      }
      const splitIndex = x.lastIndexOf('/');
      if (splitIndex === -1) {
        return x;
      }
      return x.substr(splitIndex + 1);
    },
  ],
]);
var ImportType;
(function(ImportType) {
  ImportType[(ImportType['LIBRARY_IMPORT'] = 1)] = 'LIBRARY_IMPORT';
  ImportType[(ImportType['REGEX_PATH_IMPORT'] = 2)] = 'REGEX_PATH_IMPORT';
  ImportType[(ImportType['CURRENT_DIRECTORY_IMPORT'] = 3)] = 'CURRENT_DIRECTORY_IMPORT';
})(ImportType || (ImportType = {}));
function parseOptions(ruleArguments) {
  const optionSet = ruleArguments[0];
  const {
    'grouped-imports-regex': isGrouped = null,
    'import-sources-order': sources = 'case-insensitive',
    'named-imports-order': named = 'case-insensitive',
    'module-source-path': path = 'full',
  } = optionSet === undefined ? {} : optionSet;
  if (!isGrouped) {
    throw new Error('grouped-imports-regex param for rule grouped-imports must be defined');
  }
  return {
    groupedImportsRegex: isGrouped,
    importSourcesOrderTransform: TRANSFORMS.get(sources),
    moduleSourcePath: TRANSFORMS.get(path),
    namedImportsOrderTransform: TRANSFORMS.get(named),
  };
}
class Walker extends Lint.AbstractWalker {
  constructor() {
    super(...arguments);
    this.importsBlocks = [new ImportsBlock(this.options.groupedImportsRegex)];
    this.nextType = ImportType.LIBRARY_IMPORT;
  }
  get currentImportsBlock() {
    return this.importsBlocks[this.importsBlocks.length - 1];
  }
  walk(sourceFile) {
    for (const statement of sourceFile.statements) {
      this.checkStatement(statement);
    }
    this.endBlock();
    this.checkBlocksGrouping();
  }
  checkStatement(statement) {
    if (
      !(tsutils_1.isImportDeclaration(statement) || tsutils_1.isImportEqualsDeclaration(statement)) ||
      /\r?\n\r?\n/.test(this.sourceFile.text.slice(statement.getFullStart(), statement.getStart(this.sourceFile)))
    ) {
      this.endBlock();
    }
    if (tsutils_1.isImportDeclaration(statement)) {
      this.checkImportDeclaration(statement);
    } else if (tsutils_1.isImportEqualsDeclaration(statement)) {
      this.checkImportEqualsDeclaration(statement);
    } else if (tsutils_1.isModuleDeclaration(statement)) {
      const body = moduleDeclarationBody(statement);
      if (body !== undefined) {
        for (const subStatement of body.statements) {
          this.checkStatement(subStatement);
        }
        this.endBlock();
      }
    }
  }
  checkImportDeclaration(node) {
    if (!tsutils_1.isStringLiteral(node.moduleSpecifier)) {
      // Ignore grammar error
      return;
    }
    const path = removeQuotes(node.moduleSpecifier.text);
    const source = this.options.importSourcesOrderTransform(path);
    this.checkSource(source, node, path);
    const { importClause } = node;
    if (
      importClause !== undefined &&
      importClause.namedBindings !== undefined &&
      tsutils_1.isNamedImports(importClause.namedBindings)
    ) {
      this.checkNamedImports(importClause.namedBindings);
    }
  }
  checkImportEqualsDeclaration(node) {
    // only allowed `import x = require('y');`
    const { moduleReference } = node;
    if (!tsutils_1.isExternalModuleReference(moduleReference)) {
      return;
    }
    const { expression } = moduleReference;
    if (expression === undefined || !tsutils_1.isStringLiteral(expression)) {
      return;
    }
    const path = removeQuotes(expression.text);
    const source = this.options.importSourcesOrderTransform(path);
    this.checkSource(source, node, path);
  }
  checkSource(source, node, originPath) {
    const currentSource = this.options.moduleSourcePath(source);
    const previousSource = this.currentImportsBlock.getLastImportSource();
    this.currentImportsBlock.addImportDeclaration(this.sourceFile, node, currentSource, originPath);
    if (previousSource !== null && compare(currentSource, previousSource) === -1) {
      this.lastFix = [];
      this.addFailureAtNode(node, Rule.IMPORT_SOURCES_UNORDERED, this.lastFix);
    }
  }
  endBlock() {
    if (this.lastFix !== undefined) {
      const replacement = this.currentImportsBlock.getReplacement();
      if (replacement !== undefined) {
        this.lastFix.push(replacement);
      }
      this.lastFix = undefined;
    }
    this.importsBlocks.push(new ImportsBlock(this.options.groupedImportsRegex));
  }
  checkNamedImports(node) {
    const imports = node.elements;
    const pair = findUnsortedPair(imports, this.options.namedImportsOrderTransform);
    if (pair !== undefined) {
      const [a, b] = pair;
      const sortedDeclarations = sortByKey(imports, x => this.options.namedImportsOrderTransform(x.getText())).map(x =>
        x.getText(),
      );
      // replace in reverse order to preserve earlier offsets
      for (let i = imports.length - 1; i >= 0; i--) {
        const start = imports[i].getStart();
        const length = imports[i].getText().length;
        // replace the named imports one at a time to preserve whitespace
        this.currentImportsBlock.replaceNamedImports(start, length, sortedDeclarations[i]);
      }
      this.lastFix = [];
      this.addFailure(a.getStart(), b.getEnd(), Rule.NAMED_IMPORTS_UNORDERED, this.lastFix);
    }
  }
  checkBlocksGrouping() {
    this.importsBlocks.some(this.checkBlockGroups, this);
  }
  checkBlockGroups(importsBlock) {
    const oddImportDeclaration = this.getOddImportDeclaration(importsBlock);
    if (oddImportDeclaration !== undefined) {
      this.addFailureAtNode(oddImportDeclaration.node, Rule.IMPORT_SOURCES_NOT_GROUPED, this.getReplacements());
      return true;
    }
    return false;
  }
  getOddImportDeclaration(importsBlock) {
    const importDeclarations = importsBlock.getImportDeclarations();
    if (importDeclarations.length === 0) {
      return undefined;
    }
    const type = importDeclarations[0].type;
    if (type < this.nextType) {
      return importDeclarations[0];
    } else {
      this.nextType = type;
      return importDeclarations.find(importDeclaration => importDeclaration.type !== type);
    }
  }
  getReplacements() {
    const importDeclarationsList = this.importsBlocks
      .map(block => block.getImportDeclarations())
      .filter(imports => imports.length > 0);
    const allImportDeclarations = [].concat(...importDeclarationsList);
    const replacements = this.getReplacementsForExistingImports(importDeclarationsList);
    const startOffset = allImportDeclarations.length === 0 ? 0 : allImportDeclarations[0].nodeStartOffset;
    replacements.push(Lint.Replacement.appendText(startOffset, this.getGroupedImports(allImportDeclarations)));
    return replacements;
  }
  getReplacementsForExistingImports(importDeclarationsList) {
    return importDeclarationsList.map((items, index) => {
      let start = items[0].nodeStartOffset;
      if (index > 0) {
        const prevItems = importDeclarationsList[index - 1];
        const last = prevItems[prevItems.length - 1];
        if (/[\r\n]+/.test(this.sourceFile.text.slice(last.nodeEndOffset, start))) {
          // remove whitespace between blocks
          start = last.nodeEndOffset;
        }
      }
      return Lint.Replacement.deleteFromTo(start, items[items.length - 1].nodeEndOffset);
    });
  }
  getGroupedImports(importDeclarations) {
    return [ImportType.LIBRARY_IMPORT, ImportType.REGEX_PATH_IMPORT, ImportType.CURRENT_DIRECTORY_IMPORT]
      .map(type => {
        const imports = importDeclarations.filter(importDeclaration => importDeclaration.type === type);
        return getSortedImportDeclarationsAsText(imports);
      })
      .filter(text => text.length > 0)
      .join(this.getEolChar());
  }
  getEolChar() {
    const lineEnd = this.sourceFile.getLineEndOfPosition(0);
    let newLine;
    if (lineEnd > 0) {
      if (lineEnd > 1 && this.sourceFile.text[lineEnd - 1] === '\r') {
        newLine = '\r\n';
      } else if (this.sourceFile.text[lineEnd] === '\n') {
        newLine = '\n';
      }
    }
    return newLine === undefined ? ts.sys.newLine : newLine;
  }
}
class ImportsBlock {
  constructor(groupedImportsRegex) {
    this.importDeclarations = [];
    this.groupedImportsRegex = new RegExp(groupedImportsRegex);
  }
  addImportDeclaration(sourceFile, node, sourcePath, originPath) {
    const start = this.getStartOffset(node);
    const end = this.getEndOffset(sourceFile, node);
    const text = sourceFile.text.substring(start, end);
    const type = this.getImportType(sourcePath, originPath);
    if (start > node.getStart() || end === 0) {
      // skip block if any statements don't end with a newline to simplify implementation
      this.importDeclarations = [];
      return;
    }
    this.importDeclarations.push({
      node,
      nodeEndOffset: end,
      nodeStartOffset: start,
      sourcePath,
      originPath,
      text,
      type,
    });
  }
  getImportDeclarations() {
    return this.importDeclarations;
  }
  // replaces the named imports on the most recent import declaration
  replaceNamedImports(fileOffset, length, replacement) {
    const importDeclaration = this.getLastImportDeclaration();
    if (importDeclaration === undefined) {
      // nothing to replace. This can happen if the block is skipped
      return;
    }
    const start = fileOffset - importDeclaration.nodeStartOffset;
    if (start < 0 || start + length > importDeclaration.node.getEnd()) {
      throw new Error('Unexpected named import position');
    }
    const initialText = importDeclaration.text;
    importDeclaration.text = initialText.substring(0, start) + replacement + initialText.substring(start + length);
  }
  getLastImportSource() {
    if (this.importDeclarations.length === 0) {
      return null;
    }
    return this.getLastImportDeclaration().sourcePath;
  }
  // creates a Lint.Replacement object with ordering fixes for the entire block
  getReplacement() {
    if (this.importDeclarations.length === 0) {
      return undefined;
    }
    const fixedText = getSortedImportDeclarationsAsText(this.importDeclarations);
    const start = this.importDeclarations[0].nodeStartOffset;
    const end = this.getLastImportDeclaration().nodeEndOffset;
    return new Lint.Replacement(start, end - start, fixedText);
  }
  // gets the offset immediately after the end of the previous declaration to include comment above
  getStartOffset(node) {
    if (this.importDeclarations.length === 0) {
      return node.getStart();
    }
    return this.getLastImportDeclaration().nodeEndOffset;
  }
  // gets the offset of the end of the import's line, including newline, to include comment to the right
  getEndOffset(sourceFile, node) {
    return sourceFile.text.indexOf('\n', node.end) + 1;
  }
  getLastImportDeclaration() {
    return this.importDeclarations[this.importDeclarations.length - 1];
  }
  getImportType(sourcePath, originPath) {
    let type;
    if (originPath.charAt(0) === '.') {
      type = ImportType.CURRENT_DIRECTORY_IMPORT;
    } else if (this.groupedImportsRegex.test(originPath)) {
      type = ImportType.REGEX_PATH_IMPORT;
    } else {
      type = ImportType.LIBRARY_IMPORT;
    }
    return type;
  }
}
// Convert aBcD --> AbCd
function flipCase(str) {
  return Array.from(str)
    .map(char => {
      if (char >= 'a' && char <= 'z') {
        return char.toUpperCase();
      } else if (char >= 'A' && char <= 'Z') {
        return char.toLowerCase();
      }
      return char;
    })
    .join('');
}
// After applying a transformation, are the nodes sorted according to the text they contain?
// If not, return the pair of nodes which are out of order.
function findUnsortedPair(xs, transform) {
  for (let i = 1; i < xs.length; i++) {
    if (transform(xs[i].getText()) < transform(xs[i - 1].getText())) {
      return [xs[i - 1], xs[i]];
    }
  }
  return undefined;
}
function compare(a, b) {
  function isLow(value) {
    return value[0] === '.' || value[0] === '/';
  }
  if (isLow(a) && !isLow(b)) {
    return 1;
  } else if (!isLow(a) && isLow(b)) {
    return -1;
  } else if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  }
  return 0;
}
function removeQuotes(value) {
  // strip out quotes
  if (value.length > 1 && (value[0] === "'" || value[0] === '"')) {
    value = value.substr(1, value.length - 2);
  }
  return value;
}
function getSortedImportDeclarationsAsText(importDeclarations) {
  const sortedDeclarations = sortByKey(importDeclarations.slice(), x => x.sourcePath);
  return sortedDeclarations.map(x => x.text).join('');
}
function sortByKey(xs, getSortKey) {
  return xs.slice().sort((a, b) => compare(getSortKey(a), getSortKey(b)));
}
function moduleDeclarationBody(node) {
  let body = node.body;
  while (body !== undefined && body.kind === ts.SyntaxKind.ModuleDeclaration) {
    body = body.body;
  }
  return body !== undefined && body.kind === ts.SyntaxKind.ModuleBlock ? body : undefined;
}
