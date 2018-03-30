import createReduxProviderBase, { ReduxProviderFactoryOptions } from './src/createReduxProvider';
import createReduxDecoratorBase from './src/createReduxDecorator';
import createReduxIntlDecoratorBase from './src/createReduxIntlDecorator';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export const createReduxProvider = (options: ReduxProviderFactoryOptions = {}) => {
  const resultOptions = {
    ...options,
    composeFn: options.composeFn || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  };
  return createReduxProviderBase(resultOptions);
};

export const createReduxDecorator = (reducers = {}) => {
  return createReduxDecoratorBase(reducers, createReduxProvider);
};

export const createReduxIntlDecorator = (reducers = {}, localeData = {}, additionalProps = {}) => {
  return createReduxIntlDecoratorBase(reducers, createReduxProvider, localeData, additionalProps);
};

export { default as createApolloDecorator } from './src/createApolloDecorator';
export { default as createApolloClient, ApolloClientOptions } from './src/createApolloClient';
export { default as createRouterProvider } from './src/createRouterProvider';
export { default as createRouteAnalyticsProvider } from './src/createRouteAnalyticsProvider';
export { default as createIntlProvider } from './src/createIntlProvider';
export { default as getBrowserLocale } from './src/getBrowserLocale';
// NOTE: this isn't here since it breaks jest because it doesn't understand `import`
// export { default as bootIntercom } from './src/boot-intercom';
export { default as renderApp } from './src/renderApp';

// Because graphql-tools cannot recognize the `MockList` that's imported from another module,
// we re-export here for other modules to consume the same `MockList`.
export { MockList } from 'graphql-tools';
