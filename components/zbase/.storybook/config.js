import React from 'react';
import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { themeDecorator } from 'z-frontend-theme';

import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
addLocaleData([...en, ...ru]); // date formats etc

const locale = 'en';

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

const intlDecorator = story => (
  <IntlProvider locale={locale} messages={localeData[locale]}>
    {story()}
  </IntlProvider>
);

function loadStories() {
  addDecorator(intlDecorator);
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}

configure(loadStories, module);
