import React, { StatelessComponent } from 'react';
import Text from 'z-frontend-theme/src/Text';
import Modal from './Modal';

declare type ConfirmationModalProps = {
  isVisible: boolean;
  title: string;
  content: string;
  submitActionText?: string;
  onCancel: () => void;
  onSubmit: (e) => void;
};

const ConfirmationModal: StatelessComponent<ConfirmationModalProps> = ({
  content,
  submitActionText,
  onSubmit,
  ...rest
}) => (
  <Modal buttons={[{ text: submitActionText, onClick: onSubmit }]} {...rest}>
    <Text color="grayscale.d">{content}</Text>
  </Modal>
);

ConfirmationModal.defaultProps = { submitActionText: 'Submit' };

export default ConfirmationModal;
