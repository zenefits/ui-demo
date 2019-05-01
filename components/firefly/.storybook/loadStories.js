// @ts-check
import { addDecorator } from '@storybook/react';
import { themeDecorator } from 'z-frontend-theme';

export default function loadStories() {
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}
