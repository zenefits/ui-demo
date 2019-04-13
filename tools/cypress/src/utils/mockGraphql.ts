import fakeLogin from './fakeLogin';

const responseStub = result =>
  Promise.resolve({
    json() {
      return Promise.resolve(result);
    },
    text() {
      return Promise.resolve(JSON.stringify(result));
    },
    ok: true,
  });

const baseFixture = {
  dashboard: {
    id: 'me',
    user: { id: '3', first_name: 'Admin', last_name: 'User', __typename: 'User' },
    employee: {
      id: '1',
      first_name: 'Admin',
      last_name: 'User',
      photoUrl: null,
      __typename: 'all_employee',
    },
    __typename: 'Dashboard',
  },
};
const fixtures = Object.assign({}, baseFixture);

const handleGraphQlRequest = body => {
  if (Array.isArray(body)) {
    return body.map(handleGraphQlRequest);
  }
  // TODO: consider variables as well? Maybe leave it to a function.
  let data = fixtures[body.operationName];
  if (typeof data === 'function') {
    data = data(body);
  }
  return { data };
};

const originalWindowFetchFunction = window.fetch;
let graphqlStub;
const mockGraphQL = staticOrHandler => {
  if (typeof staticOrHandler !== 'function') {
    // TODO: later consider functions as fixtures, instead of apply keep them separate
    // TODO: instead of baseFixture, use modules as defaults or fallback and
    // given `staticOrHandler` just like overrides.
    // TODO: Allow users to call `mockGraphQL` multiple times
    Object.assign(fixtures, staticOrHandler);
  }
  fakeLogin();
  cy.on('window:before:load', win => {
    function fetch(path, req) {
      const { body, method } = req;
      if (path.includes('/graphql') && method === 'POST') {
        return responseStub(handleGraphQlRequest(JSON.parse(body)));
      }
      if (path === '/session_test' || path === '/session_ping') {
        return responseStub(1198.76767015);
      }
      console.log('Calling real fetch for:', path);
      return originalWindowFetchFunction(path, req);
    }

    if (graphqlStub) {
      graphqlStub.restore();
    }
    graphqlStub = cy.stub(win, 'fetch', fetch).as('graphqlStub');
  });
};

export default mockGraphQL;
