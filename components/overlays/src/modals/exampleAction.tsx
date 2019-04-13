import React from 'react';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';

import { DialogManager } from '../dialog/DialogManager';
import ActionModal from './ActionModal';

export default () => (
  <DialogManager
    render={dialog => {
      const modalProps = {
        title: 'Modal Title',
        onCancel: dialog.close,
        isVisible: dialog.isVisible,
        controlEl: dialog.controlEl,
      };

      return (
        <Box>
          <ActionModal {...modalProps}>Add a form here</ActionModal>
          <Button onClick={dialog.open}>Show modal</Button>
        </Box>
      );
    }}
  />
);
