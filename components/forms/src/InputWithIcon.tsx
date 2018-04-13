import React, { Component } from 'react';

import { styled, IconNameString } from 'z-frontend-theme';

import { color, space } from 'z-frontend-theme/utils';
import { Box, BoxProps, Icon } from 'zbase';

import Input, { CustomInputProps, InputProps } from './Input';

export declare type InputWithIconProps = InputProps & {
  iconName: IconNameString;
  onIconClick?: (event: any) => void;
};

const StyledWrapper = styled<BoxProps & CustomInputProps>(Box)`
  position: relative;

  input {
    /* increase padding to allow icon */
    padding-right: ${props => (props.s === 'small' ? space(4) : space(5))};
  }
`;

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${color('grayscale.e')};
  right: ${props => (props.s === 'small' ? space(2) : space(3))};
  ${props => (props.onClick ? 'cursor: pointer;' : 'pointer-events: none;')};
`;

class InputWithIcon extends Component<InputWithIconProps> {
  render() {
    const { iconName, onIconClick, ...rest } = this.props;
    return (
      <StyledWrapper>
        <Input {...rest} />
        <StyledIcon iconName={iconName} s={rest.s} onClick={onIconClick} />
      </StyledWrapper>
    );
  }
}

export default InputWithIcon;
