import FormFieldInteractor from './FormField.interactor';

class CheckboxInteractor extends FormFieldInteractor {
  isChecked(): Cypress.Chainable<any> {
    return this.getHtml().should('be.checked');
  }

  isUnchecked(): Cypress.Chainable<any> {
    return this.getHtml().should('not.be.checked');
  }

  isDisabled(): Cypress.Chainable<any> {
    return this.getHtml().should('be.disabled');
  }

  isNotDisabled(): Cypress.Chainable<any> {
    return this.getHtml().should('not.be.disabled');
  }

  check(options?: Partial<Cypress.CheckOptions>): Cypress.Chainable<any> {
    return this.getHtml().check(options);
  }

  uncheck(options?: Partial<Cypress.CheckOptions>): Cypress.Chainable<any> {
    return this.getHtml().uncheck(options);
  }
}

export default CheckboxInteractor;
