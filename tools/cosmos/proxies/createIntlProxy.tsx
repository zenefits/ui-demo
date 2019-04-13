import React from 'react';

import { IntlProvider } from 'react-intl';

const messages: { [locale: string]: { [key: string]: any } } = {
  en: {
    foo: 'bar',
  },
};

// adapted from https://github.com/react-cosmos/react-cosmos/issues/636

export default function createIntlProxy() {
  const IntlProxy = (props: any) => {
    const {
      nextProxy,
      fixture: { locale = 'en' },
    } = props;
    const { value: NextProxy, next } = nextProxy;
    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        <NextProxy {...props} nextProxy={next()} />
      </IntlProvider>
    );
  };

  return IntlProxy;
}
