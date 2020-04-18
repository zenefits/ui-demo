import React from 'react';
import { cleanup, fireEvent, RenderResult } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { DefaultFilterPanelExample } from './DataFilterPanel.stories';

describe('DataFilterPanel', () => {
  afterEach(cleanup);

  it('resets inputs and results', () => {
    const wrapper = renderWithContext(<DefaultFilterPanelExample />);

    const nameInput = updateInput(wrapper, 'Name', 'Caf');
    const beforeInput = updateInput(wrapper, 'Hired Before', '03/21/2019');
    const checkbox = clickCheckbox(wrapper, 'Marketing');
    expect(getResults(wrapper)).toEqual(['Stephanie Caf']); // filtered

    const resetButton = wrapper.getByText('Reset');
    fireEvent.click(resetButton);
    // inputs themselves are reset
    expect(nameInput.value).toBe('');
    expect(checkbox.checked).toBe(false);
    expect(beforeInput.value).toBe('');
    // results are also reset
    expect(getResults(wrapper)).toEqual(['Morley Vin', 'Dave Caf', 'Stephanie Caf', 'Sam Caf', 'n/a']);
  });
});

function getResults(wrapper: RenderResult) {
  return wrapper.getAllByTestId('filter-result').map((elem: HTMLElement) => elem.textContent);
}

function updateInput(wrapper: RenderResult, label: string, newValue: string) {
  const input = wrapper.getByLabelText(label) as HTMLInputElement;
  fireEvent.change(input, { target: { value: newValue } });
  return input;
}

function clickCheckbox(wrapper: RenderResult, label: string) {
  const checkbox = wrapper.getByLabelText(label) as HTMLInputElement;
  fireEvent.click(checkbox);
  return checkbox;
}
