import React, { Component } from 'react';
import { FlattenInterpolation } from 'styled-components';

import { css, styled, theme } from 'z-frontend-theme';
import { color, fontSizes, heights, radius, space } from 'z-frontend-theme/utils';
import { Input as ZbaseInput, InputProps as ZbaseInputProps } from 'zbase';

export type InputSize = 'small' | 'medium' | 'large'; // 'size' is taken and not compatible (number)

export type CustomInputProps = {
  /**
   * Controls the height and font-size of the input.
   * @default medium
   */
  s?: InputSize;
  /**
   * Is the component in an error state?
   * @default false
   */
  hasError?: boolean;
};

export type InputProps = ZbaseInputProps & CustomInputProps;

export const sizeMap: { [size in InputSize]: number } = {
  small: 0,
  medium: 1,
  large: 2,
};

export const commonTextInputStyles: FlattenInterpolation<InputProps>[] = css`
  font-size: ${props => fontSizes(sizeMap[props.s])};
  font-weight: ${props => theme.weights[0]};
  border: 1px solid ${props => (props.hasError ? color('negation.a') : color('grayscale.f'))};
  border-radius: ${radius()};
  background-color: ${color('grayscale.white')};
  color: ${color('text.dark')};
  padding-left: ${props => (props.s === 'small' ? space(2) : space(3))};
  padding-right: ${props => (props.s === 'small' ? space(2) : space(3))};
  transition-property: box-shadow, border, background;
  transition-duration: 0.25s;

  ::placeholder {
    color: ${color('text.off')};
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
    background-color: ${color('grayscale.g')};
    border-color: ${color('grayscale.g')};
    color: ${color('text.light')};
  }

  :required {
    box-shadow: none; /* prevent firefox default */
  }
`;

const WrapperInput = ({ hasError, ...rest }: InputProps) => <ZbaseInput {...rest} />;

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
    const { s: size, hasError, ...rest } = this.props;
    return <StyledInput s={size} aria-invalid={hasError ? true : null} hasError={hasError} {...rest} />;
  }
}

export default Input;
