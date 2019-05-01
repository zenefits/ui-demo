import React, { Component } from 'react';

import { TextBlock } from 'zbase';

import ActionModal, { ActionModalProps } from './ActionModal';

type ConfirmationModalProps = ActionModalProps & {
  /** Content for the body of the modal (`Modal.Body`). */
  content: string;
  /**
   * Label for the primary button.
   * @default "Submit"
   */
  submitActionText?: string;
  /**
   * Action to take on submit.
   */
  onSubmit: (e: any) => void;
  isSubmitting?: boolean;
};

class ConfirmationModal extends Component<ConfirmationModalProps> {
  static defaultProps = {
    submitActionText: 'Submit',
    isSubmitting: false,
  };
  render() {
    const { content, submitActionText, onSubmit, isSubmitting, ...modalProps } = this.props;
    const button = { text: submitActionText, onClick: onSubmit, inProgress: isSubmitting };
    return (
      <ActionModal buttons={[button]} {...modalProps}>
        <TextBlock color="grayscale.d">{content}</TextBlock>
      </ActionModal>
    );
  }
}

export default ConfirmationModal;
