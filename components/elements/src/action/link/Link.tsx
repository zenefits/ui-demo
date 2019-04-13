import React, { Component } from 'react';
import { FlattenInterpolation, StyledComponentClass } from 'styled-components';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';
import { LocationDescriptor } from 'history';

import { withUtilProps, A, AnchorProps, ResultComponentProps } from 'zbase';
import { color } from 'z-frontend-theme/utils';
import { css, styled, ThemeInterface } from 'z-frontend-theme';

const linkStyle: FlattenInterpolation<AnchorProps & { color?: any }>[] = css`
  text-decoration: none;
  color: ${props => color(props.color || 'link.normal')(props)};
  cursor: pointer;
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

export const StyledLink = styled<AnchorProps>(A)`
  ${linkStyle};
`;

// NOTE-DZH: react-router is expecting function for innerRef
const StyledReactRouterLink = withUtilProps<ReactRouterLinkProps>({ additionalCss: linkStyle })(
  ({ elementRef, ...rest }: any) => <ReactRouterLink /* innerRef={elementRef} */ {...rest} />,
);

type StyledReactRouterLinkProps = ResultComponentProps<ReactRouterLinkProps>;

export type LinkProps = AnchorProps | StyledReactRouterLinkProps;

// React-docgen Typescript cannot properly parse union types. will use a `&` instead (LinkProps)
// Therefore need to redeclare the `to` prop to appear as optional
// https://github.com/styleguidist/react-docgen-typescript/issues/68
interface ForDocumentation extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Use this prop to use a react Router link
   * Read more https://knowbody.github.io/react-router-docs/api/Link.html */
  to?: LocationDescriptor;
  replace?: boolean;
}

type StyleGuideDocProps = AnchorProps & ResultComponentProps<ForDocumentation>;

class Link extends Component<LinkProps> {
  render() {
    if ((this.props as StyledReactRouterLinkProps).to) {
      return <StyledReactRouterLink {...this.props as StyledReactRouterLinkProps} />;
    }

    const rel = `noreferrer noopener ${this.props.rel || ''}`;

    return <StyledLink {...this.props as AnchorProps} rel={rel} />;
  }
}

// Workaround to avoid this issue: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/29832
// TO-DO remove type casting when issue is fixed in library
export default Link as StyledComponentClass<StyleGuideDocProps, ThemeInterface>;
