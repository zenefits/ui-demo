import { configure } from '@storybook/react';
import { setupStorybook } from 'z-frontend-storybook-config';

function loadStories() {
  setupStorybook();

  const req = require.context('../src', true, /\.stories\.tsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
