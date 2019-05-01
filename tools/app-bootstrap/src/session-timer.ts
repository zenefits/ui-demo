import throttle from 'lodash/throttle';
// @ts-ignore
import { cookie, SessionTimer } from 'zen-js';

import fetchWrapper from './fetchWrapper';
import getAjaxAdapter from './utils/get-ajax-adapter';

const ajaxAdapter = getAjaxAdapter(fetchWrapper);

function mockAjaxTokenCookie() {
  if (!cookie.get('ajaxtoken')) {
    cookie.set('ajaxtoken', 'dummy');
  }
}

if (__MOCK_MODE__) {
  mockAjaxTokenCookie();
}

export default new SessionTimer({ throttle, ajaxFn: ajaxAdapter });
