import React from 'react';

import { mount } from 'z-frontend-theme/test-utils/cypress';

import LinkButton from '../../src/link-button/LinkButton';

describe('LinkButton', () => {
  it('includes text', () => {
    mount(<LinkButton>Click Me</LinkButton>);
    cy.findByText('Click Me');
    cy.findByRole('button');
  });

  it('supports data-testid and aria-label', () => {
    mount(
      <LinkButton aria-label="Export as PDF" data-testid="export-button">
        Export
      </LinkButton>,
    );
    cy.findByTestId('export-button');
    cy.findAllByLabelText('Export as PDF');
  });

  it('can focus with tab and trigger', () => {
    mount(<LinkButton>Export</LinkButton>);
    cy.findByRole('button').focus();
    cy.focused().should('have.text', 'Export');
  });

  it('should trigger onClick only when not disabled', () => {
    const exportOnClick = cy.stub();
    const downloadOnClick = cy.stub();
    mount(
      <>
        <LinkButton onClick={exportOnClick}>Export</LinkButton>
        <LinkButton disabled onClick={downloadOnClick}>
          Download
        </LinkButton>
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
