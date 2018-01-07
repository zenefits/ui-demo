import createApolloClientBase, { ApolloClientFactoryOptions } from './src/createApolloClient';
import createReduxProvider from './src/createReduxProvider';

const createApolloClient = (options: ApolloClientFactoryOptions = {}) =>
  createApolloClientBase(options, createReduxProvider);

export { createApolloClient };

export { default as createReduxProvider } from './src/createReduxProvider';
export { default as createProvidersWrapper } from './src/createProvidersWrapper';
// export { default as createIntlProvider } from './src/createIntlProvider';
