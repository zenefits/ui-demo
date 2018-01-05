import createApolloClientBase, { ApolloClientFactoryOptions } from './src/createApolloClient';
import createReduxProviderBase, { ReduxProviderFactoryOptions } from './src/createReduxProvider';
import createApolloDecoratorBase from './src/createApolloDecorator';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

const createReduxProvider = (options: ReduxProviderFactoryOptions = {}) => {
  const resultOptions = {
    ...options,
    composeFn: options.composeFn || window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,
  };
  return createReduxProviderBase(resultOptions);
};

const createApolloClient = (options: ApolloClientFactoryOptions = {}) =>
  createApolloClientBase(options, createReduxProvider);

const createApolloDecorator = (options: ApolloClientFactoryOptions = {}) =>
  createApolloDecoratorBase(options, createReduxProvider);

export { createApolloClient, createReduxProvider, createApolloDecorator };

export { default as createReduxDecorator } from './src/createReduxDecorator';
export { default as createRouterProvider } from './src/createRouterProvider';
export { default as createIntlProvider } from './src/createIntlProvider';
export { default as renderApp } from './src/renderApp';

// Because graphql-tools cannot recognize the `MockList` that's imported from another module,
// we re-export here for other modules to consume the same `MockList`.
export { MockList } from 'graphql-tools';
