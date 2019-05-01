import fetchWrapper from '../fetchWrapper';
import getCookie from './get-cookie';
import { getEventLogger } from '../event-logger';

/**
 * If logout is successful, user will be redirected to the redirectToPath.
 */
export default (redirectToPath: string = '/accounts/login/') => {
  const headers: { [key: string]: string } = {
    'Content-Type': 'application/json',
  };

  const csrfMiddlewareToken = getCookie('csrftoken');
  if (csrfMiddlewareToken) {
    headers['X-CSRFToken'] = csrfMiddlewareToken;
  }

  // TODO: follow the redirect instead of hardcoding it to accounts/login (which is where we redirect ATM)
  fetchWrapper('/accounts/logout/', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers(headers),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to logout: ${response.statusText}`);
      }
      window.location.href = redirectToPath;
    })
    .catch(e => {
      getEventLogger().log(`logout failed: ${e}`);
    });
};
