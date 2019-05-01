// @ts-check
import React from 'react';
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
    'reviews.assigned.none': 'No assigned reviews',
    'reviews.assigned.one': '{count} assigned review',
    'reviews.assigned.other': '{count} assigned reviews',
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

export default function loadStories() {
  // deliberately not using storybook-config to avoid circular dependency
  addDecorator(intlDecorator);
  addDecorator(themeDecorator);
  const storiesContext = require.context('../src', true, /^\.\/.*\.stories\.tsx$/);
  storiesContext.keys().forEach(storiesContext);
}
