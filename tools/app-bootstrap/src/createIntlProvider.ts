import { IntlProvider, addLocaleData } from 'react-intl';

// import en from 'react-intl/locale-data/en';
// addLocaleData([...en]);

// react-intl will use 'en' as default if a locale for user's browser language is not loaded.
// need to import (or lazy load) corresponding locales when we enable support for other languages.
const language = (navigator.languages && navigator.languages[0]) || navigator.language;
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

export default function createIntlProvider(localeData?: any) {
  const messages = localeData ? localeData[languageWithoutRegionCode] || localeData[language] || localeData.en : null;
  return [IntlProvider, { messages, locale: languageWithoutRegionCode }];
}
