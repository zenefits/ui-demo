// @ts-ignore
import { uiEventLogger } from 'zen-js';

import 'z-frontend-global-types';

import getAjaxAdapter from './utils/get-ajax-adapter';
import getLoggerFetchNative from './getLoggerFetchNative';

const ajaxAdapter = getAjaxAdapter(__NATIVE__ ? getLoggerFetchNative() : undefined);

const EventLogger = uiEventLogger.EventLogger;

export const getAppInfo = () => {
  let appVersion;
  if (__NATIVE__) {
    appVersion = __APP_VERSION__;
  } else if (window && window.document) {
    const versionMetaElement = window.document.getElementById('appInfo/version');
    if (versionMetaElement) {
      appVersion = versionMetaElement.getAttribute('content');
    }
  }

  return {
    // NOTE: we get the appVersion from meta to avoid invalidating the cache
    appVersion,
    appName: __APP_NAME__,
  };
};

type EventLogger = {
  log: (eventName: string, data?: any) => void;
  logXhrError: (error: any) => void;
  logError: (error: any) => void;
  setTransitionInfo: (route: string) => void;
  transitionId: string;
  setCurrentUserData: (params: { [key: string]: any }) => void;
};

let eventLogger: EventLogger;

export const getEventLogger = () => eventLogger;

export const createEventLogger = (clientMeta: any) => {
  eventLogger = new EventLogger(getAppInfo(), __DEVELOPMENT__ ? 'development' : 'production', ajaxAdapter, clientMeta);
  return eventLogger;
};

// creating event logger here for event we log before calling setCurrentUserData
// eventLogger will be re-created during app init to set sessionId
eventLogger = createEventLogger({});
