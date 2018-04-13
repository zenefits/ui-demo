import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import createProvidersWrapper from './createProvidersWrapper';
import loadPolyfills from './loadPolyfills';
import eventLogger from './event-logger';
import ErrorBoundary from './ErrorBoundary';

declare global {
  interface Window {
    React: any;
  }
}

declare const module;
interface AppSettingsType {
  App: any;
  element?: HTMLElement;
  providers: any[];
  hotReloadCallback: Function;
  onBoot?: Function;
  onError?: (error?: any) => void;
}

// Globals for better dev tools console experience
window.React = React; // for react dev tools

window.onerror = function(error) {
  eventLogger.logError(error);
};

export default async function create(settings: AppSettingsType) {
  const element = settings.element || window.document.getElementById('appRoot');
  if (!element) {
    throw new Error('no DOM element provided or found for app mount');
  }
  const useHotReloading = __DEVELOPMENT__ && settings.hotReloadCallback;
  const ComposedProviders = createProvidersWrapper([useHotReloading && AppContainer, ...settings.providers]);

  if (typeof window.fetch === 'undefined') {
    await loadPolyfills();
  }

  const onError = error => {
    if (settings.onError) {
      settings.onError(error);
    }
    eventLogger.logError(error);
  };

  eventLogger.log('App booted');
  if (settings.onBoot) {
    settings.onBoot();
  }

  const renderApp = App =>
    render(
      <ErrorBoundary onError={onError}>
        <ComposedProviders>
          <App />
        </ComposedProviders>
      </ErrorBoundary>,
      element,
    );

  renderApp(settings.App);

  if (useHotReloading) {
    if (module.hot) {
      settings.hotReloadCallback(renderApp);
    }
  }
}
