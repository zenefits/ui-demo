import { getAppInfo } from './event-logger';
describe('getAppInfo', () => {
  it('should get the appVersion from the meta tag appInfo/version', () => {
    // Set up our document body
    document.body.innerHTML = `<meta name="appInfo/version" id="appInfo/version" content="42">`;
    expect(getAppInfo().appVersion).toEqual('42');
  });
  it('should get appName from the global build time variable APP_NAME', () => {
    expect(getAppInfo().appName).toEqual(__APP_NAME__);
  });
});
