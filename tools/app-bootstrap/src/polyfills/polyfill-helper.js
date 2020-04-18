/* eslint-disable */

import loadAllPolyfills from '../loadAllPolyfills';

function allFunctionsSupported() {
  // These feature checkers are taken from the individual polyfills
  try {
    // testing for keyboard event
    new window.KeyboardEvent('event', { bubbles: true, cancelable: true });

    // testing for url-params
    var u = new global.URL('b', 'http://a');
    u.pathname = 'c%20d';
    if (!(u.href === 'http://a/c%20d' && u.searchParams)) {
      return false;
    }
  } catch (e) {
    return false;
  }

  // testing for url-search-params
  var nativeURLSearchParams = self.URLSearchParams && self.URLSearchParams.prototype.get ? self.URLSearchParams : null,
    isSupportObjectConstructor = nativeURLSearchParams && new nativeURLSearchParams({ a: 1 }).toString() === 'a=1',
    // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
    decodesPlusesCorrectly = nativeURLSearchParams && new nativeURLSearchParams('s=%2B').get('s') === '+',
    // Fix bug in Edge which cannot encode ' &' correctly
    encodesAmpersandsCorrectly = nativeURLSearchParams
      ? (function() {
          var ampersandTest = new nativeURLSearchParams();
          ampersandTest.append('s', ' &');
          return ampersandTest.toString() === 's=+%26';
        })()
      : true;

  return (
    window.fetch && // testing for fetch
    nativeURLSearchParams &&
    isSupportObjectConstructor &&
    decodesPlusesCorrectly &&
    encodesAmpersandsCorrectly
  );
}

export default async function loadPolyfillsIfNeeded() {
  if (!allFunctionsSupported()) {
    await loadAllPolyfills();
  }
}
