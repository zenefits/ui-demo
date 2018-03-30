import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { themeDecorator } from 'z-frontend-theme';

function loadStories() {
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}

configure(loadStories, module);
