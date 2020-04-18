import React, { Component } from 'react';
import { FlattenInterpolation } from 'styled-components';
import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from 'react-router-dom';

import {
  withUtilProps,
  A,
  AnchorProps,
  Box,
  Button as ZbaseButton,
  ButtonProps as ZbaseButtonProps,
  ResponsiveUtilProp,
  ResultComponentProps,
} from 'zbase';
import { css, styled, ColorString, FontStyleString } from 'z-frontend-theme';
import { buttonSpace, color, heights, radius } from 'z-frontend-theme/utils';

import LoadingSpinner, { LoadingSpinnerProps } from '../../overlay/loading-spinner/LoadingSpinner';
import ScreenReaderOnly from '../../text/screen-reader-only/ScreenReaderOnly';

type Size = 'xsmall' | 'small' | 'medium' | 'large';

export type ButtonMode = 'normal' | 'primary' | 'transparent';

interface SharedButtonProps {
  /**
   * The style of the button.
   * @default normal
   */
  mode?: ButtonMode;
  /**
   * Size of the button.
   * @default medium
   */
  s?: Size;
  /**
   * Is the button disabled?
   * @default false
   */
  disabled?: boolean;
  color?: ColorString | ResponsiveUtilProp;
}

export interface ButtonProps extends SharedButtonProps {
  /**
   * Is the button temporarily disabled while an operation is underway?
   * @default false
   */
  inProgress?: boolean;
  /**
   * The type of the button. Example: 'submit' will submit the enclosing form.
   * @default button
   */
  type?: string;
}

type SizeValueMap = { [key in Size]: number };
type SizeStyleMap = { [key in Size]: FontStyleString };

interface ModeSpec {
  bg: ColorString;
  color: ColorString;
  focusBg: Function;
  activeBg: Function;
  focusColor: Function;
  activeColor: Function;
  fontStyle: SizeStyleMap;
  paddingSpaceMap: { px: SizeValueMap; py: SizeValueMap };
}

const fontStyleMap: { [key in Size]: FontStyleString } = {
  xsmall: 'controls.s',
  small: 'controls.s',
  medium: 'controls.m',
  large: 'controls.l',
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

const modeSpecsMap: { [key in ButtonMode]: ModeSpec } = {
  normal: {
    bg: 'button.defaultNormal',
    color: 'text.default',
    focusBg: color('button.defaultHover'),
    activeBg: color('button.defaultActive'),
    focusColor: color('text.dark'),
    activeColor: color('text.dark'),
    fontStyle: fontStyleMap,
    paddingSpaceMap: defaultPaddingSpaceMap,
  },
  primary: {
    bg: 'button.primaryNormal',
    color: 'grayscale.white',
    focusBg: color('button.primaryHover'),
    activeBg: color('button.primaryActive'),
    focusColor: color('grayscale.white'),
    activeColor: color('grayscale.white'),
    fontStyle: fontStyleMap,
    paddingSpaceMap: defaultPaddingSpaceMap,
  },
  transparent: {
    bg: 'transparent',
    color: 'text.default',
    focusBg: color('transparent'),
    activeBg: color('secondary.a', 0.1),
    focusColor: color('link.hover'),
    activeColor: color('link.active'),
    fontStyle: fontStyleMap,
    paddingSpaceMap: {
      px: {
        // decrease these from default
        xsmall: 1,
        small: 3,
        medium: 3,
        large: 5,
      },
      py: defaultPaddingSpaceMap.py,
    },
  },
};

function withModeColorFn(key: string) {
  return (props: SharedButtonProps) => {
    const colorFn = (modeSpecsMap[props.mode as ButtonMode] as any)[key];
    return `${colorFn(props)};`;
  };
}

function isPaddingSpecified(props: ButtonBasicProps) {
  // pt, pr etc should probably not be used for buttons, which should be symmetric
  return props.p !== undefined || props.px !== undefined || props.py !== undefined;
}

function conditionalPadding() {
  return (props: any) => {
    if (isPaddingSpecified(props)) {
      return ''; // just leave it up to util props instead of using defaults
    }
    const spaceMap = (modeSpecsMap as any)[props.mode].paddingSpaceMap;
    return `padding: ${buttonSpace(spaceMap.py[props.s])(props)} ${buttonSpace(spaceMap.px[props.s])(props)};`;
  };
}

function conditionalSize() {
  return (props: any) => {
    const size = heights(props.s)(props);
    if (props.mode === 'transparent') {
      return `${parseInt(size, 0) - 8}px`; // reduce for icon buttons etc
    }
    return size;
  };
}

const buttonColorHelper = (props: any) =>
  color((props.color as ColorString) || (modeSpecsMap as any)[props.mode].color);
// using defaults from fontStyle in most cases (except color)
const buttonStyle: FlattenInterpolation<SharedButtonProps> = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  border: none;
  user-select: none;
  text-decoration: none;
  outline: 0;

  /* NOTE-DZH: this width doesn't look great for narrow icons like more-vert, but mobile guidelines suggest min 48px */
  min-height: ${conditionalSize()};
  min-width: ${conditionalSize()};

  border-radius: ${radius()};
  text-align: center;
  ${conditionalPadding()}
  color: ${buttonColorHelper}; /* override fontStyle default */

  &:disabled {
    cursor: not-allowed;
    opacity: ${props => props.theme.opacities[0]};
  }
  &.simulate-focus,
  &:focus:not(:disabled),
  &:hover:not(:disabled) {
    color: ${withModeColorFn('focusColor')};
    background-color: ${withModeColorFn('focusBg')};
  }
  &:active:not(:disabled) {
    color: ${withModeColorFn('activeColor')};
    background-color: ${withModeColorFn('activeBg')};
  }
  &.simulate-focus,
  &:focus:not(:disabled) {
    box-shadow: 0 0 0 2px ${color('secondary.a', 0.1)};
  }
`;

const StyledChildren = styled<{ hide: boolean }>(Box)`
  max-width: 100%;
  visibility: ${props => (props.hide ? 'hidden' : 'visible')};
`;

const sizeHelper = (props: LoadingSpinnerProps) => heights(props.s as string);
const InProgressContainer = styled(Box)<LoadingSpinnerProps>`
  line-height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  padding: ${props => (props.s === 'xsmall' ? '5px' : '7px')};
  height: ${sizeHelper};
  width: ${sizeHelper};
`;

// ButtonRouteLink
type StyledRouteLinkProps = ReactRouterLinkProps & SharedButtonProps;
export type ButtonRouteLinkProps = ResultComponentProps<StyledRouteLinkProps>;
const StyledRouteLink = withUtilProps<StyledRouteLinkProps>({
  additionalCss: buttonStyle,
})(({ elementRef, ...rest }: any) => <ReactRouterLink {...rest} />);

class ButtonRouteLink extends Component<ButtonRouteLinkProps> {
  static defaultProps: ButtonBasicProps = {
    mode: 'normal',
    s: 'medium',
  };

  render() {
    const { mode, children, s: size } = this.props;
    const modeSpecs = modeSpecsMap[mode as ButtonMode];
    return (
      <StyledRouteLink
        bg={modeSpecs.bg}
        fontStyle={modeSpecs.fontStyle[size as Size]}
        color={modeSpecs.color as ColorString}
        {...this.props}
        mode={mode}
        s={size}
      >
        {children}
      </StyledRouteLink>
    );
  }
}

// ButtonLink
type StyledLinkProps = AnchorProps & SharedButtonProps;
const StyledLink = styled(A)<StyledLinkProps>`
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
    const modeSpecs = modeSpecsMap[mode as ButtonMode];
    return (
      <StyledLink
        bg={modeSpecs.bg}
        fontStyle={modeSpecs.fontStyle[size as Size]}
        color={modeSpecs.color}
        {...this.props}
        mode={mode}
        s={size}
      >
        {children}
      </StyledLink>
    );
  }
}

// Button
type StyledButtonProps = ZbaseButtonProps & ButtonProps;
const StyledButton = styled(ZbaseButton)<StyledButtonProps>`
  ${buttonStyle};
`;

export type ButtonBasicProps = StyledButtonProps;

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
    const modeSpecs = modeSpecsMap[mode as ButtonMode];
    return (
      <StyledButton
        bg={modeSpecs.bg}
        fontStyle={modeSpecs.fontStyle[size as Size] as FontStyleString}
        {...rest}
        disabled={disabled || inProgress}
        mode={mode}
        s={size}
      >
        <StyledChildren hide={inProgress}>{children}</StyledChildren>
        {inProgress && (
          <InProgressContainer s={size}>
            <LoadingSpinner />
            <ScreenReaderOnly>Loading</ScreenReaderOnly>
          </InProgressContainer>
        )}
      </StyledButton>
    );
  }
}

export default Button;
