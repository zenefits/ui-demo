import React, { Component, StatelessComponent } from 'react';

export type DialogProps = {
  isVisible: boolean;
  open: (e?: any) => Promise<{}>;
  close: () => Promise<{}>;
  controlEl: HTMLElement;
  setControlElement?: (source: any) => void;
  IgnoreDialogUpdates?: StatelessComponent;
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
  // We don't want setting control el to update content within IgnoreDialogUpdate
  // controlElUpdateId can be used to determine if controlEl has been updated by setState
  // (Can't compare values because controlEl may have been set to the same element)
  controlElUpdateId?: number;
};

type UpdateGateProps = { shouldRerenderChildren: boolean };

class UpdateGate extends Component<UpdateGateProps> {
  shouldComponentUpdate(nextProps: UpdateGateProps) {
    return nextProps.shouldRerenderChildren;
  }
  render() {
    return this.props.children;
  }
}

export class DialogManager extends Component<DialogManagerProps, DialogManagerState> {
  constructor(props: DialogManagerProps) {
    super(props);
    this.state = {
      isDialogVisible: !!props.openByDefault,
    };
  }

  dialogWasUpdated = false;

  IgnoreDialogUpdates: StatelessComponent = ({ children }) => (
    <UpdateGate shouldRerenderChildren={!this.dialogWasUpdated}>{children}</UpdateGate>
  );

  shouldComponentUpdate(nextProps: DialogManagerProps, nextState: DialogManagerState) {
    this.dialogWasUpdated =
      nextState.isDialogVisible !== this.state.isDialogVisible ||
      nextState.controlElUpdateId !== this.state.controlElUpdateId;

    return true;
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
      controlElUpdateId: Math.random(),
    });
  };

  render() {
    return this.props.render({
      isVisible: this.state.isDialogVisible,
      open: this.open,
      close: this.close,
      controlEl: this.state.controlEl,
      setControlElement: this.setControlElement,
      IgnoreDialogUpdates: this.IgnoreDialogUpdates,
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
