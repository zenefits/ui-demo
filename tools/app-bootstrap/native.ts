import createApolloClientBase, { ApolloClientOptions as BaseApolloClientOptions } from './src/createApolloClient';
import getFetchForNative, { ExtraApolloOptions } from './src/getFetchForNative';

declare const tempVar: GlobalFetch;
type Fetch = typeof tempVar.fetch;

export type ApolloClientOptions = BaseApolloClientOptions & ExtraApolloOptions;

export const createApolloClient = (options: ApolloClientOptions) => {
  const fetchFn = (global as any).fetch as Fetch;
  return createApolloClientBase({
    ...options,
    fetch: getFetchForNative({ ...options, fetch: fetchFn }),
  });
};

export { ExtraApolloOptions } from './src/getFetchForNative';
export { default as createReduxProvider } from './src/createReduxProvider';
export { default as createProvidersWrapper } from './src/createProvidersWrapper';
export { default as createIntlProvider, createLocaleReducer, LocaleRefresherComponent } from './src/createIntlProvider';
export { getApollo, setApolloClient, resetApolloClient } from './src/getApollo';
