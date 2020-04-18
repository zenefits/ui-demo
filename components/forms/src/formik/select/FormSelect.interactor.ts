import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

class FormSelectInteractor {
  wrapper: RenderResult;
  label: string;

  constructor(wrapper: RenderResult, label: string) {
    this.wrapper = wrapper;
    this.label = label;
  }

  isOpen = () => this.getInput();

  isClosed = () => expect(this.wrapper.queryAllByTestId('select-input')).toHaveLength(0);

  getControl() {
    return this.wrapper.getByLabelText(`Click or press enter to edit ${this.label}`);
  }

  open() {
    return userEvent.click(this.getControl());
  }

  isDisabled() {
    return expect(this.wrapper.container).toBeDisabled();
  }

  isExpanded = () => expect(this.wrapper.queryAllByLabelText('Edit search field')).toHaveLength(0);

  isCollapsed = () => this.wrapper.queryAllByLabelText('Edit search field');

  getInput = () => this.wrapper.getByTestId('select-input');

  getOption = (optionText: string) => this.wrapper.container.querySelector(`[data-optionlabel=${optionText}]`);

  getClearButton = () => this.wrapper.findByLabelText('Close');

  hasError = () => this.wrapper.findByRole('alert');
}

export default FormSelectInteractor;
