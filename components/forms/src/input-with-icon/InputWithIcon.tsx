import React, { Component, Ref } from 'react';

import { styled, theme, IconNameString } from 'z-frontend-theme';

import { color, space } from 'z-frontend-theme/utils';
import { Box, BoxProps, Icon } from 'zbase';

import Input, { CustomInputProps, InputProps } from '../input/Input';

type WithIconsProps = {
  leftIconName?: IconNameString;
  rightIconName?: IconNameString;
  onLeftIconClick?: (event: any) => void;
  onLeftIconMouseDown?: (event: any) => void;
  onRightIconClick?: (event: any) => void;
  onRightIconMouseDown?: (event: any) => void;
};

export type InputWithIconProps = InputProps & WithIconsProps & { wrapperRef?: Ref<HTMLDivElement> };

type InputWrapperProps = BoxProps & CustomInputProps & WithIconsProps;

const leftPaddingMap = {
  small: theme.space[4],
  medium: 36,
  large: 48,
};

const StyledWrapper = styled<InputWrapperProps>(Box)`
  position: relative;

  input {
    padding-left: ${props => props.leftIconName && `${leftPaddingMap[props.s]}px`};
    padding-right: ${props => props.rightIconName && (props.s === 'small' ? space(4) : space(5))};
  }
`;

const StyledIcon = styled(Icon.extendProps<{ placement: 'left' | 'right' }>())`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${color('grayscale.e')};
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
          onClick={onLeftIconClick}
          onMouseDown={onLeftIconMouseDown}
          placement="left"
        />
        <Input {...rest} />
        <StyledIcon
          iconName={rightIconName}
          s={rest.s}
          onClick={onRightIconClick}
          onMouseDown={onRightIconMouseDown}
          placement="right"
        />
      </StyledWrapper>
    );
  }
}

export default InputWithIcon;
