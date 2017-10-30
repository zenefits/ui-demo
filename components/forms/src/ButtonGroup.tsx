import React, { Component } from 'react';
import { css } from 'styled-components';
import { hoc } from 'rebass';

const buttonGroupStyle = css`
  display: flex;
  align-items: flex-start;
  *:first-child:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  *:not(:first-child) {
    border-left: 1px solid ${props => props.theme.colors.greyScale[6]};
  }
  *:not(:first-child):not(:last-child) {
    border-radius: 0;
  }
  *:last-child:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export default hoc(buttonGroupStyle, {})('div');
