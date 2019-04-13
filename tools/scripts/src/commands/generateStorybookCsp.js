// @ts-check

const fs = require('fs-extra');

const getCsp = require('z-frontend-csp').processCspParam;

const run = async () => {
  const appPath = process.cwd();
  const csp = getCsp();
  const previewHeadPath = '.storybook/preview-head.html';
  const cspPath = `${appPath}/${previewHeadPath}`;
  const cspHtml = `<meta http-equiv="Content-Security-Policy" content="${csp}">`;

  if (!fs.existsSync(`${appPath}/.storybook`)) {
    throw new Error('No storybook folder found in this project');
  }

  const existingCspHtml = fs.existsSync(cspPath) ? fs.readFileSync(cspPath).toString() : '';

  if (existingCspHtml !== cspHtml) {
    fs.outputFileSync(cspPath, cspHtml);
  } else {
    console.log(`Generated storybook csp matches existing file (${cspPath})`);
  }
};

module.exports = {
  name: 'generateStorybookCsp',
  info: 'updates storybook csp for all storybook apps',
  run,
};
