import React from 'react';
import { cleanup, fireEvent, RenderResult } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { employeeData, DefaultFilterExample } from './DataFilter.stories';

function getResults(wrapper: RenderResult) {
  return wrapper.queryAllByTestId('filter-result').map((elem: HTMLElement) => elem.textContent);
}

describe('DataFilter', () => {
  afterEach(cleanup);

  it('no initial filters', () => {
    const wrapper = renderWithContext(<DefaultFilterExample />);

    expect(getResults(wrapper)).toEqual(['Morley Vin', 'Dave Caf', 'Stephanie Caf', 'Sam Caf', 'n/a']);
  });

  describe('DataFilter.Text', () => {
    it('filters', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      const input = wrapper.getByLabelText('Name') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'Morley' } });

      expect(getResults(wrapper)).toEqual(['Morley Vin']);
    });

    it('handles no results', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      const input = wrapper.getByLabelText('Name') as HTMLInputElement;
      fireEvent.change(input, { target: { value: 'asdfasdf' } });

      expect(getResults(wrapper)).toHaveLength(0);
    });
  });

  describe('DataFilter.CheckboxGroup', () => {
    it('shows checkbox for each department', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);
      wrapper.getByText('Department');
      expect(getResults(wrapper).length).toBe(employeeData.length);
    });

    it('selecting all does not include empty values', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      fireEvent.click(wrapper.getByLabelText('Marketing'));
      fireEvent.click(wrapper.getByLabelText('Recruiting'));
      fireEvent.click(wrapper.getByLabelText('Competitor Analysis & Management'));

      // Dave has empty departmentName, so is not included
      expect(getResults(wrapper)).toEqual(['Morley Vin', 'Stephanie Caf', 'Sam Caf', 'n/a']);
    });

    it('filters', () => {
      const wrapper = renderWithContext(<DefaultFilterExample />);

      fireEvent.click(wrapper.getByLabelText('Marketing'));

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

      const input = wrapper.getByLabelText('Hired Before') as HTMLInputElement;
      fireEvent.change(input, { target: { value: '03/01/2019' } });

      expect(getResults(wrapper)).toEqual(['Morley Vin']);
    });
  });

  describe('DataFilter.MultiSelect', () => {
    xit('filters', () => {
      // const wrapper = renderWithContext(<DefaultFilterExample />);
      // TODO: multiselect isn't accessible... there's no actual input
      // const input = wrapper.getByLabelText('Location') as HTMLInputElement;
      // fireEvent.change(input, { target: { value: 'California' } });
    });

    it('initial filter', () => {
      const wrapper = renderWithContext(
        <DefaultFilterExample
          initialFilter={{
            location: {
              matchAny: ['New York'],
            },
          }}
        />,
      );

      // control shows what's filtered
      const pills = wrapper.getAllByTestId('MultiSelectControl-Pill');
      const textContent = pills.map(pill => pill.textContent);
      expect(textContent).toEqual(['New York']);

      // results match, too
      expect(getResults(wrapper)).toEqual(['Stephanie Caf', 'Sam Caf']);
    });
  });
});
