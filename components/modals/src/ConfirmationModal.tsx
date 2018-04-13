import React, { StatelessComponent } from 'react';

import { P } from 'zbase';

import Modal from './Modal';

type ConfirmationModalProps = {
  isVisible: boolean;
  title: string;
  content: string;
  submitActionText?: string;
  controlEl?: HTMLElement;

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
    <P color="grayscale.d">{content}</P>
  </Modal>
);

ConfirmationModal.defaultProps = { submitActionText: 'Submit' };

export default ConfirmationModal;
