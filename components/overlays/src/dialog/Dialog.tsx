import React, { Component } from 'react';
// @ts-ignore
import tabbable from 'tabbable';

import { styled } from 'z-frontend-theme';
import { Box, BoxProps } from 'zbase';
import { generateRandomId } from 'z-frontend-app-bootstrap/src/accessibilityUtils';

export type DialogProps = {
  isVisible?: boolean;
  controlEl?: HTMLElement;
  keepMounted?: boolean;
  label?: string;
  render?: (labelId?: string, headingRef?: React.RefObject<HTMLElement>) => JSX.Element;
  children?: (labelId?: string, headingRef?: React.RefObject<HTMLElement>) => JSX.Element;
} & BoxProps;

const InvisibleBox = styled(Box)`
  display: none;
`;

export default class Dialog extends Component<DialogProps> {
  _labelId: string;

  rootRef = React.createRef<HTMLDivElement>();
  headingRef = React.createRef<HTMLElement>();

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

  focusFirst = () => {
    if (this.headingRef.current) {
      this.headingRef.current.focus();
    } else {
      const focusableEls = tabbable(this.rootRef.current);
      if (focusableEls.length > 0) {
        focusableEls[0].focus();
      }
    }
  };

  initTabLoop = (rootEl: HTMLDivElement) => {
    const loopedTab = (e: KeyboardEvent) => {
      const TAB_KEYCODE = 9;
      const focusableEls = tabbable(rootEl);

      if (e.keyCode === TAB_KEYCODE) {
        e.preventDefault();

        if (focusableEls.length === 0) {
          return;
        }

        if (focusableEls.length === 1) {
          if (document.activeElement !== focusableEls[0]) {
            focusableEls[0].focus();
          }
          return;
        }

        const currentFocusIndex: number = Array.from(focusableEls).indexOf(document.activeElement as HTMLElement);

        let nextFocusIndex: number;
        if (e.shiftKey) {
          nextFocusIndex = currentFocusIndex === 0 ? focusableEls.length - 1 : currentFocusIndex - 1;
        } else {
          nextFocusIndex = (currentFocusIndex + 1) % focusableEls.length;
        }
        focusableEls[nextFocusIndex].focus();
      }
    };

    rootEl.addEventListener('keydown', loopedTab);
  };

  componentDidUpdate(prevProps: DialogProps) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.focusFirst();
      // If the dialog is always mounted, we don't need to need to init tab listener again
      if (!this.props.keepMounted) {
        this.initTabLoop(this.rootRef.current);
      }
    } else if (prevProps.isVisible && !this.props.isVisible) {
      if (this.props.controlEl && this.props.controlEl.focus) {
        this.props.controlEl.focus();
      }
    }
  }

  componentDidMount() {
    if (this.props.isVisible && this.rootRef.current) {
      this.initTabLoop(this.rootRef.current);
    }
  }

  render() {
    const { isVisible, keepMounted, ...boxProps } = this.props;

    const DisplayContainer = isVisible ? Box : InvisibleBox;
    const ariaLabelAttr = this.getAriaLabelAttr();

    const renderChildren = this.props.render || this.props.children;

    return isVisible || keepMounted ? (
      <DisplayContainer role="dialog" elementRef={this.rootRef} {...ariaLabelAttr} {...boxProps}>
        {renderChildren(this.getLabelId(), this.headingRef)}
      </DisplayContainer>
    ) : null;
  }
}
