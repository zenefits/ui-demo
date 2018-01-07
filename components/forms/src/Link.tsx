import React, { Component, AnchorHTMLAttributes } from 'react';
import { FlattenInterpolation } from 'styled-components';
import { hoc } from 'rebass';
import { RebassOnlyProps } from 'z-rebass-types';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { color } from 'z-frontend-theme/src/utils';
import { css, ColorString } from 'z-frontend-theme';

const linkHocProps = {};

interface CssProps {
  color: ColorString;
}

const linkStyle: FlattenInterpolation<CssProps>[] = css`
  text-decoration: none;
  &:link,
  &:visited {
    color: ${props => color(props.color || 'link.normal')(props)};
  }
  &:hover {
    color: ${props => color(props.color || 'link.hover')(props)};
  }
  &:active {
    color: ${props => color(props.color || 'link.active')(props)};
  }
`;

const StyledLink = hoc(linkStyle, linkHocProps)('a');
const StyledReactRouterLink = hoc(linkStyle, linkHocProps)(ReactRouterLink);

export declare type LinkProps = RebassOnlyProps & (AnchorHTMLAttributes<HTMLLinkElement> | ReactRouterLinkProps);

class Link extends Component<LinkProps> {
  render() {
    if ((this.props as ReactRouterLinkProps).to) {
      return <StyledReactRouterLink {...this.props} />;
    }

    const rel = `noreferrer noopener ${this.props.rel || ''}`;

    return <StyledLink {...this.props} rel={rel} />;
  }
}
export default Link;
