import React from 'react';

import createIntlProvider from './createIntlProvider';

export default function createReduxIntlDecorator(reducers = {}, createReduxProvider, localeData, additionalProps) {
  const [Provider, props] = createReduxProvider({ reducers });
  const [IntlProvider, intlProps] = createIntlProvider(localeData, additionalProps);
  return storyFn => (
    <Provider {...props}>
      <IntlProvider {...intlProps}>{storyFn()}</IntlProvider>
    </Provider>
  );
}
