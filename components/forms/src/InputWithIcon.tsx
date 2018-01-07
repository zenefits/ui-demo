import React, { Component } from 'react';
import { styled } from 'z-frontend-theme';
import { color, space } from 'z-frontend-theme/src/utils';
import { RebassOnlyProps } from 'z-rebass-types';
import { Box } from 'rebass';
import Icon from 'z-frontend-theme/src/Icon';
import Input, { InputProps } from './Input';

export declare type InputWithIconProps = RebassOnlyProps &
  InputProps & {
    iconName: string;
    onIconClick?: (event: any) => void;
  };

const StyledWrapper = styled<InputProps>(Box)`
  position: relative;

  input {
    /* increase padding to allow icon */
    padding-right: ${props => (props.s === 'small' ? space(4) : space(5))};
  }
`;

const StyledIcon = styled<InputWithIconProps>(Icon)`
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
