import gql from 'graphql-tag';

import { getApollo } from './getApollo';

declare global {
  interface Window {
    drift: any;
  }
}

const demoCenterDashboardQuery = gql`
  query demoCenterQuery {
    dashboard(id: "me") {
      id
      canSeeDemoCenter
    }
  }
`;

interface Dashboard {
  canSeeDemoCenter: boolean;
}

interface QueryResult {
  dashboard: Dashboard;
}

async function demoCenterQuery() {
  try {
    const result = await getApollo().query<QueryResult>({
      query: demoCenterDashboardQuery,
    });
    const dashboard = result.data && result.data.dashboard;
    return dashboard && dashboard.canSeeDemoCenter;
  } catch (err) {
    return false;
  }
}

export default async () => {
  if (__DEVELOPMENT__) {
    return;
  }
  const canSeeDrift = await demoCenterQuery();
  if (!canSeeDrift) {
    return;
  }
  /* tslint:disable */
  /* eslint-disable */
  /* prettier-disable */
  !(function() {
    let t = null as any;
    const w = window as any;
    if (((t = w.driftt = w.drift = w.driftt || []), !t.init)) {
      return t.invoked
        ? void (window.console && console.error && console.error('Drift snippet included twice.'))
        : ((t.invoked = !0),
          (t.methods = ['identify', 'config', 'track', 'reset', 'debug', 'show', 'ping', 'page', 'hide', 'off', 'on']),
          (t.factory = function(e: any) {
            return function() {
              let n;
              return (n = Array.prototype.slice.call(arguments)), n.unshift(e), t.push(n), t;
            };
          }),
          t.methods.forEach((e: any) => {
            t[e] = t.factory(e);
          }),
          (t.load = function(t: any) {
            let e;
            let n;
            let o;
            let i;
            (e = 3e5),
              (i = Math.ceil((new Date() as any) / e) * e),
              (o = document.createElement('script')),
              (o.type = 'text/javascript'),
              (o.async = !0),
              (o.crossOrigin = 'anonymous'),
              (o.src = 'https://js.driftt.com/include/' + i + '/' + t + '.js'),
              (n = document.getElementsByTagName('script')[0]),
              // @ts-ignore
              n.parentNode.insertBefore(o, n);
          }));
    }
  })();
  window.drift.SNIPPET_VERSION = '0.3.1';
  window.drift.load('x5r4d3wi3iip');
  /* prettier-enable */
  /* eslint-enable */
  /* tslint:enable */
};
