import React, { Component } from 'react';
// @ts-ignore
import { action } from '@storybook/addon-actions';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import SimpleModalWithDialog from './exampleConfirmation';
import DialogManager from '../dialog/DialogManager';
import ConfirmationModal from './ConfirmationModal';

class ConfirmationModalOpen extends Component {
  render() {
    return (
      <DialogManager
        openByDefault // for visual regression testing
        render={dialog => {
          const modalProps = {
            title: 'Submit Claim',
            content: 'Please confirm that you have read this.',
            submitActionText: 'Confirm',
          };
          return (
            <Box>
              <ConfirmationModal
                {...modalProps}
                onSubmit={() => {
                  action('form submitted')();
                  dialog.close();
                }}
                onCancel={dialog.close}
                isVisible={dialog.isVisible}
                controlEl={dialog.controlEl}
              />
            </Box>
          );
        }}
      />
    );
  }
}

storiesOf('overlays|ConfirmationModal', module)
  .add('basic', () => <SimpleModalWithDialog />)
  .add('open by default', () => <ConfirmationModalOpen />);
