import React, { Component } from 'react';
import { css } from 'styled-components';
import { hoc } from 'rebass';
import { px } from 'rebass/dist/util';
import { RebassProps } from 'z-rebass-types';

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
  }
  :disabled {
    cursor: not-allowed;
    opacity: ${props => props.theme.opacities[0]};
  }
`;

const buttonHocProps = {
  p: 2,
  fontSize: 0,
  color: 'greyScale.6',
  bg: 'primary.1',
};

const ButtonLink = hoc(buttonStyle, buttonHocProps)('a');

export default ButtonLink;
