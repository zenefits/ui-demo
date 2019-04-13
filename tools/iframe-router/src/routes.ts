import _ from 'lodash';

import { getUrlPath } from './urlUtils';

// Options for Route passed in during configuration
export interface RouteConfig {
  // URL for app visible to users and other apps.
  // Navigating to this URL from within router will creahhhhhhhhhhhhhhhhte or display iframe
  // with html at resourceUrlPath loaded
  publicUrlPath: string;
  // When handling back navigation, fragments '', '/', and defaultFragment will be treated as equivalent
  defaultFragment?: string;
  resourceUrlPath: string; // Where html for app lives;
  isInitial?: boolean; // True if loaded with page
}

// Properties that are modified after route creation
export interface Route extends RouteConfig {
  fragment: string; // The current app subpath (part after hash in url)
  isActive: boolean; // True if app is displayed by router
  iframe?: HTMLIFrameElement; // Iframe dom element if app has been loaded, otherwise undefined
}

export const findRouteByPublicUrl = <R extends RouteConfig>(routes: R[], url: string) =>
  _.find(routes, route => getUrlPath(url) === route.publicUrlPath);

export const findRouteByResourceUrl = <R extends RouteConfig>(routes: R[], url: string) =>
  _.find(routes, route => getUrlPath(url) === route.resourceUrlPath);

export const findActiveRoute = (routes: Route[]) => _.find(routes, route => route.isActive);
export const findInitialRoute = (routes: Route[]) => _.find(routes, route => route.isInitial);
export const clearActiveRoute = (routes: Route[]) => routes.forEach(route => (route.isActive = false));

export function getPublicUrl(route: Route) {
  const { publicUrlPath, fragment } = route;
  return fragment ? `${publicUrlPath}#${fragment}` : publicUrlPath;
}

export function getResourceUrl(route: Route): string {
  const { resourceUrlPath, fragment } = route;
  return fragment ? `${resourceUrlPath}#${fragment}` : resourceUrlPath;
}

export function hideRoutes(routes: Route[]) {
  routes.forEach(route => {
    if (route.iframe) {
      route.iframe.style.display = 'none';
    }
  });
}

export interface RouteUtils {
  getPublicUrl: (route: Route) => string;
  getResourceUrl: (route: Route) => string;
  findRouteByPublicUrl: (url: string) => any;
  findRouteByResourceUrl: (url: string) => any;
  findActiveRoute: () => any;
  findInitialRoute: () => any;
  clearActiveRoute: () => any;
  hideRoutes: () => any;
}

export function makeRouteUtils(routes: Route[]): RouteUtils {
  return {
    getPublicUrl,
    getResourceUrl,
    findRouteByPublicUrl: (url: string) => findRouteByPublicUrl.call(this, routes, url),
    findRouteByResourceUrl: (url: string) => findRouteByResourceUrl.call(this, routes, url),
    findActiveRoute: () => findActiveRoute.call(this, routes),
    findInitialRoute: () => findInitialRoute.call(this, routes),
    clearActiveRoute: () => clearActiveRoute.call(this, routes),
    hideRoutes: () => hideRoutes.call(this, routes),
  };
}
