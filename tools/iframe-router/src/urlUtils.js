export const getHash = url => {
  const match = url.match(/#(.*)$/);
  return match ? match[1] : '';
};

export const stripHash = url => url.split('#')[0];

export const getFragment = url => {
  const fragment = getHash(url);
  // Cached regex for stripping a leading hash and trailing space.
  const routeStripper = /^[#]|\s+$/g;
  return fragment.replace(routeStripper, '');
};

export const areFragmentsEquivalent = (f1, f2, defaultFragment) => {
  const defaults = defaultFragment ? ['', '/', defaultFragment] : ['', '/'];
  return f1 === f2 || (defaults.indexOf(f1) > -1 && defaults.indexOf(f2) > -1);
};

export const getUrlPath = url => {
  const parser = document.createElement('a');
  parser.href = url;
  return parser.pathname;
};

export const isUrlPathCurrent = url =>
  `${getUrlPath(url)}#${getFragment(url)}` ===
  `${getUrlPath(window.location.href)}#${getFragment(window.location.hash)}`;
