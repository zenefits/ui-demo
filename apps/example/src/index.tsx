import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import {
  createApolloClient,
  createIntlProvider,
  createReduxProvider,
  createRouterProvider,
  getBrowserLocale,
  renderApp,
  ApolloClientOptions,
} from 'z-frontend-app-bootstrap';
import { createThemeProvider } from 'z-frontend-theme';
import { createLocaleReducer } from 'z-frontend-app-bootstrap/src/createIntlProvider';

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
  const jsonSchema = require('../schema/schema.json');
  const resolvers = require('../mock/resolvers');
  const mocks = require('../mock/mocks');
  apolloClientOptions.mockConfig = {
    jsonSchema: jsonSchema.default || jsonSchema,
    mocks: mocks.default || mocks,
    resolvers: resolvers.default || resolvers,
  };
}

renderApp({
  App: AppRoutes,
  providers: [
    createReduxProvider({
      reducers: {
        ...reducers,
        locale: createLocaleReducer(__DEVELOPMENT__ ? getBrowserLocale() : 'en'),
      },
    }),
    createApolloClient(apolloClientOptions),
    createIntlProvider(localeData),
    createThemeProvider(),
    createRouterProvider(),
  ],
  hotReloadCallback: renderApp => {
    module.hot.accept('./AppRoutes', () => {
      renderApp(AppRoutes);
    });
  },
  onBoot: () => {},
});
