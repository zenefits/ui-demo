import React, { Component } from 'react';

import { Textarea as ZbaseTextarea, TextareaProps as ZbaseTextareaProps } from 'zbase';
import { styled } from 'z-frontend-theme';
import { space } from 'z-frontend-theme/utils';

import { commonTextInputStyles } from './Input';

export declare type TextareaProps = ZbaseTextareaProps & {
  s?: 'small' | 'medium' | 'large';
  resize?: string;
};

const StyledTextarea = styled<TextareaProps>(ZbaseTextarea)`
  ${commonTextInputStyles};
  width: 100%; /* NOTE: cols attribute ignored */
  /* NOTE: resize is not universally supported: https://caniuse.com/#feat=css-resize */
  ${props => (props.resize ? `resize: ${props.resize}` : '')};
  line-height: 1.54;
  padding-top: ${space(2)};
  padding-bottom: ${space(2)};
`;

class Textarea extends Component<TextareaProps> {
  static defaultProps = {
    s: 'medium',
    rows: 2,
    resize: 'vertical',
  };

  render() {
    const { s: size, ...rest } = this.props;
    return <StyledTextarea s={size} {...rest} />;
  }
}

export default Textarea;
