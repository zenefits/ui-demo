// @ts-check
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { notificationDecorator } from 'z-frontend-elements';
import { setupStorybook } from 'z-frontend-storybook-config';

export default function loadStories() {
  addDecorator(withKnobs);
  setupStorybook();
  addDecorator(notificationDecorator);

  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}
