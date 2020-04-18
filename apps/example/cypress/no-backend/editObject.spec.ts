import { mockGraphqlFromSchema } from 'z-frontend-cypress/utils';

import schema from '../../schema/schema.generated.graphql';
import EditObjectPage from './EditObjectPage';

describe('Edit Object Page', () => {
  beforeEach(() => {
    mockGraphqlFromSchema(schema);
  });

  it('shows existing object', () => {
    const editPage = new EditObjectPage();
    editPage.visitExisting();
    editPage.getTitle().contains('Edit Object');

    editPage.getNameInput().should('have.value', 'Compass');
    editPage
      .getSizeRadioGroup()
      .find(':checked')
      .should('have.value', 'Small');
    editPage.getCategorySelect().should('have.value', 'Navigation');

    // NOTE: checkbox group selection is tricky with page objects
    cy.findByLabelText('Asia').should('be.checked');
    cy.findByLabelText('Europe').should('be.checked');
  });

  it('creates new object', () => {
    const editPage = new EditObjectPage();
    editPage.visitNew();
    editPage.getTitle().contains('Create a New Object');

    editPage.getSubmitButton().click();
    editPage.getValidationErrors().should('have.length.greaterThan', 0);

    editPage.getNameInput().type('Computer');
    editPage.getSubmitButton().click();

    cy.hash().should('equal', '#/objects');
    cy.findByText('Computer');
  });
});
