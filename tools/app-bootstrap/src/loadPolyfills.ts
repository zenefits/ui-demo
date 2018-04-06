// This file is being replaced for jest using a custom transformer (polyfillLoaderTransformer.js)
// if you change this file, make sure the replacement in the transformer makes sense for jest.

export default function loadPolyfills() {
  return import(/* webpackChunkName: "ie-polyfill" */ './polyfills/ie-polyfill');
}
