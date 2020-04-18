import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import ActionModal, { ActionModalProps } from '../../src/modals/ActionModal';

type ActionModalExampleProps = {
  modalProps?: Partial<ActionModalProps>;
  actions?: {
    close?: () => void;
    action1?: () => void;
    action2?: () => void;
  };
};

class ActionModalExample extends React.Component<ActionModalExampleProps> {
  render() {
    const actions = {
      close: () => {},
      action1: () => {},
      action2: () => {},
      ...(this.props.actions || {}),
    };

    const modalProps: ActionModalProps = {
      title: 'Example title',
      isVisible: true,
      ...this.props.modalProps,
      buttons: [
        { text: 'Action 1', onClick: actions.action2 },
        {
          text: 'Action 2',
          onClick: actions.action1,
          inProgress: this.props.modalProps && this.props.modalProps.isSubmitting,
        },
      ],
      onCancel: actions.close,
    };

    return <ActionModal {...modalProps}>{this.props.children}</ActionModal>;
  }
}

describe('ActionModal', () => {
  it('buttons should fire actions', () => {
    const action1 = cy.stub();
    const action2 = cy.stub();
    const close = cy.stub();

    mount(
      <ActionModalExample
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
      <ActionModalExample
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
});
