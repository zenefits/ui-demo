// @ts-check
import { addDecorator } from '@storybook/react';
import { themeDecorator } from 'z-frontend-theme';
import { createLocaleReducer, createReduxIntlDecorator } from 'z-frontend-app-bootstrap';

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
    reducers: {
      locale: createLocaleReducer('en'),
    },
  },
  localeData,
);

export default function loadStories() {
  // deliberately not using storybook-config to avoid circular dependency
  addDecorator(reduxIntlDecorator);
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}
