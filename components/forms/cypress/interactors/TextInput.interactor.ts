import FormFieldInteractor from './FormField.interactor';

class TextInputInteractor extends FormFieldInteractor {
  type(value: string, options?: Partial<Cypress.TypeOptions>) {
    return this.getHtml().type(value, options);
  }

  clear(options?: Partial<Cypress.ClearOptions>) {
    return this.getHtml().clear(options);
  }
}

export default TextInputInteractor;
