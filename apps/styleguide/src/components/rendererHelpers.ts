import path from 'path';

function getPackageNameFromPath(componentPath: string): string {
  const directory = path.dirname(componentPath);
  if (directory.includes('zbase')) {
    return 'zbase';
  }
  if (directory.includes('composite')) {
    return 'z-frontend-composites';
  }
  if (directory.includes('app-bootstrap')) {
    return 'z-frontend-app-bootstrap';
  }
  return directory.replace(/^.*components\/([\w'-]+)\/.*$/, 'z-frontend-$1');
}

export function getImportPath(componentPath: string, name: string) {
  let componentImportName = name;
  if (name.includes('.')) {
    componentImportName = name.split('.')[0];
  }
  const packageName = getPackageNameFromPath(componentPath);
  return `import { ${componentImportName} } from '${packageName}';`;
}

export function getStorybookLiveLink(componentPath: string, name: string) {
  const packageName = getPackageNameFromPath(componentPath);
  const appPrefix = packageName.replace(/^@?z-frontend-/, '');
  const storyKind = encodeURIComponent(`${appPrefix}|${name}`);
  return `./app/stories/?selectedKind=${storyKind}`;
}
