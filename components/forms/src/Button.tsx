import React, { Component } from 'react';
import { css } from 'styled-components';
import { hoc } from 'rebass';
import { px } from 'rebass/dist/util';
import { RebassProps } from 'z-rebass-types';
import { color } from 'z-frontend-theme/src/utils';

// This style is also used by ButtonLink.
export const buttonStyle = css`
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  user-select: none;
  text-decoration: none;
  border-radius: ${props => px(props.theme.radius)};
  :hover,
  :focus {
    outline: 0;
    background-color: ${(props: any) => color(props.modeSpecs.focusBg)(props)};
  }
  :disabled {
    cursor: not-allowed;
    opacity: ${props => props.theme.opacities[0]};
  }
`;

const buttonHocProps = {
  px: 3,
  py: 2,
  fontSize: 0,
};

const StyledButton = hoc(buttonStyle, buttonHocProps)('button');

interface Props extends RebassProps<HTMLButtonElement> {
  inProgress?: boolean;
  mode?: 'normal' | 'primary' | 'transparent';
}

const modeSpecsMap = {
  normal: {
    bg: 'greyScale.4',
    color: null,
    focusBg: 'greyScale.3',
    // disabledBg: '',
  },
  primary: {
    bg: 'primary.1',
    color: 'greyScale.6',
    focusBg: 'primary.2',
    // disabledBg: 'primary.1',
  },
  transparent: {
    bg: 'transparent',
    color: 'greyScale.1',
    focusBg: 'primary.2b',
    // disabledBg: 'transparent',
  },
};

// TODO: replace ellipsis by a ProgressIndicator
const Button = ({ disabled = false, inProgress = false, mode = 'normal', ...otherProps }: Props) => {
  const modeSpecs = modeSpecsMap[mode];
  return (
    <StyledButton
      disabled={disabled || inProgress}
      bg={modeSpecs.bg}
      color={modeSpecs.color}
      modeSpecs={modeSpecs}
      {...otherProps}
    >
      {otherProps.children}
      {inProgress ? '...' : ''}
    </StyledButton>
  );
};

export default Button;
