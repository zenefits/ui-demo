// @ts-check
import 'storybook-chromatic'; // NOTE: this needs to go after @storybook/react
import React from 'react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { notificationDecorator } from 'z-frontend-elements';
import { setupStorybook } from 'z-frontend-storybook-config';
import * as path from 'path';

import { trackEvent } from 'z-frontend-app-bootstrap';

function sortByFileName(a, b) {
  const packageA = a.split('/')[0];
  const packageB = b.split('/')[0];

  if (packageA === packageB) {
    const fileA = path.basename(a);
    const fileB = path.basename(b);
    return fileA.localeCompare(fileB);
  }
  return packageA.localeCompare(packageB);
}

import StorybookIntroduction from './StorybookIntroduction';
// @ts-ignore
import { isChromatic } from 'storybook-chromatic';

const defaultPackagesToBuild = ['zbase'];

export default function loadStories() {
  setupStorybook({
    name: 'Zenefits Storybook',
    url: 'http://ui.zenefits.com',
  });

  addDecorator(withKnobs);
  if (!__TEST__) {
    // Avoid adding this decorator since it breaks snapshots
    addDecorator(notificationDecorator);
  }

  const packageNamesToBuild = __AFFECTED_PACKAGES__ ? __AFFECTED_PACKAGES__.split(',') : defaultPackagesToBuild;
  console.log(packageNamesToBuild);
  const packageNamesMap = packageNamesToBuild.reduce((memo, packageName) => {
    memo[packageName] = true;
    return memo;
  }, {});

  const req = require.context('../../../', true, /\.stories\.tsx$/);
  const filtered = req.keys().filter(filename => {
    const packageName = filename.split('/')[0];
    if (filename.startsWith('.') || packageName.includes('example')) {
      return false;
    }
    return packageNamesMap[packageName];
  });
  addIntroduction(filtered.length); // ensure this is the first story
  if (isChromatic()) {
    console.log('tracking chromatic event in heap');
    trackEvent('Chromatic stories', { count: filtered.length });
  }
  filtered
    .sort(sortByFileName) // sort this way instead of `sortStoriesByKind` to preserve order within each storybook
    .forEach(filename => req(filename));
}

function addIntroduction(totalComponents) {
  storiesOf('Introduction', module).add('welcome', () => <StorybookIntroduction totalComponents={totalComponents} />);
}
