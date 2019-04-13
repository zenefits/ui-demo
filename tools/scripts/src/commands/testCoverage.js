// @ts-check

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');
const sendToSignalfx = require('../../../../src/scripts/sendToSignalfx');
const helpers = require('../../../../apps/styleguide/config/styleguideHelpers');

const readdir = promisify(fs.readdir);

const zFrontendRoot = path.resolve(path.join(__dirname, '../../../../'));
const appDirectory = path.resolve(path.join(zFrontendRoot, '/apps'));

async function getAppList() {
  const appsContent = await readdir(appDirectory);
  const appDirectories = appsContent.filter(content => fs.lstatSync(path.join(appDirectory, content)).isDirectory());
  return appDirectories;
}

function getPercentage(amount, total) {
  return total > 0 ? Math.round((100 * amount) / total) : 0;
}

function getAppTestsInfo(appFiles) {
  let cypressTotal = 0;
  let storiesTotal = 0;
  let otherTotal = 0;
  appFiles.filter(file => {
    if (file.includes('.spec.ts')) {
      cypressTotal += 1;
      return true;
    } else if (file.includes('.stories.tsx')) {
      storiesTotal += 1;
      return true;
    } else if (file.includes('.test.tsx') || file.includes('.test.ts')) {
      otherTotal += 1;
      return true;
    }
    return false;
  });
  const totalNumberOfTestFiles = cypressTotal + storiesTotal + otherTotal;
  const percentageOfTestFilesToAppFiles = getPercentage(totalNumberOfTestFiles, appFiles.length);

  return {
    totalNumberOfAppFiles: `${appFiles.length}`,
    totalNumberOfTestFiles: `${totalNumberOfTestFiles}`,
    percentageOfTestFilesToAppFiles,
    totalNumberOfCypressFiles: `${cypressTotal}`,
    totalNumberOfStoriesFiles: `${storiesTotal}`,
    totalNumberOfOtherTestFiles: `${otherTotal}`,
  };
}

function findAppFiles(app) {
  const appRootDirectory = path.resolve(path.join(appDirectory, app));
  const options = {
    cwd: path.resolve(appRootDirectory),
    nodir: true,
    absolute: true,
  };
  return glob.sync('**/*@(.tsx|.spec.ts|.test.ts)', options);
}

async function getAllAppsTestInfo() {
  let appList;
  // TODO/ future
  // how many tests per test file
  // find any file that is missing an accompanying test file
  try {
    appList = await getAppList();
  } catch (e) {
    console.error('There was an error reading the app directories.');
  }
  const appsTestInfo = {};
  appList.map(app => {
    const testInfo = getAppTestsInfo(findAppFiles(app));

    const { percentageOfTestFilesToAppFiles } = testInfo;
    const dimensions = {
      ...testInfo,
      appName: app,
      percentageOfTestFilesToAppFiles: `${percentageOfTestFilesToAppFiles}%`,
    };
    appsTestInfo[app] = dimensions;
    // sent to signal fx https://app.signalfx.com/#/chart/v2/Dy7OTfaAYAA?density=2&startTime=-2h&endTime=Now
    sendToSignalfx('uiplatform.test-coverage.apps', percentageOfTestFilesToAppFiles, dimensions);
    return app;
  });

  return appsTestInfo;
}

function getPathFromPackage(packageName, relativePath) {
  const dir = path.dirname(require.resolve(packageName));
  return path.resolve(dir, relativePath);
}

function getCypressTotal(packageName) {
  const cypressDir = getPathFromPackage(packageName, 'cypress');
  const options = {
    cwd: path.resolve(cypressDir),
    nodir: true,
    absolute: true,
  };
  const cy = glob.sync('**/*@(.spec.ts)', options);
  return cy.length;
}

function getComponentTestInfo(components, match) {
  let rtlEnzymeTotal = 0;
  let storiesTotal = 0;
  components.forEach(comp => {
    const fileExt = comp.includes('.tsx') ? '.tsx' : '.ts';
    const doesRtlOrEnzymeExist = fs.existsSync(comp.replace(fileExt, `.test${fileExt}`));
    if (doesRtlOrEnzymeExist) {
      rtlEnzymeTotal += 1;
    }
    const doesStoryExist = fs.existsSync(comp.replace(fileExt, `.stories${fileExt}`));
    if (doesStoryExist) {
      storiesTotal += 1;
    }
  });
  const cypressTotal = getCypressTotal(match);
  // cypress should take over rtl and enzyme tests
  const componentTestTotal = rtlEnzymeTotal + cypressTotal;
  const allTests = componentTestTotal + storiesTotal;
  // full test coverage = story + some sort of component test for each component
  const testCoveragePercentage = Math.round((allTests * 100) / components.length / 2);
  return {
    testCoveragePercentage,
    totalNumberOfTestFiles: `${allTests}`,
    totalNumberOfComponentTestFiles: `${componentTestTotal}`,
    totalNumberOfStoriesFiles: `${storiesTotal}`,
    totalNumberOfComponents: `${components.length}`,
  };
}

async function getAllComponentsTestInfo() {
  const tests = {};
  // using the packages used in the styleguide
  // only way to know which packages are used in style guide is to parse styleguide.config
  const configPath = path.resolve(__dirname, '../../../../apps/styleguide/styleguide.config.js');
  const config = fs.readFileSync(configPath).toString();
  config.match(/getComponentPathsFromPackageIndex\((.*)\)/g).map(match => {
    const componentPackage = match.replace(/getComponentPathsFromPackageIndex\('(.*)'\)/, '$1');
    const componentPaths = helpers.getFullListOfFullPaths(componentPackage);
    const componentTestInfo = getComponentTestInfo(componentPaths, componentPackage);
    const dimensions = {
      ...componentTestInfo,
      packageName: componentPackage,
      testCoveragePercentage: `${componentTestInfo.testCoveragePercentage}%`,
    };
    tests[componentPackage] = dimensions;
    // sent to signal fx https://app.signalfx.com/#/chart/v2/DzOiyyoAYAE?density=2&startTime=-2h&endTime=Now
    sendToSignalfx('uiplatform.test-coverage.components', componentTestInfo.testCoveragePercentage, dimensions);
    return componentTestInfo;
  });

  return tests;
}

const run = async () => {
  const allAppsTestInfo = await getAllAppsTestInfo();
  console.log(
    allAppsTestInfo,
    'ALL APPS TEST INFO - https://app.signalfx.com/#/chart/v2/Dy7OTfaAYAA?density=2&startTime=-2h&endTime=Now',
  );
  console.log('----------------------');
  const allComponentsTestInfo = await getAllComponentsTestInfo();
  console.log(
    allComponentsTestInfo,
    'ALL COMPONENTS TEST INFO - https://app.signalfx.com/#/chart/v2/DzOiyyoAYAE?density=2&startTime=-2h&endTime=Now',
  );
};

module.exports = {
  name: 'testCoverage',
  info: 'check test coverage for each app',
  run,
};
