import React from 'react';

import createApolloClient, { ApolloClientOptions } from './createApolloClient';

export default function createApolloDecorator(options: ApolloClientOptions) {
  const [ApolloProvider, apolloProps] = createApolloClient({
    ...options,
    fetch: window.fetch, // tslint:disable-line:ban
  });
  return (storyFn: Function) => <ApolloProvider {...apolloProps}>{storyFn()}</ApolloProvider>;
}
