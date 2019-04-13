import React, { Component } from 'react';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';

import { withDialog, WithDialogProps } from '../dialog/DialogManager';
import ConfirmationModal from './ConfirmationModal';

class SimpleModalContainer extends Component<WithDialogProps> {
  render() {
    const { dialog } = this.props;
    const modalProps = {
      title: 'Submit claim',
      content: 'Please confirm that you have read this.',
      submitActionText: 'Confirm',
      onSubmit: () => {
        console.log('Form submitted');
        dialog.close();
      },
      // TODO: these props used to be in JSX, but I moved them here just because use compiler issues with styleguidist (Worked great with styled-components)
      // It feels wront that this is pushing us to write the code in a way that we wouldn't normally do it and may even
      // go against our coding conventions
      isVisible: dialog.isVisible,
      onCancel: dialog.close,
      controlEl: dialog.controlEl,
    };

    return (
      <Box>
        <ConfirmationModal {...modalProps} />
        <Button onClick={dialog.open}>Show modal</Button>
      </Box>
    );
  }
}

// TODO: change this to move away from hoc?
const ModalWithDialog = withDialog()(SimpleModalContainer);
// for storybook source
ModalWithDialog.displayName = 'ModalWithDialog';
export default () => <ModalWithDialog />;
