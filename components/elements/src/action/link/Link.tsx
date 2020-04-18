import React, { Component } from 'react';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import { withUtilProps, A, AnchorProps, ResultComponentProps } from 'zbase';
import { color } from 'z-frontend-theme/utils';
import { css, styled, ColorString } from 'z-frontend-theme';

function colorOrFallback(fallback: ColorString) {
  return (props: any) => color(props.color || fallback)(props);
}

export const linkStyle = css`
  text-decoration: none;
  color: ${colorOrFallback('link.normal')};
  cursor: pointer;

  &:link,
  &:visited {
    color: ${colorOrFallback('link.normal')};
  }

  &:hover,
  &.simulate-hover {
    color: ${colorOrFallback('link.hover')};
  }

  &:active,
  &.simulate-active {
    color: ${colorOrFallback('link.active')};
  }
`;

export const StyledLink = styled(A)<AnchorProps>`
  ${linkStyle};
`;

type ReactRouterFixedProps = Omit<ReactRouterLinkProps, 'color' | 'inputMode'>;

// NOTE-DZH: react-router is expecting function for innerRef
const StyledReactRouterLink = withUtilProps<ReactRouterFixedProps>({
  additionalCss: linkStyle,
})(({ elementRef, ...rest }: any) => <ReactRouterLink /* innerRef={elementRef} */ {...rest} />);

// NOTE: StyledReactRouterLinkProps is mostly a superset of AnchorProps
export type LinkProps = ResultComponentProps<Partial<ReactRouterFixedProps>>;

class Link extends Component<LinkProps> {
  render() {
    if (this.props.to) {
      return <StyledReactRouterLink {...(this.props as ReactRouterFixedProps)} />;
    }

    const rel = `noreferrer noopener ${this.props.rel || ''}`;
    return <StyledLink {...this.props} rel={rel} />;
  }
}

export default Link;
