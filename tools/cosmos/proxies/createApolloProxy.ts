import 'whatwg-fetch';
// @ts-ignore
import createApolloProxy from 'react-cosmos-apollo-proxy';
// import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// console.log({ typeDefs, resolvers, mocks });
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });
// if (mocks) {
//   addMockFunctionsToSchema({
//     schema,
//     mocks,
//     preserveResolvers: true,
//   });
// }
// const client = new ApolloClient({
//   link: new SchemaLink({ schema }),
//   cache: new InMemoryCache({
//     addTypename: true,
//   }),
// });
// const ApolloProxy = createApolloProxy({ client });

// tslint:disable-next-line:ban
const link = new BatchHttpLink({ uri: 'http://localhost:8989/graphql', fetch: window.fetch });

const clientOptions = {
  link,
  cache: new InMemoryCache({ addTypename: true }),
};

export default () => createApolloProxy({ clientOptions });
