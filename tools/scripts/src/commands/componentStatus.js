// @ts-check

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const zFrontendRoot = path.resolve(path.join(__dirname, '../../../../'));

const options = {
  cwd: path.resolve(zFrontendRoot, './components'),
  nodir: true,
  absolute: true,
  ignore: ['**/example/**/*.tsx', '**/*.{test,stories}.tsx'],
};

const blacklist = {
  tests: [
    'ThemeProvider', // nothing to test, really
  ],
  docs: [
    'FocusLoop',
    'NotificationProvider', // docs are under Notification
    'PassiveNotification', // docs are under Notification
    'ThemeProvider', // docs are broken down into color etc
  ],
};

function emojify(status) {
  if (status === 'skipped') {
    return '🙈';
  }
  return status ? '✅' : '❌';
}

function formatStatusReport(report, maxNameLength) {
  return `${report.name.padStart(maxNameLength)} - Tests? ${emojify(report.tests)} Docs? ${emojify(report.docs)}`;
}

function getComponentNameFromPath(componentPath) {
  return path.basename(componentPath, '.tsx');
}

function getStatus(componentPath, statusType) {
  const name = getComponentNameFromPath(componentPath);
  if (blacklist[statusType].includes(name)) {
    return 'skipped';
  }

  const replacement = statusType === 'tests' ? '.test.tsx' : '.md';
  return fs.existsSync(componentPath.replace('.tsx', replacement));
}

function getComponentStatusReport(componentPath) {
  return {
    tests: getStatus(componentPath, 'tests'),
    docs: getStatus(componentPath, 'docs'),
    package: path
      .dirname(componentPath)
      .replace(/.*components\//, '')
      .split('/')[0],
    name: getComponentNameFromPath(componentPath),
  };
}

function getSummary(label, current, total) {
  return `${label}: ${current}/${total} = ${((current / total) * 100).toFixed(1)}%`;
}

function computeMaxNameLength(max, componentPath) {
  const len = getComponentNameFromPath(componentPath).length;
  return len > max ? len : max;
}

const run = () => {
  try {
    const componentList = glob.sync('**/[A-Z]*.tsx', options);

    const total = componentList.length;
    const maxComponentNameLength = componentList.reduce(computeMaxNameLength, 0);
    const statusReports = componentList.map(component => getComponentStatusReport(component));

    let hasTests = 0;
    let hasDocs = 0;
    let currentPackage = '';
    statusReports.forEach(report => {
      const formatted = formatStatusReport(report, maxComponentNameLength);
      if (report.package !== currentPackage) {
        currentPackage = report.package;
        const heading = `${report.package} `.padEnd(2 + formatted.length, '-');
        console.log(`\n${heading}`);
      }
      hasTests += report.tests ? 1 : 0;
      hasDocs += report.docs ? 1 : 0;
      console.log(formatted);
    });

    console.log(getSummary('Tests', hasTests, total));
    console.log(getSummary('Docs', hasDocs, total));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
};

module.exports = {
  name: 'componentStatus',
  info: 'check test and doc status for each component',
  run,
};
