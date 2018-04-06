const fs = require('fs');
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
  const formatted = prettier.format(prepared, prettierConfig);
  return formatted.trim().replace(/>;$/, '>'); // direct JSX examples look odd with trailing semicolon
}

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

// for testing
exports.prepareExampleCode = prepareExampleCode;
exports.checkLoadExample = checkLoadExample;
exports.normalizeExamplePath = normalizeExamplePath;
