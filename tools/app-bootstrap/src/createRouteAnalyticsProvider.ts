import { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { getEventLogger } from './event-logger';

declare global {
  interface Window {
    Intercom: any;
  }
}

type Props = RouteComponentProps<{}>;

/**
 * NOTE: there are multiple blogposts suggesting to use createBrowserHistory directly from
 * history/lib/createBrowserHistory`. While this works for the BrowserRouter,
 * it may not work with HashRouter. This approach is a little bit more future proof, will likely work
 * with native and once we integrate with Ember the analytics will be in sync
 * with our react-router regardless of what happens with the URL.
 */
@withRouter
export class AnalyticsProvider extends Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.location !== this.props.location) {
      // TODO: Later we may need the equivalnet timings
      // in React's case it makes more sense to do it somewhere else (apollo or React)
      // since this is not a routing concern
      // getEventLogger().setTransitionInfo(nextProps.location.pathname);
      // getEventLogger().timints.routeTransitionStart = new Date().getTime();
      const currentRoute = nextProps.location.pathname;
      getEventLogger().setTransitionInfo(currentRoute);
      getEventLogger().log('pageview', {
        // It's silly to set it on the previous line, just to use it here
        // let's make it the default
        currentRoute,
        transitionId: getEventLogger().transitionId,
      });
      if (window.Intercom) {
        // TODO: create an intercom provider and move it there.
        window.Intercom('update');
      }
    }
  }
  render() {
    return this.props.children;
  }
}

export default function createAnalyticsProvider() {
  return AnalyticsProvider;
}
