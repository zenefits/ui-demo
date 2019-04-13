import { getEventLogger } from './event-logger';

declare const tempVar: GlobalFetch;
type Fetch = typeof tempVar.fetch;

const fetchWrapper = ((input: Request | string, init?: RequestInit) => {
  // tslint:disable-next-line:ban
  return window.fetch(input, init).then(response => {
    try {
      if (!response.ok) {
        const fetchInitConfig = {
          ...(init || {}),
          url: response.url,
        };

        // filter out custom request headers
        if (fetchInitConfig.headers) {
          fetchInitConfig.headers = '[filtered]' as any;
        }

        // matching the shape that logXhrError expects (like in our ember apps)
        getEventLogger().logXhrError({
          getAllResponseHeaders: () => '[filtered]', // don't send response headers
          status: response.status,
          statusText: response.statusText,
          responseText: '[filtered]', // don't send response text, since it's already being filtered out
          _settings: fetchInitConfig,
        });
      }
    } catch (error) {
      // in case the error logging itself throws an exception
    }

    return response;
  });
}) as Fetch;

export default fetchWrapper;
