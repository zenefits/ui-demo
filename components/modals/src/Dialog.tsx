import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { Box } from 'zbase';
import { generateRandomId } from 'z-frontend-app-bootstrap/src/accessibilityUtils';

import { withFocusLoop, WithFocusLoopProps } from './FocusLoop';

export type DialogWrapperProps = {
  isVisible?: boolean;
  controlEl?: HTMLElement;
  keepMounted?: boolean;
  label?: string;
  render: (labelId?: string) => JSX.Element;
};

const InvisibleBox = styled(Box)`
  display: none;
`;

class Dialog extends Component<DialogWrapperProps & WithFocusLoopProps> {
  _labelId: string;

  getLabelId() {
    if (!this._labelId) {
      this._labelId = generateRandomId();
    }
    return this._labelId;
  }

  getAriaLabelAttr = (): {
    'aria-label'?: string;
    'aria-labelledby'?: string;
  } => (this.props.label ? { 'aria-label': this.props.label } : { 'aria-labelledby': this.getLabelId() });

  componentDidUpdate(prevProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.props.focusLoop.focusFirst();
    } else if (prevProps.isVisible && !this.props.isVisible) {
      this.props.focusLoop.returnFocus();
    }
  }

  render() {
    const DisplayContainer = this.props.isVisible ? Box : InvisibleBox;
    const ariaLabelAttr = this.getAriaLabelAttr();

    return this.props.isVisible || this.props.keepMounted ? (
      <DisplayContainer role="dialog" {...ariaLabelAttr}>
        {this.props.render(this.getLabelId())}
      </DisplayContainer>
    ) : null;
  }
}

export default withFocusLoop(Dialog);
