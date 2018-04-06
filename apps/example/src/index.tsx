import {
  createReduxProvider,
  renderApp,
  createApolloClient,
  createRouterProvider,
  createIntlProvider,
  // eventLogger,
} from 'z-frontend-app-bootstrap';
import { createThemeProvider } from 'z-frontend-theme';
import { createLocaleReducer } from 'z-frontend-app-bootstrap/src/createIntlProvider';

import reducers from './reducers';
import App from './App';
import mockConfig from '../mock';

declare const module;

const apolloClientOptions = __MOCK_MODE__ ? { mockConfig } : {};

renderApp({
  App,
  providers: [
    createReduxProvider({
      reducers: {
        ...reducers,
        locale: createLocaleReducer('en'),
      },
    }),
    createApolloClient(apolloClientOptions),
    createIntlProvider(),
    createThemeProvider(),
    createRouterProvider(),
  ],
  hotReloadCallback: renderApp => {
    module.hot.accept('./App', () => {
      renderApp(App);
    });
  },
  onBoot: () => {
    // eventLogger.log('App booted');
  },
});
