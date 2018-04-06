function unsupportedCheck() {
  if (window.location.href.includes('unsupported.html')) {
    // prevent a endless redirect loop
    return;
  }

  if (typeof window.Intl === 'undefined') {
    // window.Intl is undefined checks for IE10 or below
    return window.location.replace('./unsupported.html');
  }
}
module.exports = unsupportedCheck();

// note: global.fetch is undefined in ie 11
