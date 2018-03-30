import { Component } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
// import eventLogger from './event-logger';

/**
 * NOTE: there are multiple blogposts suggesting to use createBrowserHistory directly from
 * history/lib/createBrowserHistory`. While this works for the BrowserRouter,
 * it may not work with HashRouter. This approach is a little bit more future proof, will likely work
 * with native and once we integrate with Ember the analytics will be in sync
 * with our react-router regardless of what happens with the URL.
 */
@withRouter
export class AnalyticsProvider extends Component<RouteComponentProps<{}>> {
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      // TODO: Later we may need the equivalnet timings
      // in React's case it makes more sense to do it somewhere else (apollo or React)
      // since this is not a routing concern
      // eventLogger.setTransitionInfo(nextProps.location.pathname);
      // eventLogger.timints.routeTransitionStart = new Date().getTime();
      // const currentRoute = nextProps.location.pathname;
      // eventLogger.setTransitionInfo(currentRoute);
      // eventLogger.log('pageview', {
      //   // It's silly to set it on the previous line, just to use it here
      //   // let's make it the default
      //   currentRoute,
      //   transitionId: eventLogger.transitionId,
      // });
    }
  }
  render() {
    return this.props.children;
  }
}

export default function createAnalyticsProvider() {
  return AnalyticsProvider;
}
