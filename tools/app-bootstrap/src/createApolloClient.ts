import 'z-frontend-global-types';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { ReduxProviderFactoryOptions, ReduxProviderFactoryResult } from './createReduxProvider';
import { Store } from 'react-redux';

type GetAdditonalHeaders = () => { [key: string]: string };

function initializeNetworkInterface(getAdditionalHeaders: GetAdditonalHeaders) {
  let graphqlUrl = '/graphql/';
  if (__NATIVE__) {
    if (__DEVELOPMENT__) {
      if (__ANDROID__) {
        // this is default IP address for localhost in genymotion emulator
        graphqlUrl = 'http://10.0.3.2:3000/graphql';
      } else if (__IOS__) {
        graphqlUrl = 'TODO';
      }
    } else {
      // TODO
    }
  }
  const networkInterface = createNetworkInterface({
    uri: graphqlUrl,
    opts: {
      // credentials: 'same-origin',
      credentials: 'include',
    },
    // transportBatching: true,
  });

  // TODO: MM: extract so we can re-use this in abstract.js and other apps
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i += 1) {
        const cookie = (cookies[i] + '').trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  function setDefaultHeaders(req) {
    // Ideally would just use https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
    //  But due to compatibility used
    //  http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
    //  this won't work with service workers since we don't have the dom
    if (window && window.document) {
      const ajaxToken = (new RegExp(`(?:^|; )${encodeURIComponent('ajaxtoken')}=([^;]*)`).exec(
        window.document.cookie,
      ) || [null, null])[1];

      const a = window.document.createElement('a');
      a.href = req.url;
      // The below check for !a.host is because IE for relative URLs i.e. (/my_fav_api)
      //  doesn't put anything in host which is a reasonable choice.
      if (!a.host || a.host === window.location.host) {
        req.options.headers['X-CSRFToken'] = getCookie('csrftoken');
        req.options.headers['X-PAGEUrl'] = window.location.href;
        req.options.headers['X-AJAXToken'] = ajaxToken;
      }
    }
  }

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {} as Headers; // new Headers({}); // Create the header object if needed.
        }
        req.options.headers['accept'] = 'application/json';
        setDefaultHeaders(req);

        if (typeof getAdditionalHeaders === 'function') {
          const additonalHeaders = getAdditionalHeaders();
          Object.keys(additonalHeaders || {}).forEach(headerName => {
            req.options.headers[headerName] = additonalHeaders[headerName];
          });
        }

        next();
      },
    },
  ]);

  networkInterface.useAfter([
    {
      async applyAfterware({ response }, next) {
        const res = response.clone();

        // TODO: handle (log) transport level errors (browser-to-backend transport)
        if (res.status >= 400) {
          next();
          return;
        }

        // Handle backend grapqhl resolver level errors
        const json = await res.json();
        if (json.errors && json.errors.length) {
          json.errors.forEach(gqlError => {
            // maybe log these errors?
            if (__DEVELOPMENT__) {
              console.error('Got error from GraphQL server', gqlError);
            }
            if (gqlError.isNetworkError && gqlError.status === 401) {
              // TODO: check if hash part is not being dropped after going back to the app
              window.location.replace(
                '/accounts/login/?next=' + encodeURIComponent(window.location.pathname + window.location.hash),
              );
            }
          });
        }
        next();
      },
    },
  ]);

  return networkInterface;
}

export function initializeMockedNetworkInterface(typeDefs, resolvers, mocks) {
  const schema = makeExecutableSchema({
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
  return mockNetworkInterfaceWithSchema({ schema });
}

interface ApolloClientCreatorProps {
  client: ApolloClient;
  store?: Store<{}>;
}

interface ApolloClientOptions {
  mockConfig?: any;
  getAdditionalHeaders?: GetAdditonalHeaders;
}

export interface ApolloClientFactoryOptions {
  apolloClientOptions?: ApolloClientOptions;
  reducers?: { [key: string]: any };
  middleware?: any[];
  composeFn?: (any) => any;
}

export default function createApolloClient(
  { apolloClientOptions = {}, reducers = {}, middleware = [], composeFn }: ApolloClientFactoryOptions,
  createReduxProvider: (reduxOptions: ReduxProviderFactoryOptions) => ReduxProviderFactoryResult,
): [typeof ApolloProvider, ApolloClientCreatorProps] {
  const { mockConfig, getAdditionalHeaders } = apolloClientOptions;
  let networkInterface = null;
  if (__MOCK_MODE__ && mockConfig) {
    const { typeDefs, resolvers, mocks } = mockConfig;
    networkInterface = initializeMockedNetworkInterface(typeDefs, resolvers, mocks);
  } else {
    networkInterface = initializeNetworkInterface(getAdditionalHeaders);
  }

  const client = new ApolloClient({
    networkInterface,
    addTypename: true,
  });

  const apollorProviderProps: ApolloClientCreatorProps = { client };
  const reducersWithApollo = Object.assign({}, reducers, { apollo: client.reducer() });

  const middlewareWithApollo = middleware.slice();
  middlewareWithApollo.push(client.middleware());

  const [, { store }] = createReduxProvider({
    composeFn,
    reducers: reducersWithApollo,
    middleware: middlewareWithApollo,
  });

  apollorProviderProps.store = store;

  return [ApolloProvider, apollorProviderProps];
}
