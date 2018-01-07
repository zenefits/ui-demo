import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import themeDecorator from 'z-frontend-theme/src/themeDecorator';

import { createApolloDecorator } from 'z-frontend-app-bootstrap';
import reducers from './reducers';
import apolloMockConfig from 'z-frontend-forms/mock';

const apolloMockDecorator = createApolloDecorator({ mockConfig: apolloMockConfig }, reducers);

function loadStories() {
  addDecorator(apolloMockDecorator);
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}

configure(loadStories, module);
