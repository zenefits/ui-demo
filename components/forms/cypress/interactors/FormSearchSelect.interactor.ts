import { Page } from 'z-frontend-cypress/page';

import { getLabelId } from '../../src/formik/FormFieldWrapper';

class FormSearchSelectInteractor extends Page {
  label: string;

  constructor(name: string, label: string) {
    super(`[role=combobox][aria-labelledby=${getLabelId(name)}]`, 'get');
    this.label = label;
  }

  isExpanded = () =>
    this.getHtml()
      .findByLabelText('Edit search field')
      .should('not.exist');

  isCollapsed = () => this.getHtml().findByLabelText('Edit search field');

  expand = () =>
    this.getHtml()
      .findByLabelText('Edit search field')
      .click();

  isDropdownOpen = () => this.getHtml().find('[data-optionlabel]');

  isDropdownClosed = () =>
    this.getHtml()
      .find('[data-optionlabel]')
      .should('not.exist');

  getInput = () => this.getHtml().get('input');

  getOption = (optionText: string) => this.getHtml().get(`[data-optionlabel=${optionText}]`);
}

export default FormSearchSelectInteractor;
