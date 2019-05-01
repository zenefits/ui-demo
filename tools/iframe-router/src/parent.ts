import _ from 'lodash';

import { areFragmentsEquivalent, getFragment, getUrlPath, isUrlPathCurrent } from './urlUtils';
import { Spinner } from './loadingSpinner';
import {
  awaitMessage,
  handleMessages,
  sendMessage,
  MessagePayloads_EXTERNAL_NAVIGATION,
  MessagePayloads_INTER_APP_NAVIGATION,
  MessagePayloads_INTERNAL_NAVIGATION,
  MESSAGE_TYPES,
} from './messages';
import { makeRouteUtils, Route, RouteConfig, RouteUtils } from './routes';

type GetResourceUrlPathFn = (route: RouteConfig) => string;

interface IframeRouterOptions {
  iframeContainerId?: string;
  getResourceUrlPath?: GetResourceUrlPathFn;
  handleNewUrlPath?: (urlPath: string) => Route;
}

export default class IframeRouter {
  private routes: Route[];
  // private iframeContainerId: string;
  private iframeContainer: HTMLElement;
  // private initialFragment: string;
  private spinner: Spinner;
  private routeUtils: RouteUtils;

  constructor(
    routes: RouteConfig[],
    { /*iframeContainerId = 'iframe-container',*/ getResourceUrlPath, handleNewUrlPath }: IframeRouterOptions = {},
  ) {
    const href = window.location.href;

    this.spinner = new Spinner();

    this.initializeRoute = this.initializeRoute.bind(this);
    // this.iframeContainerId = iframeContainerId;

    let initialRoute: Route | null = null;
    this.routes = [];

    if (!_.find(routes, route => route.publicUrlPath === getUrlPath(href))) {
      if (!handleNewUrlPath) {
        throw new Error('No routes matched the current route when the IframeRouter was loaded');
      }
      // If we don't have the current url in our router (eg. if the url has git sha) add a new route
      const newRoute = handleNewUrlPath(getUrlPath(href));
      newRoute.isInitial = true;
      routes.push(newRoute);
    }

    routes.forEach(routeConfig => {
      const { publicUrlPath, resourceUrlPath, defaultFragment } = routeConfig;

      if (!resourceUrlPath && !getResourceUrlPath) {
        throw new Error(
          'Each route passed to IframeRouter must have resourceUrlPath defined \n' +
            'or getResourceUrlPath must be passed as IframeRouter option.',
        );
      }

      const isInitial = routeConfig.isInitial || publicUrlPath === getUrlPath(href);

      const route = {
        publicUrlPath,
        isInitial,
        defaultFragment,
        resourceUrlPath: resourceUrlPath || (getResourceUrlPath as GetResourceUrlPathFn)(routeConfig),
        isActive: isInitial,
        fragment: isInitial ? getFragment(href) : '',
      };
      this.routes.push(route);

      if (isInitial) {
        initialRoute = route;
        initialRoute.iframe = document.getElementById('initial-iframe') as HTMLIFrameElement;
      }
    });

    this.routeUtils = makeRouteUtils(this.routes);

    if (initialRoute) {
      window.history.replaceState(_.omit(initialRoute, ['iframe']), href, href);
      this.initializeRoute(initialRoute);
    }

    window.addEventListener('load', () => {
      const iframeContainerEl = document.getElementById('iframe-container');
      if (iframeContainerEl) {
        this.iframeContainer = iframeContainerEl;
      }
    });
    this.listenForNavigation();
    this.listenForHistoryChange();
  }

  watchUnexpectedLoads = (route: Route) => {
    const iframe = route.iframe;
    if (iframe) {
      iframe.addEventListener('load', () => {
        const loadedUrl = iframe.contentWindow ? iframe.contentWindow.location.href : null;
        if (loadedUrl && !this.routeUtils.findRouteByResourceUrl(loadedUrl)) {
          window.location.replace(loadedUrl);
        }
      });
    }
  };

  establishConnection = async (route: Route) => {
    await awaitMessage(MESSAGE_TYPES.CHILD_LISTENING);
    if (route.iframe && route.iframe.contentWindow) {
      sendMessage(route.iframe.contentWindow, MESSAGE_TYPES.CONNECTION_ESTABLISHED);
      if (route.fragment) {
        sendMessage(route.iframe.contentWindow, MESSAGE_TYPES.INITIALIZE_SUBROUTE, { fragment: route.fragment });
        await awaitMessage(MESSAGE_TYPES.CHILD_INITIALIZATION_COMPLETE);
      }
      this.spinner.hide();
      route.iframe.style.visibility = 'visible';
    }
  };

  initializeRoute(route: Route) {
    this.watchUnexpectedLoads(route);
    this.establishConnection(route);
  }

  createNewIframe = (route: Route) => {
    const iframe = document.createElement('iframe');
    iframe.src = this.routeUtils.getResourceUrl(route);
    route.iframe = iframe;
    this.initializeRoute(route);
    this.iframeContainer.appendChild(iframe);
    return iframe;
  };

  createOrDisplayIframe = (route: Route) => {
    this.routeUtils.clearActiveRoute();
    route.isActive = true;
    const { iframe } = route;
    this.routeUtils.hideRoutes();
    this.spinner.show();
    if (iframe) {
      iframe.style.display = 'block';
      this.spinner.hide();
    } else {
      this.createNewIframe(route);
    }
  };

  handleHistoryChange = (url: string) => {
    // Get route that corresponds to the link we are navigating to
    const route = this.routeUtils.findRouteByPublicUrl(url);
    const fragment = getFragment(url);
    route.fragment = fragment;
    if (!route.isActive) {
      this.createOrDisplayIframe(route);
    } else {
      window.history.replaceState(_.omit(route, ['iframe']), url, url);
      sendMessage(route.iframe.contentWindow, MESSAGE_TYPES.INTERNAL_NAVIGATION, { fragment });
    }
  };

  handleInterAppNavigation = ({ url }: MessagePayloads_INTER_APP_NAVIGATION) => {
    // A navigation outside of the current iframe was initiated
    // For now we aren't going to support navigating directly to a app's subroute
    if (isUrlPathCurrent(url)) {
      return;
    }

    // Get route that corresponds to the link we are navigating to
    const route = this.routeUtils.findRouteByPublicUrl(url);

    if (!route) {
      // We are navigating outside the routes managed by the router.
      window.location.replace(url);
    }

    this.createOrDisplayIframe(route);

    // Include fragment in url if app is already loaded and has a subroute fragment
    const nextUrl = this.routeUtils.getPublicUrl(route);
    window.history.pushState(_.omit(route, ['iframe']), nextUrl, nextUrl);
  };

  handleInternalNavigation = ({ fragment }: MessagePayloads_INTERNAL_NAVIGATION) => {
    // Hash of active iframe changed
    // We need to update the history to match this url
    const route = this.routeUtils.findActiveRoute();
    if (!areFragmentsEquivalent(route.fragment, fragment, route.defaultFragment)) {
      route.fragment = fragment;
      const url = this.routeUtils.getPublicUrl(route);
      window.history.pushState(_.omit(route, ['iframe']), url, url);
    }
  };

  handleExternalNavigation = ({ url }: MessagePayloads_EXTERNAL_NAVIGATION) => {
    window.location.assign(url);
  };

  handleUnexpectedNavigation = () => {
    this.spinner.show();
    this.routeUtils.findActiveRoute().iframe.style.display = 'none';
  };

  listenForNavigation = () => {
    handleMessages([
      {
        type: MESSAGE_TYPES.INTER_APP_NAVIGATION,
        callback: this.handleInterAppNavigation,
      },
      {
        type: MESSAGE_TYPES.INTERNAL_NAVIGATION,
        callback: this.handleInternalNavigation,
      },
      {
        type: MESSAGE_TYPES.EXTERNAL_NAVIGATION,
        callback: this.handleExternalNavigation,
      },
      {
        type: MESSAGE_TYPES.UNEXPECTED_NAVIGATION,
        callback: this.handleUnexpectedNavigation,
      },
    ]);
  };

  listenForHistoryChange = () => {
    window.addEventListener('popstate', e => {
      if (e.state) {
        this.handleHistoryChange(this.routeUtils.getPublicUrl(e.state));
      }
    });
  };
}
