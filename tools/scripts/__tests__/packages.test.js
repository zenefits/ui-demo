// @ts-check
const lodash = require('lodash');
const { getAllPackageJsonFiles, getAppPackages, getAppPorts } = require('../src/getAllPackages');

describe('packages', () => {
  it('All packages should contain a valid level (attributes, elements, composites, layouts or app)', async () => {
    const allowedLevels = ['attributes', 'elements', 'composites', 'layouts', 'app', 'tool', 'service'];
    const allPackages = getAllPackageJsonFiles();
    const packagesWithoutJson = allPackages
      .filter(pkg => pkg.name !== 'z-frontend-component-example')
      .filter(pkg => !pkg.json.zenefits || !pkg.json.zenefits.level || !allowedLevels.includes(pkg.json.zenefits.level))
      .map(pkg => pkg.name);
    expect(packagesWithoutJson).toEqual([]);
  });

  it('All apps, except styleguide and talent-native should contain a port', async () => {
    const appPackages = getAppPackages();
    const packagesWithoutPort = appPackages
      .filter(pkg => !pkg.json.config || !pkg.json.config.port)
      .map(pkg => pkg.name);
    expect(packagesWithoutPort).toEqual(['z-styleguide', 'z-frontend-talent-native']);
  });

  it('All app ports should be unique', async () => {
    const appWithPorts = getAppPorts();
    const groupedAppNames = lodash.groupBy(appWithPorts, 'port');
    const portsWithMoreThanOneApp = lodash.values(groupedAppNames).filter(group => group.length > 1);
    expect(portsWithMoreThanOneApp).toEqual([]);
  });

  it('All component storybook ports should be unique', () => {
    const allPackages = getAllPackageJsonFiles();
    const componentPackagesWithPort = allPackages
      .filter(pkg => pkg.shortPath.indexOf('components/') === 0)
      .map(pkg => ({ name: pkg.name, port: pkg.json.config && pkg.json.config.port }))
      .filter(pkg => pkg.port);

    const groupedAppNames = lodash.groupBy(componentPackagesWithPort, 'port');
    const portsWithMoreThanOneApp = lodash.values(groupedAppNames).filter(group => group.length > 1);
    expect(portsWithMoreThanOneApp).toEqual([]);
  });

  it('All app names should start with z-frontend- or @z-frontend- (except styleguide)', async () => {
    const allPackages = getAppPackages();
    const packagesWithoutJson = allPackages
      .filter(pkg => !pkg.name.startsWith('z-frontend-') && !pkg.name.startsWith('@z-frontend-'))
      .map(pkg => pkg.name);
    expect(packagesWithoutJson).toEqual(['z-styleguide']);
  });
});
