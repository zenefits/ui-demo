import React, { Component } from 'react';
import { FlattenInterpolation } from 'styled-components';
import {
  Box,
  BoxProps,
  Button as ZbaseButton,
  ButtonProps as ZbaseButtonProps,
  A,
  AnchorProps,
  withUtilProps,
  ResultComponentProps,
} from 'zbase';
import { Link, LinkProps } from 'react-router-dom';
import { css, styled, ColorString } from 'z-frontend-theme';
import { color, radius, heights, fontSizes, buttonSpace } from 'z-frontend-theme/utils';
import { LoadingSpinner, LoadingSpinnerProps } from 'z-frontend-layout';

type size = 'xsmall' | 'small' | 'medium' | 'large';

interface SharedButtonProps {
  /** the style of the button */
  mode?: 'normal' | 'primary' | 'transparent';
  /** the size of the button */
  s?: size;
}

export interface ButtonProps extends SharedButtonProps {
  /** temporarily disable the button while an operation is underway */
  inProgress?: boolean;
}

interface ModeSpec {
  bg: ColorString;
  color: ColorString;
  focusBg: Function;
  activeBg: Function;
  focusColor: Function;
  activeColor: Function;
}

const defaultFontSizeMap = {
  xsmall: 0,
  small: 0,
  medium: 1,
  large: 2,
};

const defaultLineHeightMap = {
  xsmall: 1.67,
  small: 1.67,
  medium: 1.43,
  large: 1.5,
};

const defaultPaddingSpaceMap = {
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
};

const modeSpecsMap = {
  normal: {
    bg: 'button.defaultNormal',
    color: 'grayscale.c',
    focusBg: color('button.defaultHover'),
    activeBg: color('button.defaultActive'),
    focusColor: color('grayscale.c'),
    activeColor: color('grayscale.c'),
    fontSizeMap: defaultFontSizeMap,
    lineHeightMap: defaultLineHeightMap,
    paddingSpaceMap: defaultPaddingSpaceMap,
    // disabledBg: '',
  } as ModeSpec,
  primary: {
    bg: 'button.primaryNormal',
    color: 'grayscale.g',
    focusBg: color('button.primaryHover'),
    activeBg: color('button.primaryActive'),
    focusColor: color('grayscale.g'),
    activeColor: color('grayscale.g'),
    fontSizeMap: defaultFontSizeMap,
    lineHeightMap: defaultLineHeightMap,
    paddingSpaceMap: defaultPaddingSpaceMap,
    // disabledBg: 'button.primaryNormal',
  } as ModeSpec,
  transparent: {
    bg: 'transparent',
    color: 'grayscale.d',
    focusBg: color('transparent'),
    activeBg: color('secondary.a', 0.1),
    focusColor: color('link.hover'),
    activeColor: color('link.active'),
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
  display: inline-block;
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
    color: ${props => modeSpecsMap[props.mode].focusColor};
    background-color: ${props => modeSpecsMap[props.mode].focusBg};
  }
  &:active:not(:disabled) {
    color: ${props => modeSpecsMap[props.mode].activeColor};
    background-color: ${props => modeSpecsMap[props.mode].activeBg};
  }
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 2px ${color('secondary.a', 0.1)};
  }
`;

interface StyledChildrenProps {
  hide?: boolean;
}

const StyledChildren = styled<StyledChildrenProps & BoxProps>(({ hide, ...rest }) => <Box {...rest} />)`
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`;

const inProgressContainerPadding = {
  xsmall: '5px',
};

const InProgressContainer = styled<LoadingSpinnerProps>(Box)`
  line-height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  padding: ${props => inProgressContainerPadding[props.s] || '7px'};
  height: ${props => heights(props.s)};
  width: ${props => heights(props.s)};
`;

// ButtonRoutLink
type StyledRouteLinkProps = LinkProps & SharedButtonProps;
export type ButtonRouteLinkProps = ResultComponentProps<StyledRouteLinkProps>;
const StyledRouteLink = withUtilProps<StyledRouteLinkProps>({ additionalCss: buttonStyle })(Link);

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

// ButtonLink
type StyledLinkProps = AnchorProps & SharedButtonProps;
const StyledLink = styled<StyledLinkProps>(A)`
  ${buttonStyle};
`;
export type ButtonLinkProps = ResultComponentProps<StyledLinkProps>;

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

// Button
type StyledButtonProps = ZbaseButtonProps & ButtonProps;
const StyledButton = styled<StyledButtonProps>(ZbaseButton)`
  ${buttonStyle};
`;

export type ButtonBasicProps = ResultComponentProps<StyledButtonProps>;

class Button extends Component<ButtonBasicProps> {
  static defaultProps: ButtonBasicProps = {
    mode: 'normal',
    inProgress: false,
    disabled: false,
    s: 'medium',
    type: 'button',
  };
  static RouteLink = ButtonRouteLink;
  static Link = ButtonLink;

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
        {inProgress && (
          <InProgressContainer s={size}>
            <LoadingSpinner />
          </InProgressContainer>
        )}
      </StyledButton>
    );
  }
}

export default Button;
