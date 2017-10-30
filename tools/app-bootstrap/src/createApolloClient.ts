import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import createReduxProvider from './createReduxProvider';
import { Store } from 'react-redux';

declare const __MOCK_MODE__: boolean;

function initializeNetworkInterface() {
  const networkInterface = createNetworkInterface({
    uri: `/graphql`,
    opts: {
      // credentials: 'same-origin',
      credentials: 'include',
    },
    // transportBatching: true,
  });

  function redirectIf403(response) {
    // TODO: extend this so it also works on GraphQL errors where the status is 200 and the error is in the body
    if (response.status === 403) {
      window.location.replace('/accounts/login/');
      return true;
    }
    return false;
  }

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
    const ajaxToken = (new RegExp(`(?:^|; )${encodeURIComponent('ajaxtoken')}=([^;]*)`).exec(document.cookie) || [
      null,
      null,
    ])[1];

    const a = document.createElement('a');
    a.href = req.url;
    // The below check for !a.host is because IE for relative URLs i.e. (/my_fav_api)
    //  doesn't put anything in host which is a reasonable choice.
    if (!a.host || a.host === window.location.host) {
      req.options.headers['X-CSRFToken'] = getCookie('csrftoken');
      req.options.headers['X-PAGEUrl'] = window.location.href;
      req.options.headers['X-AJAXToken'] = ajaxToken;
    }
    console.log('req.options.headers', req.options.headers);
  }

  networkInterface.use([
    {
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        req.options.headers.accept = 'application/json';
        setDefaultHeaders(req);
        next();
      },
    },
  ]);

  networkInterface.useAfter([
    {
      applyAfterware({ response }, next) {
        if (!redirectIf403(response)) {
          next();
        }
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

declare type ApolloClientCreatorProps = { client: ApolloClient; store?: Store<{}> };

export default function createApolloClient(
  { mockConfig }: { mockConfig? } = {},
  reducers: {},
  middleware?: any[],
): [typeof ApolloProvider, ApolloClientCreatorProps] {
  let networkInterface = null;
  if (__MOCK_MODE__ && mockConfig) {
    const { typeDefs, resolvers, mocks } = mockConfig;
    networkInterface = initializeMockedNetworkInterface(typeDefs, resolvers, mocks);
  } else {
    networkInterface = initializeNetworkInterface();
  }

  const client = new ApolloClient({
    networkInterface,
    addTypename: true,
  });

  const apollorProviderProps: ApolloClientCreatorProps = { client };
  const reducersWithApollo = Object.assign({}, reducers, { apollo: client.reducer() });
  const middlewareWithApollo = middleware || [];
  middlewareWithApollo.push(client.middleware());
  const [, { store }] = createReduxProvider(reducersWithApollo, middlewareWithApollo);
  apollorProviderProps.store = store;

  return [ApolloProvider, apollorProviderProps];
}
