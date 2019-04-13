import React, { Component, ReactElement } from 'react';
import { withRouter, HashRouter, MemoryRouter, RouteComponentProps } from 'react-router-dom';

import { createRouterConnection, isWithinIframe } from 'z-iframe-router';

class RouterMiddlewareBase extends Component<RouteComponentProps<{}>> {
  async componentDidMount() {
    const { history } = this.props;
    if (isWithinIframe) {
      createRouterConnection({
        setUpRouteListener: (pushRouteToParent: Function) => {
          history.listen(location => {
            pushRouteToParent(location.pathname);
          });
        },
        handleRouteChange: (fragment: string) => {
          history.push(fragment);
        },
      });
    }
  }

  render() {
    return this.props.children;
  }
}

const RouterMiddleware = withRouter<{}>(RouterMiddlewareBase);

const isWithinCypress = !!(global as any).Cypress;
const needsInMemoryRouter = isWithinIframe && !isWithinCypress;

export default function createRouterProvider(basename?: string) {
  return ({ children }: { children: ReactElement<any> }) => {
    if (needsInMemoryRouter) {
      return (
        <MemoryRouter>
          <RouterMiddleware>{children}</RouterMiddleware>
        </MemoryRouter>
      );
    } else {
      return (
        <HashRouter basename={basename}>
          <RouterMiddleware>{children}</RouterMiddleware>
        </HashRouter>
      );
    }
  };
}
