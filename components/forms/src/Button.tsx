import React, { Component } from 'react';
import { css } from 'styled-components';
import { hoc } from 'rebass';
import { px } from 'rebass/dist/util';
import { RebassProps } from 'z-rebass-types';

const buttonStyle = css`
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  user-select: none;
  border-radius: ${props => px(props.theme.radius)};
  :hover,
  :focus {
    outline: 0;
    background-color: ${props => props.theme.colors.primary.orange100Dark};
  }
  :disabled {
    cursor: not-allowed;
    opacity: ${props => props.theme.opacities[0]};
  }
  :disabled:hover {
    background-color: ${props => props.theme.colors.primary.orange100};
  }
`;

const buttonHocProps = {
  p: 2,
  color: 'greyScale.white',
  bg: 'primary.orange100',
};

const StyledButton = hoc(buttonStyle, buttonHocProps)('button');

interface Props extends RebassProps<HTMLButtonElement> {
  inProgress?: boolean;
}

// TODO: replace ellipsis by a ProgressIndicator
const Button = ({ disabled = false, inProgress = false, ...otherProps }: Props) => {
  return (
    <StyledButton disabled={disabled || inProgress} {...otherProps}>
      {otherProps.children}
      {inProgress ? '...' : ''}
    </StyledButton>
  );
};

export default Button;
