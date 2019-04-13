import React from 'react';

import createIntlProvider from './createIntlProvider';
import { ReduxProviderFactoryOptions, ReduxProviderFactoryResult } from './createReduxProvider';

export default function createReduxIntlDecorator(
  reduxParams: ReduxProviderFactoryOptions,
  createReduxProvider: (params: ReduxProviderFactoryOptions) => ReduxProviderFactoryResult,
  localeData: any,
  additionalProps: any,
) {
  const [Provider, props] = createReduxProvider(reduxParams);
  const [IntlProvider, intlProps] = createIntlProvider(localeData, additionalProps);
  return (storyFn: Function) => (
    <Provider {...props}>
      <IntlProvider {...intlProps}>{storyFn()}</IntlProvider>
    </Provider>
  );
}
