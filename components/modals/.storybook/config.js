// @ts-check
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { themeDecorator } from 'z-frontend-theme';
import { createApolloDecorator, createReduxDecorator } from 'z-frontend-app-bootstrap';
import reducers from './reducers';
import apolloMockConfig from 'z-frontend-forms/mock';

const apolloMockDecorator = createApolloDecorator({ mockConfig: apolloMockConfig });
const reduxDecorator = createReduxDecorator(reducers);

function loadStories() {
  addDecorator(reduxDecorator);
  addDecorator(apolloMockDecorator);
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}

configure(loadStories, module);
