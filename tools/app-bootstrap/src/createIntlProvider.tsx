import React, { StatelessComponent } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';

// react-intl will use 'en' as default if a locale for user's browser language is not loaded.
// need to import (or lazy load) corresponding locales when we enable support for other languages.

const localeChangeAction = 'LOCALE_CHANGE';

export const localeChangeActionCreator = newLocale => ({ type: localeChangeAction, payload: newLocale });

const LocaleRefreshererCore = ({ children, ...rest }) => React.cloneElement(children, rest);
export const LocaleRefresherComponent = connect((state: any) => ({
  currentLocale: state.locale.current,
}))(LocaleRefreshererCore as StatelessComponent<{}>);

export const createLocaleReducer = defaultLocale => (state = { current: defaultLocale }, action) => {
  if (action.type === localeChangeAction) {
    return {
      ...state,
      current: action.payload,
    };
  } else {
    return state;
  }
};

export default function createIntlProvider(localeData?: any, additionalProps?: any) {
  const IntlProviderWrapper = ({ children, currentLocale, ...rest }) => {
    const languageWithoutRegionCode = currentLocale.toLowerCase().split(/[_-]+/)[0];
    const messages = localeData
      ? localeData[languageWithoutRegionCode] || localeData[currentLocale] || localeData.en
      : null;
    return (
      <IntlProvider {...rest} key={currentLocale} messages={messages} locale={currentLocale}>
        {children}
      </IntlProvider>
    );
  };

  const ConnectedProvider = connect((state: any) => ({
    currentLocale: state.locale.current,
  }))(IntlProviderWrapper);

  return [
    ConnectedProvider,
    {
      ...(additionalProps || {}),
    },
  ];
}
