import React from 'react';
import { cleanup, fireEvent, RenderResult } from 'react-testing-library';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { employeeData, DefaultFilterExample } from './DataFilter.stories';

function getResults(wrapper: RenderResult) {
  return wrapper.getAllByTestId('filter-result').map((elem: HTMLElement) => elem.textContent);
}

describe('DataFilter', () => {
  afterEach(cleanup);

  it('no initial filters', () => {
    const wrapper = renderWithContext(<DefaultFilterExample />);

    expect(getResults(wrapper)).toEqual(['Morley Vin', 'Dave Caf', 'Stephanie Caf', 'Sam Caf']);
  });

  describe('DataFilter.Text', () => {
    it('filters', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      const input = wrapper.getByLabelText('Name');
      (input as any).value = 'Morley';
      fireEvent.change(input);

      expect(getResults(wrapper)).toEqual(['Morley Vin']);
    });
  });

  describe('DataFilter.CheckboxGroup', () => {
    it('shows checkbox for each department', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);
      wrapper.getByText('Department');
      expect(getResults(wrapper).length).toBe(employeeData.length);
    });

    it('filters', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      const checkbox = wrapper.getByLabelText('Marketing');
      fireEvent.click(checkbox);

      expect(getResults(wrapper)).toEqual(['Stephanie Caf', 'Sam Caf']);
    });

    it('matches any (union, not intersection)', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      fireEvent.click(wrapper.getByLabelText('Marketing'));
      fireEvent.click(wrapper.getByLabelText('Recruiting'));

      expect(getResults(wrapper)).toEqual(['Morley Vin', 'Stephanie Caf', 'Sam Caf']);
    });
  });

  describe('DataFilter.DateRange', () => {
    it('filters', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      const input = wrapper.getByLabelText('Hired Before');
      (input as any).value = '03/01/2019';
      fireEvent.change(input);

      expect(getResults(wrapper)).toEqual(['Morley Vin']);
    });
  });
});
