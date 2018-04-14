// dummy implementation
class EventLogger {
  constructor(appInfo, env) {}
  public transitionId: string;
  log(a, b?, c?) {}
  logError(a, b?, c?) {}
  logXhr(a, b?, c?) {}
  setTransitionInfo(a, b?, c?) {}
}

export const getAppInfo = () => {
  const versionMetaElement = document.getElementById('appInfo/version');
  let appVersion;
  if (versionMetaElement) {
    appVersion = versionMetaElement.getAttribute('content');
  }
  return {
    // NOTE: we get the appVersion from meta to avoid invalidating the cache
    appVersion,
    appName: __APP_NAME__,
  };
};

export default new EventLogger(getAppInfo(), process.env.NODE_ENV);
