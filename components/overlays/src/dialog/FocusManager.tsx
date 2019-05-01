import React, { Component, KeyboardEvent } from 'react';
// @ts-ignore
import tabbable from 'tabbable';

type FocusManagerProps = {
  returnFocusTo?: HTMLElement;
  render?: (focusFirst: () => void, returnFocus: () => void) => JSX.Element;
  children?: (focusFirst: () => void, returnFocus: () => void) => JSX.Element;
  loop?: boolean;
};

type FocusManagerChildProps = {
  focusFirst: () => void;
  returnFocus: () => void;
};

type FocusManagerState = { deferredFocusAction: 'focusFirst' | 'returnFocus' | null };

export default class FocusManager extends Component<FocusManagerProps, FocusManagerState> {
  rootEl: HTMLElement;
  focusableEls: any;

  static defaultProps = {
    loop: true,
  };

  constructor(props: FocusManagerProps) {
    super(props);
    this.state = { deferredFocusAction: null };
  }

  render() {
    const renderChildren = this.props.render || this.props.children;
    return (
      <div ref={el => (this.rootEl = el)} onKeyDown={this.props.loop && this.loopedTab}>
        {renderChildren(this.registerFocusFirst, this.registerReturnFocus)}
      </div>
    );
  }

  loopedTab = (e: KeyboardEvent<any>) => {
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

export type WithFocusManagerProps = {
  focusManager: FocusManagerChildProps;
};

export const withFocusManager = <P extends {}>(options: { loop: boolean }) => (
  Component: React.ComponentType<P & WithFocusManagerProps>,
): React.StatelessComponent<P & HasControlElement> => (props: P & HasControlElement) => (
  <FocusManager
    loop={options.loop}
    returnFocusTo={props.controlEl}
    render={(focusFirst, returnFocus) => <Component {...props} focusManager={{ focusFirst, returnFocus }} />}
  />
);
