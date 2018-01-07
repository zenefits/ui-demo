import React, { Component, TextareaHTMLAttributes } from 'react';
import { styled } from 'z-frontend-theme';
import { RebassOnlyProps } from 'z-rebass-types';
import { Textarea as RebassTextarea } from 'rebass';
import { space } from 'z-frontend-theme/src/utils';
import { commonTextInputStyles } from './Input';

export declare type TextareaProps = RebassOnlyProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    s?: 'small' | 'medium' | 'large';
    resize?: string;
  };

const StyledTextarea = styled<TextareaProps>(RebassTextarea)`
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
  };

  render() {
    const { s: size, ...rest } = this.props;
    return <StyledTextarea s={size} {...rest} />;
  }
}

export default Textarea;
