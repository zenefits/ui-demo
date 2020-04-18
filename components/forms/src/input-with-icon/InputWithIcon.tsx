import React, { Component, Ref } from 'react';

import { styled, theme, IconNameString } from 'z-frontend-theme';

import { color, fontSizes, space } from 'z-frontend-theme/utils';
import { Box, BoxProps, Icon } from 'zbase';

import Input, { CustomInputProps, InputProps } from '../input/Input';
import { sizeMap } from '../input/inputTypes';

// Warning: the icons are not accessible / cannot be navigated with keyboard, so be careful with adding interactivity
type WithIconsProps = {
  leftIconName?: IconNameString;
  rightIconName?: IconNameString;
  /** Action to take when user clicks the left icon */
  onLeftIconClick?: (event: any) => void;
  /** Action to take when user clicks the right icon */
  onRightIconClick?: (event: any) => void;
  /** Only use in edge cases where event order matters, eg focus/blur */
  onLeftIconMouseDown?: (event: any) => void;
  /** Only use in edge cases where event order matters, eg focus/blur */
  onRightIconMouseDown?: (event: any) => void;
};

export type InputWithIconProps = InputProps & WithIconsProps & { wrapperRef?: Ref<HTMLDivElement> };

type InputWrapperProps = BoxProps & CustomInputProps & WithIconsProps;

const leftPaddingMap = {
  small: theme.space[4],
  medium: 36,
  large: 48,
};

const StyledWrapper = styled(Box)<InputWrapperProps>`
  position: relative;

  input {
    padding-left: ${(props: InputWrapperProps) => props.leftIconName && `${leftPaddingMap[props.s]}px`};
    padding-right: ${props => props.rightIconName && (props.s === 'small' ? space(4) : space(5))};
  }
`;

const StyledIcon = styled(Icon)<{ placement: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${color('grayscale.e')};
  font-size: ${(props: CustomInputProps) => fontSizes(sizeMap[props.s])};
  ${props => `${props.placement}: ${(props.s === 'small' ? space(2) : space(3))(props)}`};
  ${props => (props.onClick || props.onMouseDown ? 'cursor: pointer;' : 'pointer-events: none;')};
`;

class InputWithIcon extends Component<InputWithIconProps> {
  static defaultProps = {
    s: 'medium',
  };

  render() {
    const {
      leftIconName,
      onLeftIconClick,
      onLeftIconMouseDown,
      rightIconName,
      onRightIconClick,
      onRightIconMouseDown,
      wrapperRef,
      width,
      children,
      w,
      ...rest
    } = this.props;
    return (
      <StyledWrapper
        elementRef={wrapperRef}
        leftIconName={leftIconName}
        rightIconName={rightIconName}
        s={rest.s}
        width={width}
        w={w}
      >
        <StyledIcon
          iconName={leftIconName}
          s={rest.s}
          onClick={rest.disabled ? null : onLeftIconClick}
          onMouseDown={rest.disabled ? null : onLeftIconMouseDown}
          placement="left"
        />
        {children || <Input {...rest} />}
        <StyledIcon
          iconName={rightIconName}
          s={rest.s}
          onClick={rest.disabled ? null : onRightIconClick}
          onMouseDown={rest.disabled ? null : onRightIconMouseDown}
          placement="right"
        />
      </StyledWrapper>
    );
  }
}

export default InputWithIcon;
