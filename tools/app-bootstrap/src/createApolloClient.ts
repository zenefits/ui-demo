import 'z-frontend-global-types';
import fetch from 'unfetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { SchemaLink } from 'apollo-link-schema';
import { onError, ErrorResponse } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import getMockSchema from 'z-frontend-yp-schema/getMockSchema';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import getCookie from './utils/get-cookie';

type GetAdditonalHeaders = () => { [key: string]: string };
type OnGraphqlError = (error: ErrorResponse) => void;
export { ErrorResponse };

function initializeNetworkInterface(getAdditionalHeaders: GetAdditonalHeaders, onGraphqlError?: OnGraphqlError) {
  let graphqlUrl = '/graphql/';
  if (__NATIVE__) {
    if (__DEVELOPMENT__) {
      if (__ANDROID__) {
        // this is default IP address for localhost in genymotion emulator
        graphqlUrl = 'http://10.0.3.2:3000/graphql';
      } else if (__IOS__) {
        graphqlUrl = 'http://localhost:3000/graphql';
      }
    } else {
      // TODO
    }
  }

  const link = createHttpLink({
    uri: graphqlUrl,
    credentials: 'include',

    fetch: (uri, options) => {
      options.headers['accept'] = 'application/json';
      const defaultHeaders = setDefaultHeaders();
      Object.assign(options.headers, defaultHeaders);

      if (typeof getAdditionalHeaders === 'function') {
        const additonalHeaders = getAdditionalHeaders();
        Object.assign(options.headers, additonalHeaders);
      }
      return (window.fetch || fetch)(uri, options);
    },
  });

  function setDefaultHeaders() {
    const headers = {};
    if (window && window.document) {
      const ajaxToken = (new RegExp(`(?:^|; )${encodeURIComponent('ajaxtoken')}=([^;]*)`).exec(
        window.document.cookie,
      ) || [null, null])[1];

      headers['X-CSRFToken'] = getCookie('csrftoken');
      headers['X-PAGEUrl'] = window.location.href;
      headers['X-AJAXToken'] = ajaxToken;
    }
    return headers;
  }

  const errorLink = onError(errorResponse => {
    const { networkError, graphQLErrors } = errorResponse;

    if (networkError && (networkError as any).statusCode >= 400) {
      if (__DEVELOPMENT__) {
        console.error('Got a network error from GraphQL server', networkError);
      }
    } else if (graphQLErrors && graphQLErrors.length) {
      graphQLErrors.forEach(gqlError => {
        // maybe log these errors?
        if (__DEVELOPMENT__) {
          console.error('Got a graphql error from the server', gqlError);
        }
        if ((gqlError as any).isNetworkError && (gqlError as any).status === 401) {
          // TODO: check if hash part is not being dropped after going back to the app
          window.location.replace(
            '/accounts/login/?next=' + encodeURIComponent(window.location.pathname + window.location.hash),
          );
        }
      });
    }

    if (typeof onGraphqlError === 'function') {
      onGraphqlError(errorResponse);
    }
  });

  return errorLink.concat(link);
}

export function initializeMockedNetworkInterface(mockConfig: MockConfig) {
  let schema;
  if ((mockConfig as JsonMockConfig).jsonSchema) {
    const { jsonSchema, resolvers, mocks } = mockConfig as JsonMockConfig;
    schema = getMockSchema(jsonSchema, resolvers, mocks);
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
  jsonSchema: any;
}

type MockConfig = TypeDefsMockConfig | JsonMockConfig;

export interface ApolloClientOptions {
  mockConfig?: MockConfig;
  getAdditionalHeaders?: GetAdditonalHeaders;
  onGraphqlError?: OnGraphqlError;
}

export default function createApolloClient(
  apolloClientOptions: ApolloClientOptions = {},
): [typeof ApolloProvider, ApolloClientCreatorProps] {
  const { mockConfig, getAdditionalHeaders, onGraphqlError } = apolloClientOptions;
  let link = null;
  if (__MOCK_MODE__ && mockConfig) {
    link = initializeMockedNetworkInterface(mockConfig);
  } else {
    link = initializeNetworkInterface(getAdditionalHeaders, onGraphqlError);
  }

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache({
      addTypename: true,
    }),
  });

  const apollorProviderProps: ApolloClientCreatorProps = { client };

  return [ApolloProvider, apollorProviderProps];
}
