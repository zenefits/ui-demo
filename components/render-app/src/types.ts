import { ApolloClient } from 'apollo-client';

import { ApolloClientOptions, AppSettings, ReduxProviderFactoryOptions } from 'z-frontend-app-bootstrap';

export type RenderAppSettings = AppSettings & {
  reduxParams?: ReduxProviderFactoryOptions;
  localeData: any;
  apolloParams?: ApolloClientOptions;
  apolloClient?: ApolloClient<any>;
};
