import React, { Component } from 'react';
import { FlattenInterpolation } from 'styled-components';
import { A, AnchorProps, withUtilProps, ResultComponentProps } from 'zbase';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { color } from 'z-frontend-theme/utils';
import { css, styled, ColorString } from 'z-frontend-theme';

const linkStyle: FlattenInterpolation<AnchorProps>[] = css`
  text-decoration: none;
  color: ${props => color((props.color as ColorString) || 'link.normal')(props)};
  cursor: pointer;
  &:link,
  &:visited {
    color: ${props => color((props.color as ColorString) || 'link.normal')(props)};
  }
  &:hover {
    color: ${props => color((props.color as ColorString) || 'link.hover')(props)};
  }
  &:active {
    color: ${props => color((props.color as ColorString) || 'link.active')(props)};
  }
`;

const StyledLink = styled<AnchorProps>(A)`
  ${linkStyle};
`;

const StyledReactRouterLink = withUtilProps<ReactRouterLinkProps>({ additionalCss: linkStyle })(ReactRouterLink);
type StyledReactRouterLinkProps = ResultComponentProps<ReactRouterLinkProps>;

export type LinkProps = AnchorProps | StyledReactRouterLinkProps;

class Link extends Component<LinkProps> {
  render() {
    if ((this.props as StyledReactRouterLinkProps).to) {
      return <StyledReactRouterLink {...this.props as StyledReactRouterLinkProps} />;
    }

    const rel = `noreferrer noopener ${this.props.rel || ''}`;

    return <StyledLink {...this.props as AnchorProps} rel={rel} />;
  }
}
export default Link;
