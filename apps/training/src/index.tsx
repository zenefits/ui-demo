import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ro from 'react-intl/locale-data/ro';

import renderApp from 'z-frontend-render-app';

import reducers from './reducers';
import App from './App';
import localeData from './locales';
addLocaleData([...en, ...ro]);

declare const module;

renderApp({
  localeData,
  App,
  reduxParams: {
    reducers,
  },
  hotReloadCallback: renderApp => {
    module.hot.accept('./App', () => {
      renderApp(App);
    });
  },
});
