import React, { Component } from 'react';
import { range } from 'lodash';

import { DialogManagerState, DialogProps } from './DialogManager';

type DialogsManagerProps = {
  /**
   * Renders the dialog contents, providing a few options. Usually involves Modal.
   */
  render: (dialogs: DialogProps[]) => JSX.Element;
  /** The number of dialogs. */
  dialogsCount: number;
  /**
   * Are the dialogs open by default?
   * @default false
   */
  openByDefault?: boolean[];
};

type DialogsManagerState = {
  dialogStates: DialogManagerState[];
};

class DialogsManager extends Component<DialogsManagerProps, DialogsManagerState> {
  static defaultProps = {
    openByDefault: [] as boolean[],
  };

  constructor(props: DialogsManagerProps) {
    super(props);
    this.state = {
      dialogStates: range(props.dialogsCount).map(i => ({ isDialogVisible: !!props.openByDefault[i] })),
    };
  }

  makeIthOpen = (i: number) => (e?: any) =>
    new Promise(resolve => {
      const controlEl = e ? e.target : null;
      this.setState(prevState => {
        const newDialogStates = prevState.dialogStates.slice();
        newDialogStates[i] = {
          ...newDialogStates[i],
          isDialogVisible: true,
          ...(controlEl ? { controlEl } : {}),
        };
        return {
          dialogStates: newDialogStates,
        };
      }, resolve);
    });

  makeIthClose = (i: number) => () =>
    new Promise(resolve => {
      this.setState((prevState: DialogsManagerState) => {
        const newDialogStates = prevState.dialogStates.slice();
        newDialogStates[i] = { ...(prevState as any)[i], isDialogVisible: false };
        return {
          dialogStates: newDialogStates,
        };
      }, resolve);
    });

  makeIthSetControlElement = (i: number) => (source: any) => {
    const controlEl = source.target ? source.target : source;
    this.setState(prevState => {
      const newDialogStates = prevState.dialogStates.slice();
      newDialogStates[i] = { ...newDialogStates[i], controlEl };
      return {
        dialogStates: newDialogStates,
      };
    });
  };

  render() {
    const dialogs = range(this.props.dialogsCount).map(i => ({
      isVisible: this.state.dialogStates[i].isDialogVisible,
      open: this.makeIthOpen(i),
      close: this.makeIthClose(i),
      controlEl: this.state.dialogStates[i].controlEl,
      setControlElement: this.makeIthSetControlElement(i),
    }));

    return this.props.render(dialogs);
  }
}

export default DialogsManager;

export type WithDialogsProps = { dialogs: DialogProps[] };

interface WithDialogsParams {
  dialogsCount: number;
  openByDefault?: boolean[];
}

export const withDialogs = <P extends {}>({ dialogsCount, openByDefault }: WithDialogsParams) => (
  Component: React.ComponentType<WithDialogsProps & P>,
): React.StatelessComponent<P> => {
  return (props: P) => (
    <DialogsManager
      dialogsCount={dialogsCount}
      openByDefault={openByDefault}
      render={dialogsProps => <Component {...props} dialogs={dialogsProps} />}
    />
  );
};
