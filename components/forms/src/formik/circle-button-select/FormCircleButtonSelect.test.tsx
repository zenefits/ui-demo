import React from 'react';
import { range } from 'lodash';
import { cleanup } from 'react-testing-library';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { CheckboxExample, DisabledExample, RadioExample } from './FormCircleButtonSelect.stories';

describe('Form.CircleButtonSelect', () => {
  afterEach(cleanup);

  function assertCorrectIndicesSelected(indices: number[], elArray: HTMLElement[]) {
    elArray.forEach((el, index) => {
      expect(el.getAttribute('aria-checked')).toBe(indices.includes(index) ? 'true' : 'false');
    });
  }

  it('renders all subcomponents correctly', () => {
    const wrapper = renderWithContext(<CheckboxExample />);
    wrapper.getByText('Numbers');
    range(5).forEach(i => {
      wrapper.getByText(i.toString());
    });
  });

  it('works as checkbox', () => {
    const wrapper = renderWithContext(<CheckboxExample />);
    const buttons = range(5).map(index => wrapper.getByText(index.toString()));
    assertCorrectIndicesSelected([2], buttons);
    wrapper.getByText('3').click();
    assertCorrectIndicesSelected([2, 3], buttons);
    wrapper.getByText('2').click();
    assertCorrectIndicesSelected([3], buttons);
  });

  it('works as radio', () => {
    const wrapper = renderWithContext(<RadioExample />);
    const buttons = range(5).map(index => wrapper.getByText(index.toString()));
    assertCorrectIndicesSelected([3], buttons);
    wrapper.getByText('2').click();
    assertCorrectIndicesSelected([2], buttons);
    wrapper.getByText('2').click();
    assertCorrectIndicesSelected([2], buttons);
  });

  it('can be disabled', () => {
    const wrapper = renderWithContext(<DisabledExample />);
    const buttons = range(5).map(index => wrapper.getByText(index.toString()));
    assertCorrectIndicesSelected([2], buttons);
    wrapper.getByText('3').click();
    assertCorrectIndicesSelected([2], buttons);
  });
});
