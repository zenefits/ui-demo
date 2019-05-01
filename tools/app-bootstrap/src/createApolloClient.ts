import { ApolloClient } from 'apollo-client';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { SchemaLink } from 'apollo-link-schema';
import { onError, ErrorResponse } from 'apollo-link-error';
import { ApolloReducerConfig, IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { ApolloLink } from 'apollo-link';

import 'z-frontend-global-types';
import getMockSchema from 'z-frontend-yp-schema/getMockSchema';

import getDefaultHeaders from './utils/get-default-headers';
import { setApolloClient } from './getApollo';

type GetAdditionalHeaders = () => Promise<{ [key: string]: string }>;
type OnGraphqlError = (error: ErrorResponse) => void;
export { ErrorResponse };

export interface NetworkInterfaceInitParamsFetch {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

interface NetworkInterfaceInitParams {
  url?: string;
  getAdditionalHeaders?: GetAdditionalHeaders;
  onGraphqlError?: OnGraphqlError;
}

function initializeNetworkInterface(params: NetworkInterfaceInitParams & NetworkInterfaceInitParamsFetch) {
  let graphqlUrl = '/graphql/';
  if (params.url) {
    graphqlUrl = params.url;
  } else if (__NATIVE__) {
    if (__ANDROID__) {
      // this is default IP address for localhost in genymotion emulator
      graphqlUrl = 'http://10.0.3.2:3000/graphql';
    } else if (__IOS__) {
      graphqlUrl = 'http://localhost:3000/graphql';
    }
  }

  const link = new BatchHttpLink({
    uri: graphqlUrl,
    credentials: 'include',

    fetch: async (uri: string, options: RequestInit) => {
      (options.headers as any).accept = 'application/json';

      // add current origin value as 'x-origin' header so graphql server can use it as base url
      // if browser doesn't add 'origin' header (e.g IE11 in some cases)
      if (window && window.location) {
        (options.headers as any)['x-origin'] = window.location.origin;
      }

      const defaultHeaders = getDefaultHeaders();
      Object.assign(options.headers, defaultHeaders);

      if (typeof params.getAdditionalHeaders === 'function') {
        const additonalHeaders = await params.getAdditionalHeaders();
        Object.assign(options.headers, additonalHeaders);
      }

      return params.fetch(uri, options);
    },
  });

  const errorLink = onError(errorResponse => {
    const { networkError, graphQLErrors } = errorResponse;

    if (networkError && (networkError as any).statusCode >= 400) {
      if (__DEVELOPMENT__) {
        console.error('Got a network error from GraphQL server', networkError);
      }
    } else if (graphQLErrors && graphQLErrors.length) {
      if (__DEVELOPMENT__) {
        console.error('Got a graphql error(s) from the server', graphQLErrors);
      }
      graphQLErrors.forEach(gqlError => {
        // maybe log these errors?
        if ((gqlError as any).isNetworkError && (gqlError as any).status === 401) {
          // TODO: check if hash part is not being dropped after going back to the app
          if (!__NATIVE__) {
            window.location.replace(
              '/accounts/login/?next=' + encodeURIComponent(window.location.pathname + window.location.hash),
            );
          }
        }
      });
    }

    if (typeof params.onGraphqlError === 'function') {
      params.onGraphqlError(errorResponse);
    }
  });

  return errorLink.concat(link);
}

export function initializeMockedNetworkInterface(mockConfig: MockConfig) {
  let schema;
  if ((mockConfig as JsonMockConfig).jsonSchema || (mockConfig as JsonMockConfig).gqlSchema) {
    const { jsonSchema, gqlSchema, resolvers, mocks } = mockConfig as JsonMockConfig;
    schema = getMockSchema(jsonSchema || gqlSchema, resolvers, mocks);
  } else {
    const { mocks, typeDefs, resolvers } = mockConfig as TypeDefsMockConfig;
    schema = makeExecutableSchema({
      typeDefs,
      resolvers,
    });
    if (mocks) {
      addMockFunctionsToSchema({
        schema,
        mocks,
        preserveResolvers: true,
      });
    }
  }
  return new SchemaLink({ schema });
}

interface ApolloClientCreatorProps {
  client: ApolloClient<any>;
}

interface TypeDefsMockConfig {
  typeDefs: any;
  resolvers: any;
  mocks?: any;
}

interface JsonMockConfig {
  resolvers: any;
  mocks?: any;
  jsonSchema?: any;
  gqlSchema?: any;
}

type MockConfig = TypeDefsMockConfig | JsonMockConfig;

export interface ApolloClientOptions extends NetworkInterfaceInitParams {
  mockConfig?: MockConfig;
  fragmentTypes?: any;
}

export default function createApolloClient(
  apolloClientOptions: ApolloClientOptions & NetworkInterfaceInitParamsFetch,
): [typeof ApolloProvider, ApolloClientCreatorProps] {
  const { mockConfig, getAdditionalHeaders, onGraphqlError, fragmentTypes, fetch, ...rest } = apolloClientOptions;
  let link: ApolloLink | null = null;
  if ((__MOCK_MODE__ || __IS_STORYBOOK__) && mockConfig) {
    link = initializeMockedNetworkInterface(mockConfig);
  } else {
    link = initializeNetworkInterface({ getAdditionalHeaders, onGraphqlError, fetch, ...rest });
  }

  const cacheConfig: ApolloReducerConfig = {
    addTypename: true,
  };

  if (fragmentTypes) {
    cacheConfig.fragmentMatcher = new IntrospectionFragmentMatcher({
      introspectionQueryResultData: fragmentTypes,
    });
  }

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(cacheConfig),
  } as any);

  setApolloClient(client);

  const apolloProviderProps: ApolloClientCreatorProps = { client };

  return [ApolloProvider, apolloProviderProps];
}
