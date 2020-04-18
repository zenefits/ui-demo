import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import { Button } from 'z-frontend-elements';

import Modal, { ModalProps } from '../../src/modals/Modal';
import DialogManager from '../../src/dialog/DialogManager';

type ModalExampleProps = {
  modalProps?: Partial<ModalProps>;
  content?: string;
  actions?: {
    close?: () => void;
    action1?: () => void;
    action2?: () => void;
  };
};

class ModalExample extends React.Component<ModalExampleProps> {
  render() {
    const actions = {
      close: () => {},
      action1: () => {},
      action2: () => {},
      ...(this.props.actions || {}),
    };

    const modalProps = {
      title: 'Modal Example',
      isVisible: true,
      ...this.props.modalProps,
      onCancel: actions.close,
    };

    const footerProps = {
      isSubmitting: modalProps.isSubmitting,
      buttons: [
        { text: 'Action 1', onClick: actions.action1 },
        { text: 'Action 2', onClick: actions.action2, inProgress: modalProps.isSubmitting },
      ],
      onCancel: actions.close,
    };

    return (
      <Modal {...modalProps}>
        <Modal.Body>{this.props.content || 'Hello World'}</Modal.Body>
        <Modal.Footer {...footerProps} />
      </Modal>
    );
  }
}

class ClosedModalExample extends React.Component<ModalExampleProps> {
  render() {
    return (
      <DialogManager
        render={({ open, close, isVisible, controlEl }) => {
          const modalProps = {
            isVisible,
            controlEl,
            title: 'Closed Modal Example',
            onCancel: close,
          };
          const footerProps = {
            buttons: [{ text: 'Action 1' }, { text: 'Action 2' }],
            onCancel: close,
          };
          return (
            <>
              <Modal {...modalProps}>
                <Modal.Body>Hello World</Modal.Body>
                <Modal.Footer {...footerProps} />
              </Modal>
              <Button onClick={open}>Open Modal</Button>
            </>
          );
        }}
      />
    );
  }
}

describe('Modal', () => {
  it('buttons should fire actions', () => {
    const action1 = cy.stub();
    const action2 = cy.stub();
    const close = cy.stub();

    mount(
      <ModalExample
        actions={{
          action1,
          action2,
          close,
        }}
      />,
    );

    cy.findByText('Action 1').click();
    cy.findByText('Action 2').click();
    cy.findByText('Cancel')
      .click()
      .then(() => {
        expect(action1).to.be.called;
        expect(action2).to.be.called;
        expect(close).to.be.called;
      });
  });

  it('buttons should be disabled if isSubmitting prop is passed', () => {
    const action1 = cy.stub();
    const action2 = cy.stub();
    const close = cy.stub();

    mount(
      <ModalExample
        modalProps={{
          isSubmitting: true,
        }}
        actions={{
          action1,
          action2,
          close,
        }}
      />,
    );

    cy.findByText('Action 2').should('not.be.visible');
    cy.findByText('Action 1').click();
    cy.findByText('Cancel')
      .click()
      .then(() => {
        expect(action1).to.not.be.called;
        expect(action2).to.not.be.called;
      });
  });

  it('sends focus to modal heading', () => {
    mount(<ClosedModalExample />);

    cy.findByText('Open Modal').click();
    cy.focused().should('have.text', 'Closed Modal Example');
  });
});
