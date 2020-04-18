import { Page } from 'z-frontend-cypress/page';

import { getLabelId } from '../../src/formik/FormFieldWrapper';

class FormSelectInteractor extends Page {
  label: string;

  constructor(name: string, label: string) {
    super(`[role=combobox][aria-labelledby=${getLabelId(name)}]`, 'get');
    this.label = label;
  }

  isOpen = () => this.getInput().should('exist');

  isClosed = () => this.getInput().should('not.exist');

  getControl() {
    return this.getHtml().findByLabelText(`Click or press enter to edit ${this.label}`);
  }

  getInput = () => this.getHtml().get('input');

  getOption = (optionText: string) => this.getHtml().get(`[data-optionlabel=${optionText}]`);

  open() {
    return this.getControl().click();
  }

  isDisabled(): Cypress.Chainable<boolean> {
    return this.getHtml().should('be.disabled');
  }
}

export default FormSelectInteractor;
