import React, { Component } from 'react';
// @ts-ignore
import querystring from 'query-string';

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

type QueryParamsProps = {
  /**
   * the name of the ember route or a url that starts with a '/'
   */
  to: string;
  routeParams?: (string | number)[];
  queryParams?: { [key: string]: string | number };
};

type EmberAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & QueryParamsProps;

type EmberLinkProps = ResultComponentProps<EmberAnchorProps>;

class EmberRouteLink extends Component<EmberLinkProps> {
  render() {
    const { to, routeParams, queryParams: queryParamsProp, ...props } = this.props;
    /**
     * queryParamsProp is for the final route
     * queryParams is for route "redirect-to-route"
     */
    const queryParams: QueryParams = { to };
    if (routeParams) {
      queryParams.routeParams = routeParams;
    }
    if (queryParamsProp) {
      queryParams.queryParams = JSON.stringify(queryParamsProp);
    }
    const href = `/dashboard/#/redirect-to-route?${querystring.stringify(queryParams)}`;
    return <StyledLink {...props} href={href} />;
  }
}
export default EmberRouteLink;
