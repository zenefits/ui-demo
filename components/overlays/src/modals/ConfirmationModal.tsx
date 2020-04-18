import React, { Component } from 'react';

import { TextBlock } from 'zbase';

import ActionModal, { ActionModalProps } from './ActionModal';

export type ConfirmationModalProps = ActionModalProps & {
  /** Content for the body of the modal (`Modal.Body`). */
  content: React.ReactNode;
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
    size: 'small',
  };

  render() {
    const { content, submitActionText, onSubmit, ...modalProps } = this.props;
    const button = { text: submitActionText, onClick: onSubmit, inProgress: modalProps.isSubmitting };
    return (
      <ActionModal buttons={[button]} {...modalProps}>
        <TextBlock color="text.default" textAlign="left">
          {content}
        </TextBlock>
      </ActionModal>
    );
  }
}

export default ConfirmationModal;
