/**
 * A function adapter that looks like $.ajas(config) but relies internally on fetch
 * This is mostly used for backwards compatibility with jquery/Ember code and should be avoided
 * for new code and instead use `fetch` directly.
 */
export default config => {
  const url = config.url;
  const headers = new Headers([['Content-Type', 'application/json']]);
  const options = {
    headers,
    method: config.type || 'GET',
    credentials: 'same-origin' as RequestCredentials,
    body: config.data,
  };
  if (__MOCK_MODE__) {
    return console.log('Mock request intercepted', url, options);
  }
  let responsePromise = fetch(url, options);
  if (config.success || config.error) {
    responsePromise = responsePromise.then(data => {
      if (data.ok && config.success) {
        return data.text().then(text => config.success(text));
      }
      if (config.error) {
        // jQuery handlers HTTP errors as Promise errors, so we call their callback here
        config.error(data);
      }
    });
  }
  if (config.error) {
    responsePromise = responsePromise.catch(config.error);
  }
  return responsePromise;
};
