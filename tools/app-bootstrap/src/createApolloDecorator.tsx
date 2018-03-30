import React from 'react';
import createApolloClient, { ApolloClientOptions } from './createApolloClient';

export default function createApolloDecorator(options: ApolloClientOptions) {
  const [ApolloProvider, apolloProps] = createApolloClient(options);
  return storyFn => <ApolloProvider {...apolloProps}>{storyFn()}</ApolloProvider>;
}
