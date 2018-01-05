import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createProvidersWrapper from './createProvidersWrapper';

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
}

// Globals for better dev tools console experience
window.React = React; // for react dev tools

export default function create(settings: AppSettingsType) {
  const element = settings.element || window.document.getElementById('appRoot');
  const useHotReloading = __DEVELOPMENT__ && settings.hotReloadCallback;
  const ComposedProviders = createProvidersWrapper([useHotReloading && AppContainer, ...settings.providers]);

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
