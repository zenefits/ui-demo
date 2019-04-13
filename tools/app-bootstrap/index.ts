/** @styleguide-autodiscovery-ignore-start */
import { ErrorResponse } from 'apollo-link-error';

import createApolloClientBase, { ApolloClientOptions } from './src/createApolloClient';
import { createEventLogger, getEventLogger } from './src/event-logger';
import fetchWrapper from './src/fetchWrapper';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

// add error logging with eventLogger by default for Graphql errors
export const createApolloClient = (options: ApolloClientOptions) =>
  createApolloClientBase({
    ...options,
    fetch: fetchWrapper,
    onGraphqlError(error: ErrorResponse) {
      if (error.networkError) {
        getEventLogger().logError(error.networkError);
      }
      if (error.graphQLErrors && error.graphQLErrors.length) {
        error.graphQLErrors.forEach((gqlError: any) => {
          getEventLogger().logError(gqlError.message ? new Error(gqlError.message) : gqlError);
        });
      }

      if (options.onGraphqlError) {
        return options.onGraphqlError(error);
      }
    },
  });

export { createReduxIntlDecorator, createReduxProvider, createReduxDecorator } from './src/createReduxDecorator';
export { getEventLogger, createEventLogger, ApolloClientOptions, ErrorResponse as GraphqlErrorResponse };
export { ReduxProviderFactoryOptions } from './src/createReduxProvider';
export { default as createApolloDecorator } from './src/createApolloDecorator';
export { default as createRouterProvider } from './src/createRouterProvider';
export { default as createRouteAnalyticsProvider } from './src/createRouteAnalyticsProvider';
export { default as createIntlProvider, createLocaleReducer } from './src/createIntlProvider';
export { default as getBrowserLocale } from './src/getBrowserLocale';
export { default as sessionTimer } from './src/session-timer';
export { default as renderBaseApp, AppSettings } from './src/renderApp';
export { default as fetchWrapper } from './src/fetchWrapper';
export { default as getCookie } from './src/utils/get-cookie';
export { default as getDefaultHeaders } from './src/utils/get-default-headers';
export { default as logout } from './src/utils/log-out';
export { addDelayToResolvers, getDelay, setDelay, timeoutPromise } from './src/utils/mockDelay';
export { setViewports, addScreenshotDelay, skipVisualTest } from './src/utils/storybookUtil';
export { getApollo, setApolloClient, resetApolloClientForTesting } from './src/getApollo';
export { getStore, setStore } from './src/getStore';
export { default as AppInit } from './src/app-init/AppInit';
/** @styleguide-autodiscovery-ignore-end */
export { default as SwitchChecker } from './src/app-init/switches/SwitchChecker';
/** @styleguide-autodiscovery-ignore-start */
export { default as withSwitches, WithSwitchesProps } from './src/app-init/switches/withSwitches';
export {
  default as addSwitchesReducer,
  setSwitchesAction,
  Switches,
  ReduxStateWithSwitches,
} from './src/app-init/switches/switchesRedux';
export { sendActionToEmber, subscribeToEmberMessage } from './src/emberIntegration';
/** @styleguide-autodiscovery-ignore-end */
export { default as PermissionChecker } from './src/app-init/permission/PermissionChecker';
export { default as ErrorBoundary, ErrorBoundaryProps, withErrorBoundary } from './src/ErrorBoundary';
/** @styleguide-autodiscovery-ignore-start */
export { default as withPermissions, WithPermissionsProps } from './src/app-init/permission/withPermissions';
export {
  default as addPermissionsReducer,
  markPermissionsAsLoadingAction,
  setPermissionsAction,
  ReduxStateWithPermissions,
} from './src/app-init/permission/permissionsRedux';
export { Permissions } from './src/app-init/permission/permissionTypes';
// Because graphql-tools cannot recognize the `MockList` that's imported from another module,
// we re-export here for other modules to consume the same `MockList`.
export { MockList } from 'graphql-tools';
export { withWalkmeContext, WalkmeConsumerProps, WalkmeBooter } from './src/Walkme';
export { setEventProperties, trackEvent } from './src/heapAnalytics';
/** @styleguide-autodiscovery-ignore-end */
