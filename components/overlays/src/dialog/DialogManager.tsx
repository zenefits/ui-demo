import React, { Component } from 'react';

export type DialogProps = {
  isVisible: boolean;
  open: (e?: any) => Promise<{}>;
  close: () => Promise<{}>;
  controlEl: HTMLElement;
  setControlElement?: (source: any) => void;
};

type DialogManagerProps = {
  /**
   * Renders the dialog content, providing a few options. Usually involves Modal.
   */
  render: (options: DialogProps) => JSX.Element;
  /**
   * Is the dialog open by default?
   * @default false
   */
  openByDefault?: boolean;
};

export type DialogManagerState = {
  isDialogVisible: boolean;
  controlEl?: HTMLElement;
};

export class DialogManager extends Component<DialogManagerProps, DialogManagerState> {
  constructor(props: DialogManagerProps) {
    super(props);
    this.state = {
      isDialogVisible: !!props.openByDefault,
    };
  }

  open = (e?: any) =>
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
    this.setState({
      controlEl: (source.target || source) as HTMLElement,
    });
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

export default DialogManager;

export type WithDialogProps = { dialog: DialogProps };

export const withDialog = <P extends {}>() => (
  C: React.ComponentClass<P & WithDialogProps>,
): React.StatelessComponent<P> => {
  const Component = C as any;
  return (props: P) => <DialogManager render={dialogProps => <Component {...props} dialog={dialogProps} />} />;
};
