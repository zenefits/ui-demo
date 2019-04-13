import {
  createApolloClient,
  createIntlProvider,
  createLocaleReducer,
  createReduxProvider,
  createRouterProvider,
  createRouteAnalyticsProvider,
  getApollo,
  getBrowserLocale,
  renderBaseApp,
  ApolloClientOptions,
  AppSettings,
  ReduxProviderFactoryOptions,
} from 'z-frontend-app-bootstrap';
import { createFireflyKeybinding, createFireflyProvider } from 'z-frontend-firefly';
import { createThemeProvider } from 'z-frontend-theme';
import { NotificationProvider } from 'z-frontend-elements';

export default (
  settings: AppSettings & {
    reduxParams?: ReduxProviderFactoryOptions;
    localeData: any;
    apolloParams?: ApolloClientOptions;
  },
) => {
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

  let providers = [
    [ReduxProvider, reduxProps],
    ...(settings.providers || []),
    createApolloClient(apolloParams),
    createIntlProvider(localeData),
    createThemeProvider(),
    createRouterProvider(),
    NotificationProvider,
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
  });
};
