import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import ConfirmationModal, { ConfirmationModalProps } from '../../src/modals/ConfirmationModal';

class ConfirmationModalExample extends React.Component<Partial<ConfirmationModalProps>> {
  render() {
    const propsWithDefaults = {
      title: 'Example title',
      content: 'Example content',
      submitActionText: 'Confirm',
      isVisible: true,
      onCancel: () => {},
      onSubmit: () => {},
      ...this.props,
    };
    return <ConfirmationModal {...propsWithDefaults} />;
  }
}

describe('ConfirmationModal', () => {
  it('buttons should fire actions', () => {
    const confirm = cy.stub();
    const close = cy.stub();

    mount(<ConfirmationModalExample onCancel={close} onSubmit={confirm} />);

    cy.findByText('Confirm').click();
    cy.findByText('Cancel')
      .click()
      .then(() => {
        expect(confirm).to.be.called;
        expect(close).to.be.called;
      });
  });

  it('buttons should be disabled if isSubmitting prop is passed', () => {
    const close = cy.stub();
    mount(<ConfirmationModalExample onCancel={close} isSubmitting />);

    cy.findByText('Confirm').should('not.be.visible');
    cy.findByText('Cancel')
      .click()
      .then(() => {
        expect(close).to.not.be.called;
      });
  });
});
