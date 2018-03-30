import React, { Component } from 'react';
import _ from 'lodash';

import { DialogManagerState, DialogProps } from './DialogManager';

type DialogsManagerProps = {
  render: (dialogs: DialogProps[]) => JSX.Element;
  dialogsCount: number;
};

type DialogsManagerState = {
  dialogStates: DialogManagerState[];
};

class DialogsManager extends Component<DialogsManagerProps, DialogsManagerState> {
  constructor(props) {
    super(props);
    this.state = {
      dialogStates: _.range(props.dialogsCount).map(i => ({ isDialogVisible: false })),
    };
  }

  makeIthOpen = (i: number) => (e?) => {
    // We won't be able to read event target later, so set it here
    const controlEl = e ? e.target : null;
    this.setState(prevState => {
      const newDialogStates = prevState.dialogStates.slice();
      newDialogStates[i] = {
        ...newDialogStates[i],
        isDialogVisible: true,
        ...controlEl ? { controlEl } : {},
      };
      return {
        dialogStates: newDialogStates,
      };
    });
  };

  makeIthClose = (i: number) => () => {
    this.setState(prevState => {
      const newDialogStates = prevState.dialogStates.slice();
      newDialogStates[i] = { ...prevState[i], isDialogVisible: false };
      return {
        dialogStates: newDialogStates,
      };
    });
  };

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
    const dialogs = _.range(this.props.dialogsCount).map(i => ({
      isVisible: this.state.dialogStates[i].isDialogVisible,
      open: this.makeIthOpen(i),
      close: this.makeIthClose(i),
      controlEl: this.state.dialogStates[i].controlEl,
      setControlElement: this.makeIthSetControlElement(i),
    }));

    return this.props.render(dialogs);
  }
}

export type WithDialogsProps = { dialogs: DialogProps[] };

interface WithDialogsParams {
  dialogsCount: number;
}

export const withDialogs = <P extends {}>({ dialogsCount }: WithDialogsParams) => (
  Component: React.ComponentType<WithDialogsProps & P>,
): React.StatelessComponent<P> => {
  return (props: P) => (
    <DialogsManager
      dialogsCount={dialogsCount}
      render={dialogsProps => <Component {...props} dialogs={dialogsProps} />}
    />
  );
};
