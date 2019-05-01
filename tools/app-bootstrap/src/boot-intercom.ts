import fetchWrapper from './fetchWrapper';

declare global {
  interface Window {
    intercomSettings: any;
    Intercom: any;
  }
}

const IntercomAppIds = {
  'secure.zenefits.com': 'jbh8sdyn',
  'console.zenefits.com': 'jbh8sdyn',
  default: 'a518e5x9',
  // Omitting all the following ones since default shoudl catch it
  // 'demo.zenefits.com': 'a518e5x9',
  // localhost: 'a518e5x9',
  // 'yp3.docker': 'a518e5x9',
  // 'beta.zenefits.com': 'a518e5x9',
};
interface BootIntercomArgs {
  userIntercomHash: string;
  employeeId: string;
  intercomAppIds?: { [key: string]: string };
}
interface SyncResponse {
  isEnabled: boolean;
  isDataSynced: boolean;
}

export default async ({ userIntercomHash, employeeId, intercomAppIds = {} }: BootIntercomArgs) => {
  if (__DEVELOPMENT__ || window.__WITHIN_EMBER_APP__) {
    return;
  }

  const mergedIntercomAppIds: any = { ...IntercomAppIds, ...intercomAppIds };
  const syncResponse = await fetchWrapper(`/custom_api/syncIntercomData/${employeeId}/`, { credentials: 'include' });
  const syncResponseJson = (await syncResponse.json()) as SyncResponse;

  if (!syncResponseJson.isEnabled || !syncResponseJson.isDataSynced) {
    return;
  }

  window.intercomSettings = {
    app_id: mergedIntercomAppIds[window.location.hostname] || mergedIntercomAppIds['default'],
    user_hash: userIntercomHash,
    user_id: employeeId, // TODO: get them from dashboard
  };

  // Extracted from intercom
  /* tslint:disable */
  /* prettier-disable */
  (function() {
    var w = window as any;
    var ic = w.Intercom;
    if (typeof ic === 'function') {
      ic('reattach_activator');
      ic('update', window.intercomSettings);
    } else {
      var d = document;
      var i = function() {
        // @ts-ignore
        i.c(arguments);
      };
      // @ts-ignore
      i.q = [];
      // @ts-ignore
      i.c = function(args) {
        // @ts-ignore
        i.q.push(args);
      };
      w.Intercom = i;

      var s = d.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.intercom.io/widget/APP_ID';
      var x = d.getElementsByTagName('script')[0];
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    }
  })();
  /* prettier-enable */
  /* tslint:enable */
};
