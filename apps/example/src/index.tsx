import { sessionTimer, ApolloClientOptions } from 'z-frontend-app-bootstrap';
import renderApp from 'z-frontend-render-app';

import localeData from './locales';
import reducers from './reducers';
import AppRoutes from './AppRoutes';

const fragmentTypes = require('../schema/fragmentTypes.json');

declare const module: __WebpackModuleApi.Module;

const apolloClientOptions: ApolloClientOptions = {
  fragmentTypes,
};

renderApp({
  localeData,
  App: AppRoutes,
  reduxParams: {
    reducers,
  },
  apolloParams: apolloClientOptions,
  hotReloadCallback: (renderApp: Function) => {
    module.hot.accept('./AppRoutes', () => {
      renderApp(AppRoutes);
    });
  },
  onBoot: () => {
    sessionTimer.start();
  },
});
