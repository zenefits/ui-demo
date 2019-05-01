import React, { Component } from 'react';

import { Textarea as ZbaseTextarea, TextareaProps as ZbaseTextareaProps } from 'zbase';
import { css, styled } from 'z-frontend-theme';
import { space } from 'z-frontend-theme/utils';

import { commonTextInputStyles } from '../input/Input';

export type TextareaProps = ZbaseTextareaProps & {
  /**
   * Should the input have focus when the page loads?
   * @default false
   */
  autoFocus?: boolean;
  /**
   * Is the input disabled?
   * @default false
   */
  disabled?: boolean;
  /**
   * Is the input in an error state?
   * @default false
   */
  hasError?: boolean;
  /**
   * The minimum number of characters (unicode code points) required that the user should enter.
   * @default 0
   */
  minLength?: number;
  /**
   * The maximum number of characters (unicode code points) that the user can enter.
   * @default unlimited
   */
  maxLength?: number;
  /**
   * A hint to the user of what can be entered as text.
   */
  placeholder?: string;
  /**
   * Allows the input to be resized. See https://developer.mozilla.org/en-US/docs/Web/CSS/resize
   * @default vertical
   */
  resize?: string;
  /**
   * The number of visible text lines for the input.
   * @default (varies by browser)
   */
  rows?: number;
  /**
   * Controls the font-size of entered text.
   * @default medium
   */
  s?: 'small' | 'medium' | 'large';
  /**
   * Should the input expand as you add more lines of text?
   * @default false
   */
  autoGrow?: boolean;
  /**
   * If autogrow is true, what is the max height it can grow to?
   * @default 30vh
   */
  autoGrowMaxHeight?: string;
};

export const commonTextareaStyles = css<TextareaProps>`
  ${commonTextInputStyles};
  width: 100%; /* NOTE: cols attribute ignored */
  /* NOTE: resize is not universally supported: https://caniuse.com/#feat=css-resize */
  ${props => (props.resize ? `resize: ${props.resize}` : '')};
  line-height: 1.54;
  padding-top: ${space(2)};
  padding-bottom: ${space(2)};
`;

const StyledTextarea = styled<TextareaProps & { autoGrowHeight?: number }>(ZbaseTextarea)`
  ${commonTextareaStyles};
  ${props => (props.autoGrowHeight ? `height: ${props.autoGrowHeight}px` : '')};
  ${props => `max-height: ${props.autoGrowMaxHeight}`};
`;

interface State {
  autoGrowHeight: number | null;
}

class Textarea extends Component<TextareaProps, State> {
  static defaultProps = {
    s: 'medium',
    rows: 2,
    resize: 'vertical',
    hasError: false,
    autoGrow: false,
    autoGrowMaxHeight: '30vh',
  };
  constructor(props: TextareaProps) {
    super(props);
    this.state = {
      autoGrowHeight: null,
    };
  }

  onInput = (evt: any) => {
    if (this.props.autoGrow) {
      if (!this.state.autoGrowHeight || this.state.autoGrowHeight < evt.target.scrollHeight) {
        this.setState({ autoGrowHeight: evt.target.scrollHeight + 4 });
      }
    }

    if (this.props.onInput) {
      this.props.onInput(evt);
    }
  };

  render() {
    const { s: size, hasError, autoGrow, ...rest } = this.props;
    return (
      <StyledTextarea
        s={size}
        onInput={this.onInput}
        aria-invalid={hasError ? true : null}
        hasError={hasError}
        autoGrowHeight={this.state.autoGrowHeight}
        {...rest}
      />
    );
  }
}

export default Textarea;
