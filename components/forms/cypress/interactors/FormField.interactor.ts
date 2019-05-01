import { Page } from 'z-frontend-cypress/page';

class FormFieldInteractor extends Page {
  constructor(text: string) {
    super(text, 'getByLabelText');
  }

  // TODO: just use should? (retry, better assertion in runner)
  hasError(): Cypress.Chainable<boolean> {
    cy.log(`${this.selector} hasError?`);
    return this.getHtml().then(($input: any) => {
      const errorId = $input.attr('aria-describedby');
      const errorDivs = Cypress.$(`#${errorId}`);
      return errorDivs.length > 0;
    });
  }

  isDisabled(): Cypress.Chainable<boolean> {
    return this.getHtml().should('be.disabled');
  }
}

export default FormFieldInteractor;
