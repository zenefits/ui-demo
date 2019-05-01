import React from 'react';

import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';

import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Checkbox />)).toHaveLength(1);
  });

  it('should include a label', () => {
    const rendered = renderWithTheme(<Checkbox label="Label" />);
    expect(rendered.text()).toBe('Label');
  });

  it('should support standard attributes', () => {
    const rendered = renderWithTheme(<Checkbox disabled checked />);
    expect(rendered.find('[disabled]')).toHaveLength(1);
    expect(rendered.find('[checked]')).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onCheckboxChange = jest.fn();
    const wrapper = mountWithTheme(<Checkbox onChange={onCheckboxChange} />);
    wrapper.find('input').simulate('change');
    expect(onCheckboxChange).toBeCalled();
    expect(onCheckboxChange.mock.calls[0][0]).toBeTruthy();
  });
});
