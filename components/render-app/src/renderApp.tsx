import { DocumentNode } from 'graphql';
import { set } from 'lodash';

import {
  createApolloClient,
  initializePerformanceAnalytics,
  loadPolyfillsIfNeeded,
  ApolloClient,
} from 'z-frontend-app-bootstrap';

import { RenderAppSettings } from './types';

type RenderAppSettingsWithQueries = RenderAppSettings & {
  initialQueries?: DocumentNode[];
  isNonLoggedInContext?: boolean;
};

async function doRender(settings: RenderAppSettingsWithQueries, apolloClient: ApolloClient<any>) {
  /*
   * To fire gql queries as quickly as possible we send them and then import the chunk in charge of rendering the page.
   * This means we can avoid a long script parse/render cycle before sending these off
   */

  const renderApp = (
    await import(/* webpackChunkName: "preload-perform-boot-render", webpackPreload: true */ './performRender')
  ).default;
  return renderApp({ ...settings, apolloClient });
}

export default async function create(settings: RenderAppSettingsWithQueries) {
  initializePerformanceAnalytics(settings.boomerangOptions || {});

  const apolloClient = createApolloClient({
    ...settings.apolloParams,
    redirectToLoginOnAuthError: !settings.isNonLoggedInContext,
  });

  let startPromise;
  if (settings.initialQueries) {
    startPromise = new Promise(resolve => {
      const polyfillPromise = loadPolyfillsIfNeeded();
      polyfillPromise.then(() => {
        settings.initialQueries.forEach(query => {
          apolloClient.query({ query });
        });

        // Wait till next tick so the queries have a chance to fire
        setTimeout(async () => {
          await doRender(settings, apolloClient);
          resolve();
        }, 0);
      });
    });
  } else {
    startPromise = doRender(settings, apolloClient);
  }

  if (window.__WITHIN_EMBER_APP__) {
    // Wait till next tick so the queries have a chance to fire
    set(window, `embeddedReactApps.${__APP_NAME__}.waitForReady`, startPromise);
  }
}
