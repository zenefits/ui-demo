import { buildEmberRouteRedirect, QueryParamsProps } from 'z-frontend-elements';
import { getEventLogger } from 'z-frontend-app-bootstrap';

import { PREREQUISITE_REDIRECT_WHITELIST } from './prerequisiteRedirectWhitelist';

export type PrerequisiteRedirect = {
  id: string;
  status?: string; // OPN or CMP?
  group?: string;
  data?: {
    destination?: string;
    type?: string;
    routeModelId?: number | string;
    params?: any;
  };
  objectType?: string;
};

export function redirectToUrl(url: string) {
  // Only allow 'http://*.zenefits.com' or 'https://*.zenefits.com' domains. Use only for redirects to
  // non-Ember, non-Client-App URLs.
  const isValidUrl = /^https?:\/\/([a-zA-Z\d-]+\.){0,}zenefits\.com\/?.*/.test(url);
  if (!isValidUrl) {
    getEventLogger().logError(new Error(`prerequisite_redirect - invalid url: ${url}`));
    return false;
  }
  window.location.href = url;
  return true;
}

export function redirectToRoute(redirect: PrerequisiteRedirect) {
  const { group, data } = redirect;
  const whiteList = group && PREREQUISITE_REDIRECT_WHITELIST[group];
  const destination = whiteList && whiteList.destination;

  const params: QueryParamsProps = { to: destination };
  if (typeof data.routeModelId !== 'undefined') {
    params.routeParams = [data.routeModelId];
  }
  if (typeof data.params !== 'undefined') {
    params.queryParams = data.params;
  }

  window.location.href = buildEmberRouteRedirect(params);
  return true;
}

export function redirectIfNecessary(redirects: PrerequisiteRedirect[], pathname: string, hash: string): boolean {
  const [redirect] = redirects;
  if (!REDIRECT_GROUP_WHITELIST.some(group => redirect && group === redirect.group)) {
    // Do not redirect if redirect group is not whitelisted
    return false;
  }
  const whitelist = redirect && PREREQUISITE_REDIRECT_WHITELIST[redirect.group];
  const completeUrl = `${pathname}#${hash}`;
  const redirectCondition = completeUrl.match('/dashboard') || completeUrl.match('/app/boot');
  // if current route is not in whitelist, redirect
  if (!redirectCondition && whitelist && !whitelist.allowedRoutes.some((url: string) => completeUrl.match(url))) {
    // Redirect to dashboard to show the modal.
    window.location.href = `/dashboard/#/`;
    return true;
  }
  return false;
}

export const REDIRECT_GROUP_WHITELIST: string[] = [
  'test-group',
  'bundle-expired',
  'delinquent-customer-billing-admins',
  'delinquent-customer-non-billing-admins',
];
