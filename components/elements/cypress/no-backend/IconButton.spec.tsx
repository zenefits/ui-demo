import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import IconButton from '../../src/action/icon-button/IconButton';

describe('LinkButton', () => {
  it('includes optional label', () => {
    mount(
      <>
        <IconButton iconName="download">Click Me</IconButton>
        <IconButton iconName="edit" />
      </>,
    );
    cy.findAllByRole('button').should('have.length', 2);
    cy.findByText('Click Me');
    cy.findByLabelText('Edit'); // common icons have a default aria-label
  });

  it('supports data-testid and aria-label', () => {
    mount(
      <>
        <IconButton iconName="delete" />
        <IconButton iconName="delete" aria-label="Purge all" data-testid="purge-button" />
      </>,
    );
    cy.findByTestId('purge-button');
    cy.findByLabelText('Delete');
    cy.findByLabelText('Purge all');
  });

  it('can focus with tab and trigger', () => {
    mount(<IconButton iconName="download">Export</IconButton>);
    cy.findByRole('button').focus();
    cy.focused().should('have.text', 'Export');
  });

  it('should trigger onClick only when not disabled', () => {
    const exportOnClick = cy.stub();
    const downloadOnClick = cy.stub();
    mount(
      <>
        <IconButton iconName="download" onClick={exportOnClick}>
          Export
        </IconButton>
        <IconButton disabled iconName="download" onClick={downloadOnClick}>
          Download
        </IconButton>
      </>,
    );
    cy.findByText('Export')
      .click()
      .then(() => {
        expect(exportOnClick).to.be.called;
      });

    cy.findByText('Download')
      .click()
      .then(() => {
        expect(downloadOnClick).to.not.be.called;
      });
  });
});
