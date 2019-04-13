// @ts-check
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const { getAllPackageJsonFiles } = require('../src/getAllPackages');

const zFrontendRoot = path.resolve(path.join(__dirname, '../../../'));
const globOptions = { cwd: zFrontendRoot, absolute: true, ignore: ['node_modules/**', 'dist/**'] };

describe('stories', () => {
  it('All stories should have valid kinds', () => {
    const allPackages = getAllPackageJsonFiles();
    const allowedStoryKindPrefixes = allPackages
      .filter(pkg => pkg.shortPath.startsWith('components') || pkg.shortPath.startsWith('apps'))
      .map(pkg => pkg.name.replace(/^@?z-frontend-/, ''));

    // inspect each stories to verify it has a kind (section name) that matches a package.json file
    const storyFiles = glob.sync('{apps,components}/**/*.stories.tsx', globOptions);
    const storyFilesWithInvalidKind = storyFiles.filter(file => {
      const source = fs.readFileSync(file).toString();
      const matches = source.match(/storiesOf\('([^']+)'/);
      if (matches && matches[1]) {
        const kind = matches[1].split('|')[0];
        return !allowedStoryKindPrefixes.includes(kind);
      }
      return true;
    });
    expect(storyFilesWithInvalidKind).toHaveLength(0);
  });
});
