import { RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

class FormSearchSelectInteractor {
  wrapper: RenderResult;

  constructor(wrapper: RenderResult) {
    this.wrapper = wrapper;
  }

  isExpanded = () => expect(this.wrapper.queryAllByLabelText('Edit search field')).toHaveLength(0);

  isCollapsed = () => this.wrapper.queryAllByLabelText('Edit search field');

  expand = () => userEvent.click(this.wrapper.getByLabelText('Edit search field'));

  isDropdownOpen = () => expect(this.wrapper.container.querySelector('[data-optionlabel]')).toBeTruthy();

  isDropdownClosed = () => expect(this.wrapper.container.querySelector('[data-optionlabel]')).toBeFalsy();

  getInput = () => this.wrapper.getByTestId('search-select-input');

  getOption = (optionText: string) => this.wrapper.container.querySelector(`[data-optionlabel=${optionText}]`);
}

export default FormSearchSelectInteractor;
