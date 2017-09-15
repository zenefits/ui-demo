import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import themeDecorator from '../src/themeDecorator';

function loadStories() {
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^(.*\.stories\.(tsx$))[^.]*$/gim);
  storiesContext.keys().forEach(storiesContext);
}

configure(loadStories, module);
