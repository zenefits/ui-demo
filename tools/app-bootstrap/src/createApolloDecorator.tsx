import React from 'react';
import createApolloClient from './createApolloClient';

export default function createApolloDecorator(config = {}) {
  const [ApolloProvider, apolloProps] = createApolloClient(config);
  return storyFn => <ApolloProvider client={apolloProps.client}>{storyFn()}</ApolloProvider>;
}
