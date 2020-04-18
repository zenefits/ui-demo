import React, { Component } from 'react';
import { FlattenInterpolation } from 'styled-components';

import { css, styled, theme } from 'z-frontend-theme';
import { color, fontSizes, heights, radius, space } from 'z-frontend-theme/utils';
import { Input as ZbaseInput, InputProps as ZbaseInputProps } from 'zbase';

import { sizeMap, InputSize } from './inputTypes';
import InputWithPrefixSuffix from '../input-with-prefix-suffix/InputWithPrefixSuffix';

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
  /**
   * Type of input (text, email, tel, etc)
   * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
   */
  type?: string;
  /**
   * Align text to right, eg for numeric inputs in a table.
   */
  textAlignRight?: boolean;
  /**
   * custom prefix for the input eg: currency symbols
   */
  prefix?: string;
  /**
   * custom suffix for the input eg: percentage symbols
   */
  suffix?: string;
};

const horizontalPadding = '12px';

export type InputProps = ZbaseInputProps & CustomInputProps;

export const commonTextInputStyles: FlattenInterpolation<InputProps> = css`
  font-size: ${(props: InputProps) => fontSizes(sizeMap[props.s])};
  font-weight: ${props => theme.weights[0]};
  border: 1px solid ${props => (props.hasError ? color('negation.a') : color('grayscale.f'))};
  border-radius: ${radius()};
  background-color: ${color('grayscale.white')};
  color: ${color('text.dark')};
  padding-left: ${props => (props.s === 'small' ? space(2) : horizontalPadding)};
  padding-right: ${props => (props.s === 'small' ? space(2) : horizontalPadding)};
  transition-property: box-shadow, border, background;
  transition-duration: 0.25s;
  ${props => (props.textAlignRight ? 'text-align: right;' : '')} ::placeholder {
    color: ${color('text.off')};
  }

  :hover,
  :active {
    border-color: ${(props: InputProps) => (props.hasError ? color('negation.a') : color('grayscale.e'))};
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

const StyledInput = styled(WrapperInput)<InputProps>`
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
    // ref={el => (this.input = el)}
  }

  render() {
    const { s: size, hasError, prefix, suffix, ...rest } = this.props;
    // This is needed as InputWithIcons children should be just inputs
    const isInputWithPrefixSuffix = prefix || suffix;
    const conditionalProps = {
      'aria-invalid': hasError ? true : null,
    };
    return isInputWithPrefixSuffix ? (
      <InputWithPrefixSuffix s={size} prefix={prefix} suffix={suffix}>
        <StyledInput s={size} hasError={hasError} {...conditionalProps} {...rest} />
      </InputWithPrefixSuffix>
    ) : (
      <StyledInput s={size} hasError={hasError} {...conditionalProps} {...rest} />
    );
  }
}

export default Input;
