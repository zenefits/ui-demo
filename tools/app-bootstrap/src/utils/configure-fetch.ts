import _ from 'lodash';
import getCookie from './get-cookie';

const defaultOptions = {
  headers: new Headers({
    Accept: 'application/json',
  }),
  credentials: 'include',
};

if (window && window.document) {
  defaultOptions.headers.append('X-CSRFToken', getCookie('csrftoken'));
}

export default (configureOptions = defaultOptions) => (uri, options) => {
  const mergedHeaders = new Headers();
  const setHeader = (val, key) => mergedHeaders.append(key, val);
  const [configuredOptionsWithoutHeaders, optionsWithoutHeaders] = [configureOptions, options].map(opts => {
    const headers = opts.headers;
    if (headers instanceof Headers) {
      headers.forEach(setHeader);
    } else if (headers) {
      _.forEach(headers, setHeader);
    }
    return _.omit(opts, 'headers');
  });

  return fetch(uri, _.merge({ headers: mergedHeaders }, configuredOptionsWithoutHeaders, optionsWithoutHeaders));
};
