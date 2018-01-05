import React, { Component, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { FlattenInterpolation } from 'styled-components';
import { hoc, Text } from 'rebass';
import { RebassOnlyProps } from 'z-rebass-types';
import { Link, LinkProps } from 'react-router-dom';
import { css, styled } from 'z-frontend-theme';
import Icon, { IconProps } from 'z-frontend-theme/src/Icon';
import { color, radius, heights, fontSizes, buttonSpace } from 'z-frontend-theme/src/utils';

interface SharedButtonProps {
  mode?: 'normal' | 'primary' | 'transparent';
  s?: 'small' | 'medium' | 'large' | 'xsmall';
}

export interface ButtonProps extends SharedButtonProps {
  inProgress?: boolean;
}

interface ModeSpec {
  bg: string;
  color: string;
  focusBg: string;
  hoverBg: string;
  activeBg: string;
  focusColor: string;
  activeColor: string;
  hoverColor: string;
}

const modeSpecsMap = {
  normal: {
    bg: 'button.defaultNormal',
    color: 'grayscale.c',
    focusBg: 'button.defaultHover',
    hoverBg: 'button.defaultHover',
    activeBg: 'button.defaultActive',
    focusColor: 'grayscale.c',
    activeColor: 'grayscale.c',
    hoverColor: 'grayscale.c',
    fontSizeMap: {
      xsmall: 0,
      small: 0,
      medium: 1,
      large: 2,
    },
    lineHeightMap: {
      xsmall: 1.67,
      small: 1.67,
      medium: 1.43,
      large: 1.5,
    },
    paddingSpaceMap: {
      px: {
        xsmall: 3,
        small: 5,
        medium: 7,
        large: 7,
      },
      py: {
        xsmall: 1,
        small: 2,
        medium: 4,
        large: 5,
      },
    },
    // disabledBg: '',
  } as ModeSpec,
  primary: {
    bg: 'button.primaryNormal',
    color: 'grayscale.g',
    focusBg: 'button.primaryHover',
    hoverBg: 'button.primaryHover',
    activeBg: 'button.primaryActive',
    focusColor: 'grayscale.g',
    activeColor: 'grayscale.g',
    hoverColor: 'grayscale.g',
    fontSizeMap: {
      xsmall: 0,
      small: 0,
      medium: 1,
      large: 2,
    },
    lineHeightMap: {
      xsmall: 1.67,
      small: 1.67,
      medium: 1.43,
      large: 1.5,
    },
    paddingSpaceMap: {
      px: {
        xsmall: 3,
        small: 5,
        medium: 7,
        large: 7,
      },
      py: {
        xsmall: 1,
        small: 2,
        medium: 4,
        large: 5,
      },
    },
    // disabledBg: 'button.primaryNormal',
  } as ModeSpec,
  transparent: {
    bg: 'transparent',
    color: 'grayscale.e',
    focusBg: 'tertiary.c',
    hoverBg: 'tertiary.c',
    activeBg: 'tertiary.b',
    focusColor: 'link.normal',
    activeColor: 'link.hover',
    hoverColor: 'link.normal',
    fontSizeMap: {
      xsmall: 0,
      small: 1,
      medium: 2,
      large: 3,
    },
    lineHeightMap: {
      xsmall: 1.33,
      small: 1.14,
      medium: 1.5,
      large: 1.26,
    },
    paddingSpaceMap: {
      px: {
        xsmall: 1,
        small: 3,
        medium: 3,
        large: 5,
      },
      py: {
        xsmall: 1,
        small: 3,
        medium: 3,
        large: 5,
      },
    },
    // disabledBg: 'transparent',
  } as ModeSpec,
};

const buttonStyle: FlattenInterpolation<{ mode: string }>[] = css`
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  border: none;
  user-select: none;
  text-decoration: none;
  border-radius: ${radius};
  outline: 0;
  line-height: ${props => modeSpecsMap[props.mode].lineHeightMap[props.s]};
  text-align: center;
  height: ${props => heights(props.s)};
  min-width: ${props => heights(props.s)};
  font-size: ${props => fontSizes(modeSpecsMap[props.mode].fontSizeMap[props.s])};
  padding: ${props => buttonSpace(modeSpecsMap[props.mode].paddingSpaceMap.py[props.s])}
    ${props => buttonSpace(modeSpecsMap[props.mode].paddingSpaceMap.px[props.s])};
  &:disabled {
    cursor: not-allowed;
    opacity: ${props => props.theme.opacities[0]};
  }
  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    color: ${props => color(modeSpecsMap[props.mode].focusColor)(props)};
    background-color: ${props => color(modeSpecsMap[props.mode].focusBg)(props)};
  }
  &:active:not(:disabled) {
    color: ${props => color(modeSpecsMap[props.mode].activeColor)(props)};
    background-color: ${props => color(modeSpecsMap[props.mode].activeBg)(props)};
  }
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 2px ${color('secondary.a', 0.1)};
  }
`;

interface StyledChildrenProps {
  hide?: boolean;
}

const StyledChildren = styled<StyledChildrenProps>(Text)`
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`;

const StyledIcon = styled<IconProps & StyledChildrenProps>(Icon)`
  position: absolute;
  top: -2px;
  left: 0;

  display: inline-block;

  margin-left: calc(50% - 12px);
  padding-top: inherit;

  pointer-events: none;
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`;

const StyledButton = hoc(buttonStyle, {})('button');
const StyledLink = hoc(buttonStyle, {})('a');
const StyledRouteLink = hoc(buttonStyle, {})(Link);

export declare type ButtonBasicProps = RebassOnlyProps & ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps;

// TODO: replace ellipsis by a ProgressIndicator
class ButtonBasic extends Component<ButtonBasicProps> {
  static defaultProps: ButtonBasicProps = {
    mode: 'normal',
    inProgress: false,
    disabled: false,
    s: 'medium',
    type: 'button',
  };

  render() {
    const { disabled, inProgress, mode, s: size, children, ...rest } = this.props;
    const modeSpecs = modeSpecsMap[mode];
    return (
      <StyledButton
        bg={modeSpecs.bg}
        color={modeSpecs.color}
        {...rest}
        disabled={disabled || inProgress}
        mode={mode}
        s={size}
      >
        <StyledChildren hide={inProgress}>{children}</StyledChildren>
        <StyledIcon fontSize={24} iconName="spinner" spin hide={!inProgress} />
      </StyledButton>
    );
  }
}

export declare type ButtonRouteLinkProps = RebassOnlyProps & SharedButtonProps & LinkProps;

class ButtonRouteLink extends Component<ButtonRouteLinkProps> {
  static defaultProps: ButtonBasicProps = {
    mode: 'normal',
    s: 'medium',
  };

  render() {
    const { mode, children, s: size } = this.props;
    const modeSpecs = modeSpecsMap[mode];
    return (
      <StyledRouteLink bg={modeSpecs.bg} color={modeSpecs.color} {...this.props} mode={mode} s={size}>
        {children}
      </StyledRouteLink>
    );
  }
}

export declare type ButtonLinkProps = RebassOnlyProps & AnchorHTMLAttributes<HTMLAnchorElement> & SharedButtonProps;

class ButtonLink extends Component<ButtonLinkProps> {
  static defaultProps: ButtonBasicProps = {
    mode: 'normal',
    s: 'medium',
  };

  render() {
    const { mode, children, s: size } = this.props;
    const modeSpecs = modeSpecsMap[mode];
    return (
      <StyledLink bg={modeSpecs.bg} color={modeSpecs.color} {...this.props} mode={mode} s={size}>
        {children}
      </StyledLink>
    );
  }
}

declare type Button = typeof ButtonBasic & {
  RouteLink: typeof ButtonRouteLink;
  Link: typeof ButtonLink;
};

const Button = ButtonBasic as Button;
Button.RouteLink = ButtonRouteLink;
Button.Link = ButtonLink;

export default Button;
