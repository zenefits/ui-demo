import React, { Component } from 'react';

import { css, styled } from 'z-frontend-theme';
import { color, fontSizes, heights, radius, space } from 'z-frontend-theme/utils';
import { Input as ZbaseInput, InputProps as ZbaseInputProps } from 'zbase';

// TODO: how to handle type="email" etc?

export declare type CustomInputProps = {
  s?: 'small' | 'medium' | 'large'; // 'size' is taken and not compatible (number)
  hasError?: boolean;
};

export declare type InputProps = ZbaseInputProps & CustomInputProps;

const sizeMap = {
  small: 0,
  medium: 1,
  large: 2,
};

export const commonTextInputStyles = css`
  font-size: ${props => fontSizes(sizeMap[props.s])};
  border: 1px solid ${props => (props.hasError ? color('negation.a') : color('secondary.b'))};
  border-radius: ${radius};
  background-color: ${color('grayscale.white')};
  color: ${color('grayscale.b')};
  padding-left: ${props => (props.s === 'small' ? space(2) : space(3))};
  padding-right: ${props => (props.s === 'small' ? space(2) : space(3))};

  ::placeholder {
    color: ${color('grayscale.d')};
  }

  :hover,
  :active {
    border-color: ${props => (props.hasError ? color('negation.a') : color('grayscale.e'))};
  }

  :focus {
    border-color: ${props => (props.hasError ? color('negation.a') : color('tertiary.a'))};
    box-shadow: 0 0 0 1px ${color('tertiary.a', 0.5)};
    outline: none;
  }

  :disabled {
    background-color: ${color('secondary.c')};
    border-color: ${color('secondary.c')};
  }

  :required {
    box-shadow: none; /* prevent firefox default */
  }

  &.error {
    border-color: ${color('negation.a')};
  }
`;

const WrapperInput = ({ hasError, ...rest }) => <ZbaseInput {...rest} />;

const StyledInput = styled<InputProps>(WrapperInput)`
  ${commonTextInputStyles};
  height: ${props => heights(props.s)};
  line-height: 1.43;
`;

class Input extends Component<InputProps> {
  static defaultProps = {
    s: 'medium',
    hasError: false,
  };

  focus() {
    // TODO: focus is broken due to bug in rebass
    // https://github.com/jxnblk/rebass/issues/329
    // this.input.focus();
    // innerRef={el => (this.input = el)}
  }

  render() {
    const { s: size, ...rest } = this.props;
    return <StyledInput s={size} {...rest} />;
  }
}

export default Input;
