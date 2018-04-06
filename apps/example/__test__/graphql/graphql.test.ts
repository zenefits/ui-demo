// TODO: move this test to a re-usable place so each app can include some share validations
// of consumer contracts
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from '../../mock/typeDefs';
import { resolvers } from '../../mock/resolvers';

describe('Example Graphql Schema', () => {
  it('The schema and resolver are valid', () => {
    makeExecutableSchema({ typeDefs, resolvers });
  });
});
