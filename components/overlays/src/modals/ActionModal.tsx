import React, { Component } from 'react';

import Modal, { ModalFooterActionProps, ModalProps } from './Modal';

export type ActionModalProps = ModalProps & ModalFooterActionProps;

class ActionModal extends Component<ActionModalProps> {
  static defaultProps: Partial<ActionModalProps> = {
    buttons: [],
    keepMounted: false,
    omitCancelButton: false,
    size: 'medium',
  };

  render() {
    const { buttons, omitCancelButton, children, ...modalProps } = this.props;
    return (
      <Modal {...modalProps}>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer
          buttons={buttons}
          omitCancelButton={omitCancelButton}
          onCancel={modalProps.onCancel}
          isSubmitting={modalProps.isSubmitting}
        />
      </Modal>
    );
  }
}

export default ActionModal;
