// @ts-check
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { themeDecorator } from 'z-frontend-theme';
import { createApolloDecorator, createReduxIntlDecorator } from 'z-frontend-app-bootstrap';
import { createLocaleReducer } from 'z-frontend-app-bootstrap/src/createIntlProvider';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
addLocaleData([...en, ...ru]); // date formats etc

const localeData = {
  en: {
    hello: 'Hello {name}!',
    workingAt: 'Working at {company}',
  },
  ru: {
    hello: 'Привет {name}!',
    workingAt: 'Работает в {company}',
  },
};

const reduxIntlDecorator = createReduxIntlDecorator(
  {
    locale: createLocaleReducer('en'),
  },
  localeData,
);

function loadStories() {
  addDecorator(reduxIntlDecorator);
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}

configure(loadStories, module);
