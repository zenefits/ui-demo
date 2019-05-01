function unsupportedCheck() {
  if (window.location.href.indexOf('unsupported.html') > -1) {
    // prevent a endless redirect loop
    return;
  }

  if (typeof window.Intl === 'undefined') {
    // window.Intl is undefined checks for IE10 or below
    window.location.replace('./unsupported.html');
  }
}

unsupportedCheck();

// note: global.fetch is undefined in ie 11
