let requestCounter = 0;

export default function getLoggerFetchNative() {
  return function loggerFetchNative(url: RequestInfo, options?: RequestInit): Promise<Response> {
    const logFn = __NATIVE__ ? (global as any).log : console.log.bind(console);

    requestCounter += 1;
    const requestId = requestCounter;
    if (__DEVELOPMENT__) {
      logFn(`---> log request #${requestId}`, options);
    }

    // Don't use fetchWrapper here since it calls logger and could result in an infinite loop
    // tslint:disable-next-line:ban
    let responsePromise = fetch(url, options);

    if (__DEVELOPMENT__) {
      responsePromise = responsePromise.then(r => {
        try {
          const clonedRequest = r.clone();
          clonedRequest.text().then(
            text => {
              logFn(`<--- log request #${requestId}`, text);
            },
            e => {},
          );
        } catch (e) {
          // do nothing
        }

        return r;
      });
    }

    return responsePromise;
  };
}
