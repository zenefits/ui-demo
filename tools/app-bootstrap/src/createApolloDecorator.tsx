import React from 'react';
import createApolloClient, { ApolloClientFactoryOptions } from './createApolloClient';
import { ReduxProviderFactoryOptions, ReduxProviderFactoryResult } from './createReduxProvider';

export default function createApolloDecorator(
  options: ApolloClientFactoryOptions,
  createReduxProvider: (reduxOptions: ReduxProviderFactoryOptions) => ReduxProviderFactoryResult,
) {
  const [ApolloProvider, apolloProps] = createApolloClient(options, createReduxProvider);
  return storyFn => <ApolloProvider {...apolloProps}>{storyFn()}</ApolloProvider>;
}
