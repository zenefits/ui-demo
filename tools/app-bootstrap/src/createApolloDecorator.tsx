import React from 'react';
import createApolloClient from './createApolloClient';

export default function createApolloDecorator(config = {}, reducers: {}, middlware?: any[]) {
  const [ApolloProvider, apolloProps] = createApolloClient(config, reducers, middlware);
  return storyFn => <ApolloProvider {...apolloProps}>{storyFn()}</ApolloProvider>;
}
