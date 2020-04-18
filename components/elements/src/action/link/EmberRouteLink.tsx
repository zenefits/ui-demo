import React, { Component } from 'react';

import qs from 'qs';

import { ResultComponentProps } from 'zbase';

import { StyledLink } from './Link';

type QueryParams = {
  /**
   * the name of the ember route or a url that starts with a '/'
   */
  to: string;
  routeParams?: (string | number)[];
  queryParams?: string;
};

export type QueryParamsProps = {
  /**
   * the name of the ember route or a url that starts with a '/'
   */
  to: string;
  routeParams?: (string | number)[];
  queryParams?: { [key: string]: string | number };
};

export function buildEmberRouteRedirect(params: QueryParamsProps): string {
  const { to, routeParams, queryParams } = params;

  const routeQueryParams: QueryParams = { to };
  if (routeParams) {
    routeQueryParams.routeParams = routeParams;
  }
  if (queryParams) {
    routeQueryParams.queryParams = JSON.stringify(queryParams);
  }
  return `/dashboard/#/redirect-to-route?${qs.stringify(routeQueryParams, { arrayFormat: 'repeat' })}`;
}

type EmberAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & QueryParamsProps;

export type EmberLinkProps = ResultComponentProps<EmberAnchorProps>;

class EmberRouteLink extends Component<EmberLinkProps> {
  render() {
    const { to, routeParams, queryParams, ...props } = this.props;

    const href = buildEmberRouteRedirect({ to, routeParams, queryParams });
    return <StyledLink {...props} href={href} />;
  }
}
export default EmberRouteLink;
