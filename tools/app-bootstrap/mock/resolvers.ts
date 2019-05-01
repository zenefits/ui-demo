import { addDelayToResolvers } from '../src/utils/mockDelay';

// http://dev.apollodata.com/tools/graphql-tools/mocking.html#Using-MockList-in-resolvers
const resolvers = {};

export default addDelayToResolvers(resolvers);
