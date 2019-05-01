import React from 'react';

import createReduxIntlDecoratorBase from './createReduxIntlDecorator';
import createReduxProviderBase, { ReduxProviderFactoryOptions } from './createReduxProvider';

const createReduxProvider = (options: ReduxProviderFactoryOptions = {}) => {
  const resultOptions = {
    ...options,
    composeFn: options.composeFn || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  };
  return createReduxProviderBase(resultOptions);
};

function createReduxDecoratorBase(options: ReduxProviderFactoryOptions, createReduxProvider: any) {
  const [Provider, props] = createReduxProvider(options);
  return (storyFn: Function) => <Provider {...props}>{storyFn()}</Provider>;
}

const createReduxDecorator = (reduxOptions: ReduxProviderFactoryOptions) => {
  return createReduxDecoratorBase(reduxOptions, createReduxProvider);
};

const createReduxIntlDecorator = (
  reduxOptions: ReduxProviderFactoryOptions = {},
  localeData = {},
  additionalProps = {},
) => {
  return createReduxIntlDecoratorBase(reduxOptions, createReduxProvider, localeData, additionalProps);
};

export { createReduxIntlDecorator, createReduxProvider, createReduxDecorator };
