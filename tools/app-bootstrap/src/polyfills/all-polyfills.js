export default {
  events: require('events-polyfill/src/constructors/KeyboardEvent'), // eslint-disable-line global-require
  whatwgFetch: require('whatwg-fetch'), // eslint-disable-line global-require
  url: require('url-polyfill'), // eslint-disable-line global-require
  urlSearchParams: require('url-search-params-polyfill'), // eslint-disable-line global-require
};
