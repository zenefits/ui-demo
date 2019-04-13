import { typeDefs } from './src/typeDefs';
import { resolvers } from './src/resolvers';
import { mocks } from './src/mocks';
import './.storybook/addons';

/** @styleguide-autodiscovery-ignore-start */
export { setupStorybook } from './.storybook/loadStories';
export { paddedBox } from './src/pageDecorator';

export const apolloMockConfig = { typeDefs, resolvers, mocks };
/** @styleguide-autodiscovery-ignore-end */
