import { ApolloClient } from 'apollo-client';
import React, { Suspense } from 'react';

import {
  createApolloClient,
  createIntlProvider,
  createLocaleReducer,
  createReduxProvider,
  createRouterProvider,
  createRouteAnalyticsProvider,
  getApollo,
  getApolloProvider,
  getBrowserLocale,
  renderBaseApp,
  ApolloClientOptions,
  AppSettings,
  ReduxProviderFactoryOptions,
} from 'z-frontend-app-bootstrap';
import { createFireflyKeybinding, createFireflyProvider } from 'z-frontend-firefly';
import { createThemeProvider } from 'z-frontend-theme';
import { LoadingScreen, NotificationProvider } from 'z-frontend-elements';
import { ConnectionManager, PermissionManager, SwitchProvider } from 'z-frontend-network';
import { InjectIntlContext } from 'z-frontend-app-bootstrap/src/createIntlProvider';

const getComponentToRender = (App: any) => () => (
  <Suspense fallback={() => <LoadingScreen />}>
    <App />
  </Suspense>
);

export default function(
  settings: AppSettings & {
    reduxParams?: ReduxProviderFactoryOptions;
    localeData: any;
    apolloParams?: ApolloClientOptions;
    apolloClient?: ApolloClient<any>;
  },
) {
  const { localeData, apolloParams } = settings;
  const reduxParams = settings.reduxParams || {};

  const [ReduxProvider, reduxProps] = createReduxProvider({
    reducers: {
      ...(reduxParams.reducers || {}),
      locale: createLocaleReducer(__DEVELOPMENT__ ? getBrowserLocale() : 'en'),
    },
    middleware: reduxParams.middleware || [],
    composeFn: reduxParams.composeFn,
  });
  const apolloClient =
    settings.apolloClient ||
    createApolloClient({ ...apolloParams, redirectToLoginOnAuthError: !settings.isNonLoggedInContext });
  const [ApolloProvider, apolloProviderProps] = getApolloProvider(apolloClient);

  let providers = [
    [ReduxProvider, reduxProps],
    ...(settings.providers || []),
    [ApolloProvider, apolloProviderProps],
    createIntlProvider(localeData),
    [InjectIntlContext],
    createThemeProvider(),
    createRouterProvider(),
    [PermissionManager, { isNonLoggedInContext: settings.isNonLoggedInContext }], // NOTE this MUST come before SwitchProvider in the list as Switch context relies on permissions
    SwitchProvider,
    NotificationProvider,
    ConnectionManager,
  ];

  if (!settings.disableRouteAnalytics) {
    providers = [...providers, createRouteAnalyticsProvider()];
  }

  if (!settings.disableFirefly) {
    providers = [...providers, createFireflyProvider(), createFireflyKeybinding(getApollo)];
  }

  return renderBaseApp({
    ...(settings as AppSettings),
    providers,
    App: getComponentToRender(settings.App),
  });
}
