import getCookie from './get-cookie';

export default function getDefaultHeaders() {
  const headers: { [key: string]: string } = {};
  if (window && window.document) {
    const ajaxToken = (new RegExp(`(?:^|; )${encodeURIComponent('ajaxtoken')}=([^;]*)`).exec(
      window.document.cookie,
    ) || [null, null])[1];

    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }

    headers['X-PAGEUrl'] = window.location.href;

    if (ajaxToken) {
      headers['X-AJAXToken'] = ajaxToken;
    }

    headers['zenefits-appname'] = __APP_NAME__;
  }
  return headers;
}
