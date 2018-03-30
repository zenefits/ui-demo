import React, { Component } from 'react';
import { Box } from 'zbase';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from './Modal';
import { withDialog, WithDialogProps } from './DialogManager';
import { withDialogs, WithDialogsProps } from './DialogsManager';
import { Button } from 'z-frontend-forms';

class ModalForm extends Component<WithDialogProps> {
  render() {
    const { dialog } = this.props;
    const modalProps = {
      title: 'Submit claim',
      buttons: [
        { text: 'Action 1', onClick: action('Action 1 fired') },
        { text: 'Action 2', onClick: action('Action 2 fired') },
      ],
      onCancel: dialog.close,
      isVisible: dialog.isVisible,
      controlEl: dialog.controlEl,
    };

    return (
      <Box>
        <Modal {...modalProps}>Modal Content</Modal>
        <Button onClick={dialog.open}>Show modal</Button>
      </Box>
    );
  }
}

/*
class MountedModalForm extends Component<WithDialogProps> {
  render() {
    const { dialog } = this.props;
    const modalProps = {
      title: 'Submit claim',
      buttons: [
        { text: 'Action 1', onClick: action('Action 1 fired') },
        { text: 'Action 2', onClick: action('Action 2 fired') },
      ],
      onCancel: dialog.close,
      isVisible: dialog.isVisible,
      controlEl: dialog.controlEl,
      keepMounted: true,
    };

    return (
      <Box>
        <Modal {...modalProps}>Modal Content</Modal>
        <Button onClick={dialog.open}>Show modal</Button>
      </Box>
    );
  }
}
*/

class MultipleModalsForm extends Component<WithDialogsProps> {
  render() {
    const { dialogs: [dialog1, dialog2, dialog3] } = this.props;
    const modalProps = {
      title: 'Submit claim',
      buttons: [
        { text: 'Action 1', onClick: action('Action 1 fired') },
        { text: 'Action 2', onClick: action('Action 2 fired') },
      ],
    };

    return (
      <Box>
        <Modal {...modalProps} onCancel={dialog1.close} isVisible={dialog1.isVisible} controlEl={dialog1.controlEl}>
          I am Modal 1
        </Modal>

        <Modal {...modalProps} onCancel={dialog2.close} isVisible={dialog2.isVisible} controlEl={dialog2.controlEl}>
          I am Modal 2
        </Modal>

        <Modal {...modalProps} onCancel={dialog3.close} isVisible={dialog3.isVisible} controlEl={dialog3.controlEl}>
          I am Modal 3
        </Modal>

        <Button onClick={dialog1.open}>Show modal</Button>
        <Button onClick={dialog2.open}>Show modal</Button>
        <Button onClick={dialog3.open}>Show modal</Button>
      </Box>
    );
  }
}

const ModalFormWithDialog = withDialog<{}>()(ModalForm);
// const MountedModalFormWithDialog = withDialog<{}>()(MountedModalForm);
const ModalsFormWithDialogs = withDialogs<{}>({ dialogsCount: 3 })(MultipleModalsForm);

storiesOf('Modal', module).add('default', () => <ModalFormWithDialog />);
// storiesOf('Modal', module).add('always mounted', () => <MountedModalFormWithDialog />);
storiesOf('Modal', module).add('multiple modals', () => <ModalsFormWithDialogs />);
