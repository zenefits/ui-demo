import React, { Component } from 'react';

export type DialogProps = {
  isVisible: boolean;
  open: (e?) => void;
  close: () => void;
  controlEl: HTMLElement;
  setControlElement?: (source: any) => void;
};

type DialogManagerProps = {
  render: (options: DialogProps) => JSX.Element;
};

export type DialogManagerState = {
  isDialogVisible: boolean;
  controlEl?: HTMLElement;
};

class DialogManager extends Component<DialogManagerProps, DialogManagerState> {
  constructor(props) {
    super(props);
    this.state = { isDialogVisible: false };
  }

  open = (e?) =>
    new Promise(resolve => {
      const newState: any = { isDialogVisible: true };
      if (e) {
        newState.controlEl = e.target;
      }
      this.setState(newState, resolve);
    });

  close = () =>
    new Promise(resolve => {
      this.setState({ isDialogVisible: false }, resolve);
    });

  setControlElement = (source: any) => {
    if (source.target) {
      this.setState({ controlEl: source.target as HTMLElement });
    } else {
      this.setState({ controlEl: source as HTMLElement });
    }
  };

  render() {
    return this.props.render({
      isVisible: this.state.isDialogVisible,
      open: this.open,
      close: this.close,
      controlEl: this.state.controlEl,
      setControlElement: this.setControlElement,
    });
  }
}

export type WithDialogProps = { dialog: DialogProps };

export const withDialog = <P extends {}>() => (
  C: React.ComponentClass<P & WithDialogProps>,
): React.StatelessComponent<P> => {
  const Component = C as any;
  return (props: P) => <DialogManager render={dialogProps => <Component {...props} dialog={dialogProps} />} />;
};
