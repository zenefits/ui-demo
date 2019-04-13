// @ts-check
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { setupStorybook } from 'z-frontend-storybook-config';

export default function loadStories() {
  addDecorator(withKnobs);
  setupStorybook();

  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}
