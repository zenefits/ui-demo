// import { SchemaLink } from 'apollo-link-schema';
// import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
// import resolvers from './mock/resolvers';
// import typeDefs from './mock/resolvers';
// import mocks from './mock/resolvers';
import createRouterProxy from 'react-cosmos-router-proxy';

import { theme } from 'z-frontend-theme'; // eslint-disable-line import/extensions

import createApolloClient from './proxies/createApolloProxy.ts';
import createStyledComponentsProxy from './proxies/createStyleComponentsProxy.tsx';
import createReduxProxy from './proxies/createReduxProxy.ts';
import createIntlProxy from './proxies/createIntlProxy.tsx';

export default [
  createReduxProxy(),
  createApolloClient(),
  createRouterProxy(),
  createIntlProxy(),
  createStyledComponentsProxy({ theme }),
];
