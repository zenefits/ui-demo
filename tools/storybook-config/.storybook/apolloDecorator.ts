import { createApolloDecorator } from 'z-frontend-app-bootstrap';

import { typeDefs } from '../src/typeDefs';
import { resolvers } from '../src/resolvers';
import { mocks } from '../src/mocks';

// cannot simply import from index due to circular dep
const apolloMockConfig = { typeDefs, resolvers, mocks };
const apolloMockDecorator = createApolloDecorator({ mockConfig: apolloMockConfig });

export default apolloMockDecorator;
