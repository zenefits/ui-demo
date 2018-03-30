import React, { Component } from 'react';
import tabbable from 'tabbable';

type FocusLoopProps = {
  returnFocusTo?: HTMLElement;
  render: (focusFirst: () => void, returnFocus: () => void) => JSX.Element;
};

type FocusLoopChildProps = {
  focusFirst: () => void;
  returnFocus: () => void;
};

type FocusLoopState = { deferredFocusAction: 'focusFirst' | 'returnFocus' | null };

export default class FocusLoop extends Component<FocusLoopProps, FocusLoopState> {
  rootEl: HTMLElement;
  focusableEls: any;

  constructor(props) {
    super(props);
    this.state = { deferredFocusAction: null };
  }

  render() {
    return (
      <div ref={el => (this.rootEl = el)} onKeyDown={this.loopedTab}>
        {this.props.render(this.registerFocusFirst, this.registerReturnFocus)}
      </div>
    );
  }

  loopedTab = e => {
    const TAB_KEYCODE = 9;
    this.focusableEls = tabbable(this.rootEl);

    if (e.keyCode === TAB_KEYCODE) {
      e.preventDefault();

      if (this.focusableEls.length === 0) {
        return;
      }

      if (this.focusableEls.length === 1) {
        if (document.activeElement !== this.focusableEls[0]) {
          this.focusableEls[0].focus();
        }
        return;
      }

      const currentFocusIndex: number = Array.from(this.focusableEls).indexOf(document.activeElement as HTMLElement);
      const nextFocusIndex: number = (currentFocusIndex + (e.shiftKey ? -1 : 1)) % this.focusableEls.length;
      this.focusableEls[nextFocusIndex].focus();
    }
  };

  focusFirst = () => {
    if (this.rootEl) {
      this.focusableEls = tabbable(this.rootEl);
      if (this.focusableEls.length > 0) {
        this.focusableEls[0].focus();
      }
    }
  };

  registerFocusFirst = () => {
    // If focusFirst were called in child's componentDidUpdate method,
    // this.rootEl would be null (because new ref has been specified but not received yet.)
    // Instead we will provide a callback that schedules a state update and handle
    // it by calling focusFirst internally.
    this.setState({ deferredFocusAction: 'focusFirst' });
  };

  returnFocus = () => {
    if (this.props.returnFocusTo && this.props.returnFocusTo.focus) {
      this.props.returnFocusTo.focus();
    }

    console.assert(
      !this.props.returnFocusTo || this.props.returnFocusTo.focus,
      'Warning: FocusLoop was passed a unfocusable element as returnFocusTo prop.',
    );
  };

  registerReturnFocus = () => {
    this.setState({ deferredFocusAction: 'returnFocus' });
  };

  componentDidMount() {
    this.focusFirst();
  }

  componentWillUnmount() {
    this.returnFocus();
  }

  componentDidUpdate() {
    if (this.state.deferredFocusAction) {
      this[this.state.deferredFocusAction]();
      this.setState({ deferredFocusAction: null });
    }
  }
}

type HasControlElement = { controlEl?: HTMLElement };

export type WithFocusLoopProps = {
  focusLoop: FocusLoopChildProps;
};

export const withFocusLoop = <P extends {}>(
  Component: React.ComponentType<P & WithFocusLoopProps>,
): React.StatelessComponent<P & HasControlElement> => (props: P & HasControlElement) => (
  <FocusLoop
    returnFocusTo={props.controlEl}
    render={(focusFirst, returnFocus) => <Component {...props} focusLoop={{ focusFirst, returnFocus }} />}
  />
);
