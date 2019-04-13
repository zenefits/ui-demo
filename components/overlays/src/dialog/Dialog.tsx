import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { Box, BoxProps } from 'zbase';
import { generateRandomId } from 'z-frontend-app-bootstrap/src/accessibilityUtils';

import { withFocusManager, WithFocusManagerProps } from './FocusManager';

export type DialogWrapperProps = {
  isVisible?: boolean;
  controlEl?: HTMLElement;
  keepMounted?: boolean;
  label?: string;
  render?: (labelId?: string) => JSX.Element;
  children?: (labelId?: string) => JSX.Element;
} & BoxProps;

const InvisibleBox = styled(Box)`
  display: none;
`;

type DialogProps = DialogWrapperProps & WithFocusManagerProps;

class Dialog extends Component<DialogProps> {
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

  componentDidUpdate(prevProps: DialogProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.props.focusManager.focusFirst();
    } else if (prevProps.isVisible && !this.props.isVisible) {
      this.props.focusManager.returnFocus();
    }
  }

  render() {
    const { isVisible, keepMounted, focusManager, ...boxProps } = this.props;

    const DisplayContainer = isVisible ? Box : InvisibleBox;
    const ariaLabelAttr = this.getAriaLabelAttr();

    const renderChildren = this.props.render || this.props.children;

    return isVisible || keepMounted ? (
      <DisplayContainer role="dialog" {...ariaLabelAttr} {...boxProps}>
        {renderChildren(this.getLabelId())}
      </DisplayContainer>
    ) : null;
  }
}

export default withFocusManager<DialogWrapperProps>({ loop: false })(Dialog);
export const ModalDialog = withFocusManager<DialogWrapperProps>({ loop: true })(Dialog);
