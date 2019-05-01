import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import { sessionTimer, ApolloClientOptions } from 'z-frontend-app-bootstrap';
import renderApp from 'z-frontend-render-app';

import localeData from './locales';
import reducers from './reducers';
import AppRoutes from './AppRoutes';
const fragmentTypes = require('../schema/fragmentTypes.json');

addLocaleData([...en, ...es]); // date formats etc
declare const module;

const apolloClientOptions: ApolloClientOptions = {
  fragmentTypes,
};

if (__MOCK_MODE__) {
  // TODO: move back to imports after upgrade to webpack v4
  const gqlSchema = require('../schema/schema.generated.graphql');
  const resolvers = require('../mock/resolvers');
  const mocks = require('../mock/mocks');
  apolloClientOptions.mockConfig = {
    gqlSchema,
    mocks: mocks.default || mocks,
    resolvers: resolvers.default || resolvers,
  };
}

renderApp({
  localeData,
  App: AppRoutes,
  reduxParams: {
    reducers,
  },
  apolloParams: apolloClientOptions,
  hotReloadCallback: renderApp => {
    module.hot.accept('./AppRoutes', () => {
      renderApp(AppRoutes);
    });
  },
  onBoot: () => {
    sessionTimer.start();
  },
});
