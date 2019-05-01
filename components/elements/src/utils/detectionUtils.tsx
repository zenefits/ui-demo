export function hasAdobeReader() {
  let acrobat;
  const ActiveXObject = (window as any).ActiveXObject;
  let hasReader = false;
  if (!hasReader) {
    try {
      acrobat = new ActiveXObject('AcroPDF.PDF.1');
      if (acrobat) {
        hasReader = true;
      }
    } catch (e) {
      // intentionally left empty to swallow the exception
    }
    if (!hasReader && navigator.plugins && navigator.plugins.length > 0) {
      for (let i = 0; i < navigator.plugins.length; i += 1) {
        if (navigator.plugins[i].name.indexOf('Adobe Acrobat') > -1) {
          hasReader = true;
          break;
        }
      }
    }
  }
  return hasReader;
}

export function getBrowserName() {
  const userAgent = navigator ? navigator.userAgent.toLowerCase() : 'other';
  if (userAgent.indexOf('chrome') > -1) {
    if (userAgent.indexOf('edge') > -1) {
      return 'edge';
    }
    return 'chrome';
  } else if (userAgent.indexOf('safari') > -1) {
    return 'safari';
  } else if (userAgent.indexOf('msie') > -1 || navigator.appVersion.indexOf('Trident/') > 0) {
    return 'ie';
  } else if (userAgent.indexOf('firefox') > -1) {
    return 'firefox';
  } else {
    return userAgent;
  }
}

export function isBrowserIe() {
  return getBrowserName() === 'ie';
}
