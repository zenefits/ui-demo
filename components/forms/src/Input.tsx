import React, { InputHTMLAttributes, Component } from 'react';
import { styled, css } from 'z-frontend-theme';
import { color, radius, space, heights, fontSizes } from 'z-frontend-theme/src/utils';
import { RebassOnlyProps } from 'z-rebass-types';
import { Input as RebassInput } from 'rebass';

// TODO: how to handle type="email" etc?

export declare type InputProps = RebassOnlyProps &
  InputHTMLAttributes<HTMLInputElement> & {
    s?: 'small' | 'medium' | 'large'; // 'size' is taken and not compatible (number)
  };

const sizeMap = {
  small: 0,
  medium: 1,
  large: 2,
};

export const commonTextInputStyles = css`
  font-size: ${props => fontSizes(sizeMap[props.s])};
  border: 1px solid ${color('secondary.b')};
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
    border-color: ${color('grayscale.e')};
  }

  :focus {
    border-color: ${color('tertiary.a')};
    box-shadow: 0 0 0 1px ${color('tertiary.a', 0.5)};
    outline: none;
  }

  :disabled {
    background-color: ${color('secondary.c')};
    border-color: ${color('secondary.c')};
  }

  &.error {
    border-color: ${color('negation.a')};
  }
`;

const StyledInput = styled<InputProps>(RebassInput)`
  ${commonTextInputStyles};
  height: ${props => heights(props.s)};
  line-height: 1.43;
`;

class Input extends Component<InputProps> {
  static defaultProps = {
    s: 'medium',
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
