const fs = require('fs');
const ts = require('typescript');
const path = require('path');
const prettier = require('prettier');
const prettierConfig = require('../../../prettier.config');

const exampleRegex = /^\/\/ *loadExample\(['"]([a-z_/.-]+)['"]\);?/i;

function checkLoadExample(content) {
  const matched = content.match(exampleRegex);
  if (!matched) {
    return { found: false };
  }
  return { found: true, path: matched[1] };
}

function normalizeExamplePath(base, examplePath) {
  const absolutePath = path.resolve(path.dirname(base), examplePath);
  return path.extname(absolutePath) ? absolutePath : `${absolutePath}.tsx`;
}

function loadExample(filePath) {
  return fs.readFileSync(filePath).toString();
}

// NOTE: RSG loads examples using Buble, which does not support full ES6/typescript
const prepareExampleRegexList = [
  { regex: /^import[^;]+;/gm, replace: '' }, // strip imports
  { regex: /export default \(\) => \(?/, replace: '' }, // strip export wrapper
  { regex: /(class.*Component)<[^>]*>/, replace: '$1' }, // strip inline types
  { regex: / as \w+/, replace: '' }, // strip typescript assertions
  { regex: /\)?;$/, replace: '' }, // strip export wrapper end
];

function prepareExampleCode(rawCode) {
  let prepared = rawCode.trim();
  prepareExampleRegexList.forEach(regexItem => {
    prepared = prepared.replace(regexItem.regex, regexItem.replace);
  });
  const formatted = prettier.format(
    prepared,
    Object.assign(
      {
        parser: 'babylon',
      },
      prettierConfig,
    ),
  );
  return formatted.trim().replace(/>;$/, '>'); // direct JSX examples look odd with trailing semicolon
}
const componentExportsMap = {};
const componentStatus = {};

exports.loadExternalExamples = (props, exampleFilePath) => {
  const { settings, lang, content } = props;
  const checked = checkLoadExample(content);
  if (checked.found) {
    const filePath = normalizeExamplePath(exampleFilePath, checked.path);
    const loadedExample = loadExample(filePath);
    return {
      content: prepareExampleCode(loadedExample),
      settings,
      lang,
    };
  }

  return props;
};

function getPathFromPackage(packageName, relativePath) {
  const dir = path.dirname(require.resolve(packageName));
  return path.resolve(dir, relativePath);
}

const listofNodesPerPackage = {};
const traverse = sourceFile => {
  const listOfNodes = [];
  const listOfPaths = [];
  function traverseNode(node) {
    ts.forEachChild(node, traverseNode);
    if (node.kind === ts.SyntaxKind.ExportDeclaration) {
      const getEverything = !node.exportClause;
      if (getEverything) {
        listOfNodes.push({ kind: node.kind, text: '*' });
      }
    }
    if (node.kind === ts.SyntaxKind.StringLiteral) {
      listOfPaths.push(node.text);
      listOfNodes.push({ kind: node.kind, text: node.text });
    }
    if (node.kind === ts.SyntaxKind.Identifier) {
      // default is included
      listOfNodes.push({ kind: node.kind, text: node.text });
    }
  }
  traverseNode(sourceFile);
  return {
    listOfPaths,
    listOfNodes,
  };
};

function convertIndexFileToAST(indexFile) {
  const sourceFile = ts.createSourceFile('index.ts', indexFile, ts.ScriptTarget.ES2015, true);
  return traverse(sourceFile);
}

// delimiter comments arent found in ast
function scanForComments(file) {
  const delimiterStartComment = '/** @styleguide-autodiscovery-ignore-start */';
  const delimiterEndComment = '/** @styleguide-autodiscovery-ignore-end */';
  let include = true;

  const fileLines = fs
    .readFileSync(file)
    .toString()
    .split('\n');

  const filteredLines = fileLines.filter(line => {
    if (line === delimiterStartComment) {
      include = false;
      return false;
    }
    if (line === delimiterEndComment) {
      include = true;
      return false;
    }
    if (line.match('//.*$')) {
      return false;
    }
    return include;
  });

  const newFile = filteredLines.join(`\n`);
  return newFile;
}

let packageExportsMap = {};
function buildComponentMap(packageName, pathToIndexFromPackage, customPath) {
  const indexFile = getPathFromPackage(packageName, pathToIndexFromPackage);
  const scannedFile = scanForComments(indexFile);
  const keyForListofNodesPerPackage = customPath || packageName;
  let lastShiftedPath;
  listofNodesPerPackage[keyForListofNodesPerPackage] = convertIndexFileToAST(scannedFile);
  const { listOfPaths } = listofNodesPerPackage[keyForListofNodesPerPackage];
  listofNodesPerPackage[keyForListofNodesPerPackage].listOfNodes.forEach(val => {
    if (val.kind === ts.SyntaxKind.Identifier && listOfPaths.length > 0) {
      let listOfPathsKey = listOfPaths[0];
      if (customPath) {
        listOfPathsKey = `${customPath}${listOfPaths[0].replace('./', '/')}`;
      }
      if (!componentExportsMap[listOfPathsKey]) {
        componentExportsMap[listOfPathsKey] = [];
      }
      if (!packageExportsMap[listOfPathsKey]) {
        packageExportsMap[listOfPathsKey] = [];
      }
      componentExportsMap[listOfPathsKey].push(val.text);
      packageExportsMap[listOfPathsKey].push(val.text);
    } else if (val.kind === ts.SyntaxKind.StringLiteral) {
      lastShiftedPath = listOfPaths.shift();
    } else if (val.kind === ts.SyntaxKind.ExportDeclaration && lastShiftedPath) {
      if (!componentExportsMap[lastShiftedPath]) {
        componentExportsMap[lastShiftedPath] = [];
      }
      if (!packageExportsMap[lastShiftedPath]) {
        packageExportsMap[lastShiftedPath] = [];
      }
      componentExportsMap[lastShiftedPath].push(val.text);
      packageExportsMap[lastShiftedPath].push(val.text);
      const pathToSubDirectoryFromPackageName = lastShiftedPath;
      const pathToSubDirectoryFullPath = getPathFromPackage(
        packageName,
        `${pathToSubDirectoryFromPackageName}/index.ts`,
      );
      const doesIndexInSubDirectoryExist = fs.existsSync(pathToSubDirectoryFullPath);
      if (doesIndexInSubDirectoryExist) {
        buildComponentMap(packageName, pathToSubDirectoryFullPath, pathToSubDirectoryFromPackageName);
      }
    }
  });
}

function createDocumentationPlaceholder(filePath) {
  const templateDocPath = '../../docs/component-placeholder-doc.md';
  const templateDocText = fs.readFileSync(templateDocPath);
  fs.writeFileSync(filePath, templateDocText);
}

function sortByComponentName(a, b) {
  const fileA = path.basename(a).toLowerCase();
  const fileB = path.basename(b).toLowerCase();
  if (fileA < fileB) return -1;
  if (fileA > fileB) return 1;
  return 0;
}

function checkExists(packageName, packageExportPath) {
  let fileExt = '.tsx';
  let testPath = getPathFromPackage(packageName, `${packageExportPath}${fileExt}`);
  let doesPathExist = fs.existsSync(testPath);
  if (!doesPathExist && packageName === 'zbase') {
    fileExt = '.ts';
    testPath = getPathFromPackage(packageName, `${packageExportPath}${fileExt}`);
    doesPathExist = fs.existsSync(testPath);
  }
  return {
    fileExt,
    testPath,
    doesPathExist,
  };
}

function getFullListOfFullPaths(packageName) {
  const fullListOfFullPaths = [];
  if (!(packageName in listofNodesPerPackage)) {
    buildComponentMap(packageName, './index.ts');
    Object.keys(packageExportsMap).forEach(packageExportPath => {
      const { testPath, doesPathExist } = checkExists(packageName, packageExportPath);
      if (doesPathExist) {
        fullListOfFullPaths.push(testPath);
      }
    });
  }
  return fullListOfFullPaths.sort(sortByComponentName);
}

function getComponentToExport(packageExportPath) {
  const exportedMods = packageExportsMap[packageExportPath];

  let compToExport = exportedMods[0];
  const isDefaultExport = exportedMods.indexOf('default');
  if (isDefaultExport > -1 && isDefaultExport + 1 < exportedMods.length) {
    compToExport = exportedMods[isDefaultExport + 1];
  }
  if (compToExport === '*') {
    // this is needed for files like formik/Form.tsx since it has * for an export
    const exportPathStringArray = packageExportPath.split('/');
    compToExport = exportPathStringArray[exportPathStringArray.length - 1];
  }
  if (/^Form[A-Z]/.test(compToExport)) {
    // eslint-disable-next-line no-param-reassign
    compToExport = compToExport.replace(/^Form/, 'Form.');
  } else if (/^Chart[A-Z]/.test(compToExport)) {
    // eslint-disable-next-line no-param-reassign
    compToExport = compToExport.replace(/^Chart/, 'Chart.');
  } else if (/^Table[A-Z]/.test(compToExport)) {
    // eslint-disable-next-line no-param-reassign
    compToExport = compToExport.replace(/^Table/, 'Table.');
  }
  return compToExport;
}

// this needs to return an array of paths for it to apply its ast on
function getComponentPathsFromPackageIndex(packageName) {
  const fullListOfFullPaths = getFullListOfFullPaths(packageName);
  Object.keys(packageExportsMap).forEach(packageExportPath => {
    const { fileExt, testPath, doesPathExist } = checkExists(packageName, packageExportPath);
    if (doesPathExist) {
      const compToExport = getComponentToExport(packageExportPath);
      if (!componentStatus[compToExport]) {
        componentStatus[compToExport] = {};
      }

      const mdFile = testPath.replace(fileExt, '.md');
      const exampleFileExists = fs.existsSync(mdFile);
      if (!exampleFileExists) {
        createDocumentationPlaceholder(mdFile);
        componentStatus[compToExport].docs = false;
      } else {
        const isPlaceholderDocs = fs
          .readFileSync(mdFile)
          .toString()
          .includes('#### Help us!');

        componentStatus[compToExport].docs = !isPlaceholderDocs;
      }
      const testFile = testPath.replace(fileExt, `.test${fileExt}`);
      componentStatus[compToExport].tests = fs.existsSync(testFile);
    }
  });

  fs.writeFileSync('./docs/componentStatusObject.json', JSON.stringify(componentStatus, null, '  '));
  return fullListOfFullPaths;
}

// for testing
exports.prepareExampleCode = prepareExampleCode;
exports.checkLoadExample = checkLoadExample;
exports.normalizeExamplePath = normalizeExamplePath;
exports.getPathFromPackage = getPathFromPackage;
exports.componentExportsMap = componentExportsMap;
exports.convertIndexFileToAST = convertIndexFileToAST;
exports.getComponentPathsFromPackageIndex = getComponentPathsFromPackageIndex;
exports.componentStatus = componentStatus;
exports.getFullListOfFullPaths = getFullListOfFullPaths;
