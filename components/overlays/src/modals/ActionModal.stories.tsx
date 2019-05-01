import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';

import { storiesOf } from '../../.storybook/storyHelpers';
import { withDialog, DialogManager, WithDialogProps } from '../dialog/DialogManager';
import { withDialogs, WithDialogsProps } from '../dialog/DialogsManager';
import ActionModal from './ActionModal';
import ActionModalUsingRenderProps from './exampleAction';

class ActionModalForm extends Component<WithDialogProps> {
  render() {
    const { dialog } = this.props;
    const modalProps = {
      title: 'Submit claim',
      buttons: [
        { text: 'Action 1', onClick: action('Action 1 fired'), inProgress: true },
        { text: 'Action 2', onClick: action('Action 2 fired') },
      ],
      onCancel: dialog.close,
      isVisible: dialog.isVisible,
      controlEl: dialog.controlEl,
    };

    return (
      <Box>
        <ActionModal {...modalProps}>Modal Content</ActionModal>
        <Button onClick={dialog.open}>Show modal</Button>
      </Box>
    );
  }
}

let renderCount = 0;
class ActionModalWithUpdateBlocking extends Component {
  render() {
    return (
      <DialogManager
        render={dialog => {
          const modalProps = {
            title: 'Modal Title',
            onCancel: dialog.close,
            isVisible: dialog.isVisible,
            controlEl: dialog.controlEl,
          };

          // This is just for demonstration.  NEVER MANAGE STATE LIKE THIS
          renderCount += 1;
          return (
            <Box>
              <ActionModal {...modalProps}>Modal Content</ActionModal>
              <Button onClick={dialog.open}>Show modal</Button>
              <Box>This text has been rendered {renderCount} times.</Box>
              <dialog.IgnoreDialogUpdates>
                This text has been rendered {renderCount} times (updates ignored).
              </dialog.IgnoreDialogUpdates>
            </Box>
          );
        }}
      />
    );
  }
}

class MultipleActionModalsForm extends Component<WithDialogsProps> {
  render() {
    const {
      dialogs: [dialog1, dialog2, dialog3],
    } = this.props;
    const modalProps = {
      title: 'Submit claim',
      buttons: [
        { text: 'Action 1', onClick: action('Action 1 fired') },
        { text: 'Action 2', onClick: action('Action 2 fired') },
      ],
    };

    return (
      <Box>
        <ActionModal
          {...modalProps}
          onCancel={dialog1.close}
          isVisible={dialog1.isVisible}
          controlEl={dialog1.controlEl}
        >
          I am Modal 1
        </ActionModal>
        <ActionModal
          {...modalProps}
          onCancel={dialog2.close}
          isVisible={dialog2.isVisible}
          controlEl={dialog2.controlEl}
        >
          I am Modal 2
        </ActionModal>
        <ActionModal
          {...modalProps}
          onCancel={dialog3.close}
          isVisible={dialog3.isVisible}
          controlEl={dialog3.controlEl}
        >
          I am Modal 3
        </ActionModal>

        <Button onClick={dialog1.open} mr={2}>
          Show modal 1
        </Button>
        <Button onClick={dialog2.open} mr={2}>
          Show modal 2
        </Button>
        <Button onClick={dialog3.open}>Show modal 3</Button>
      </Box>
    );
  }
}

class ActionModalOpen extends Component {
  render() {
    return (
      <DialogManager
        openByDefault // for visual regression testing
        render={dialog => {
          const modalProps = {
            title: 'Modal Title',
            buttons: [{ text: 'Primary', onClick: action('Primary button clicked') }],
            onCancel: dialog.close,
            isVisible: dialog.isVisible,
            controlEl: dialog.controlEl,
          };
          return <ActionModal {...modalProps}>I am an action modal.</ActionModal>;
        }}
      />
    );
  }
}

// examples using HoC (using `DialogManager` is often more convenient)
const ActionModalFormWithDialog = withDialog<{}>()(ActionModalForm);
const ActionModalsFormWithDialogs = withDialogs<{}>({ dialogsCount: 3, openByDefault: [] })(MultipleActionModalsForm);

storiesOf('overlays|ActionModal', module)
  .add('default', ActionModalFormWithDialog)
  .add('using render props', ActionModalUsingRenderProps)
  .add('using render props and ignore updates', () => <ActionModalWithUpdateBlocking />)
  .add('multiple modals', ActionModalsFormWithDialogs)
  .add('open by default', () => <ActionModalOpen />);
