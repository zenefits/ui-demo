import getCookie from './get-cookie';
import eventLogger from '../event-logger';

export default () => {
  const csrfmiddlewaretoken = getCookie('csrftoken');
  // TODO: follow the redirect instead of hardcoding it to accounts/login (which is where we redirect ATM)
  window
    .fetch('/accounts/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'X-CSRFToken': csrfmiddlewaretoken,
        'Content-Type': 'application/json',
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to logout: ${response.statusText}`);
      }
      window.location.href = '/accounts/login/';
    })
    .catch(e => {
      eventLogger.log(`logout failed: ${e}`);
    });
};
