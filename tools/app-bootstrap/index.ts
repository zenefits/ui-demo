export { default as createApolloClient } from './src/createApolloClient';
export { default as createApolloDecorator } from './src/createApolloDecorator';
export { default as createReduxProvider } from './src/createReduxProvider';
export { default as createReduxDecorator } from './src/createReduxDecorator';
export { default as createRouterProvider } from './src/createRouterProvider';
export { default as createIntlProvider } from './src/createIntlProvider';
export { default as renderApp } from './src/renderApp';

// Because graphql-tools cannot recognize the `MockList` that's imported from another module,
// we re-export here for other modules to consume the same `MockList`.
export { MockList } from 'graphql-tools';
