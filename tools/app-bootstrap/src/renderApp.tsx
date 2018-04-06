import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createProvidersWrapper from './createProvidersWrapper';
import loadPolyfills from './loadPolyfills';

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
}

// Globals for better dev tools console experience
window.React = React; // for react dev tools

export default async function create(settings: AppSettingsType) {
  const element = settings.element || window.document.getElementById('appRoot');
  const useHotReloading = __DEVELOPMENT__ && settings.hotReloadCallback;
  const ComposedProviders = createProvidersWrapper([useHotReloading && AppContainer, ...settings.providers]);
  const onBoot = settings.onBoot;

  if (typeof window.fetch === 'undefined') {
    await loadPolyfills();
  }

  onBoot();

  if (element) {
    if (useHotReloading) {
      const renderApp = App =>
        render(
          <ComposedProviders>
            <App />
          </ComposedProviders>,
          element,
        );

      renderApp(settings.App);

      if (module.hot) {
        settings.hotReloadCallback(renderApp);
      }
    } else {
      render(
        <ComposedProviders>
          <settings.App />
        </ComposedProviders>,
        element,
      );
    }
  }
}
