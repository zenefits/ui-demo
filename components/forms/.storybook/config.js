// @ts-check
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { themeDecorator } from 'z-frontend-theme';
import { createApolloDecorator, createReduxIntlDecorator } from 'z-frontend-app-bootstrap';
import { createLocaleReducer } from 'z-frontend-app-bootstrap/src/createIntlProvider';
import reducers from './reducers';
import apolloMockConfig from '../mock';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
addLocaleData([...en, ...ru]); // date formats etc

const apolloMockDecorator = createApolloDecorator({ mockConfig: apolloMockConfig });

const localeData = {
  en: {
    foo: 'foo {name}',
    bar: 'bar { hello}',
  },
  ru: {
    foo: 'фуу {name}',
    bar: 'бар {hello}',
  },
};

const reduxIntlDecorator = createReduxIntlDecorator(
  Object.assign({}, reducers, {
    locale: createLocaleReducer('en'),
  }),
  localeData,
);

function loadStories() {
  addDecorator(reduxIntlDecorator);
  addDecorator(apolloMockDecorator);
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}

configure(loadStories, module);
