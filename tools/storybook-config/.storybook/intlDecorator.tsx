import React from 'react';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

import { createIntlProvider } from 'z-frontend-app-bootstrap';

addLocaleData([...en, ...ru]); // date formats etc

const localeData = {
  en: {
    foo: 'foo {name}',
    bar: 'bar {hello}',
    hello: 'Hello {name}!',
    workingAt: 'Working at {company}',
    'reviews.assigned.none': 'No assigned reviews',
    'reviews.assigned.one': '{count} assigned review',
    'reviews.assigned.other': '{count} assigned reviews',
  },
  ru: {
    foo: 'фуу {name}',
    bar: 'бар {hello}',
    hello: 'Привет {name}!',
    workingAt: 'Работает в {company}',
  },
};

const [IntlProvider, intlProps] = createIntlProvider(localeData);
const intlDecorator = (storyFn: Function) => <IntlProvider {...intlProps}>{storyFn()}</IntlProvider>;

export default intlDecorator;
