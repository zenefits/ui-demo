import React, { ComponentType } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { set } from 'lodash';
// @ts-ignore
import { AppContainer } from 'react-hot-loader';

import { APP_STYLE_ROOT_CLASS } from 'z-frontend-theme';

import createProvidersWrapper from './createProvidersWrapper';
import loadPolyfills from './loadPolyfills';
import { getEventLogger } from './event-logger';
import ErrorBoundary from './ErrorBoundary';
import AppInit from './app-init/AppInit';
import { Switches } from '..';
import Walkme from './Walkme';

require('url-search-params-polyfill');

/* type NestedReactApps = {
  [key: string]: {
    start: (element?: HTMLElement) => void;
  };
}; */

declare global {
  interface Window {
    React: any;
    __WITHIN_EMBER_APP__: boolean;
  }
}

declare const module: any;

export interface AppSettings {
  App: any;
  element?: HTMLElement;
  providers?: any[];
  hotReloadCallback: Function;
  onBoot?: Function;
  onError?: (error?: any) => void;
  switchesToLoad?: (keyof Switches)[];
  redirectIfTerminated?: boolean;
  disableIntercom?: boolean;
  disableFirefly?: boolean;
  disableRouteAnalytics?: boolean;
  disableWalkme?: boolean;
}

// Globals for better dev tools console experience
window.React = React; // for react dev tools

// Log global errors
window.addEventListener('error', error => {
  getEventLogger().logError(error);
});
// Chrome only https://developer.mozilla.org/en-US/docs/Web/Events/unhandledrejection
window.addEventListener('unhandledrejection', (error: PromiseRejectionEvent) => {
  getEventLogger().logError(error.reason);
});

export default async function create(settings: AppSettings) {
  const getDefaultElement = () => window.document.getElementById('appRoot');
  const element = settings.element || getDefaultElement();
  if (!element && !window.__WITHIN_EMBER_APP__) {
    throw new Error('no DOM element provided or found for app mount');
  }
  const useHotReloading = __DEVELOPMENT__ && settings.hotReloadCallback;
  const ComposedProviders = createProvidersWrapper([
    useHotReloading && AppContainer,
    Walkme,
    ...(settings.providers || []),
  ]);

  if (typeof window.fetch === 'undefined') {
    await loadPolyfills();
  }

  getEventLogger().log('App booted');
  if (settings.onBoot) {
    settings.onBoot();
  }

  const renderApp = (App: ComponentType, el?: HTMLElement, callback?: () => void) =>
    render(
      <div className={APP_STYLE_ROOT_CLASS}>
        <ErrorBoundary onError={settings.onError} isFullscreen>
          <ComposedProviders>
            <>
              <AppInit
                switchesToLoad={settings.switchesToLoad}
                redirectIfTerminated={settings.redirectIfTerminated}
                disableIntercom={settings.disableIntercom}
                disableWalkme={settings.disableWalkme}
              />
              <App />
            </>
          </ComposedProviders>
        </ErrorBoundary>
      </div>,
      el || element,
      callback,
    );

  if (window.__WITHIN_EMBER_APP__) {
    set(window, `embeddedReactApps.${__APP_NAME__}.start`, (element?: HTMLElement) => {
      const el = element || getDefaultElement();

      if (!el) {
        throw new Error('no element found for render');
      }

      renderApp(settings.App, el);
      if (useHotReloading && module.hot) {
        const _renderApp = (App: ComponentType) => {
          renderApp(App, el);
        };
        settings.hotReloadCallback(_renderApp);
      }

      return new Promise(resolve => {
        renderApp(settings.App, el, resolve);
      });
    });

    set(window, `embeddedReactApps.unmount`, (element?: HTMLElement) => {
      if (element) {
        unmountComponentAtNode(element);
      }
    });
  } else {
    if (useHotReloading && module.hot) {
      settings.hotReloadCallback(renderApp);
    }

    renderApp(settings.App);
  }
}
