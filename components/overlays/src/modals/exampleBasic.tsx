import React from 'react';

import { Box } from 'zbase';
import { Button } from 'z-frontend-elements';

import { DialogManager } from '../dialog/DialogManager';
import Modal from './Modal';

export default () => (
  <DialogManager
    render={({ open, close, isVisible, controlEl }) => {
      const modalProps = {
        isVisible,
        controlEl,
        title: 'Submit claim',
        onCancel: close,
      };

      return (
        <Box>
          <Modal {...modalProps}>
            <Modal.Body>Basic Modal Content</Modal.Body>
          </Modal>
          <Button onClick={open}>Show modal</Button>
        </Box>
      );
    }}
  />
);
