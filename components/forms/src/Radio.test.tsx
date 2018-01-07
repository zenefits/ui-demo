import React from 'react';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import Radio from './Radio';

describe('Radio', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Radio />).find('Radio')).toHaveLength(1);
  });

  it('should include a label', () => {
    const rendered = renderWithTheme(<Radio label="Label" />);
    expect(rendered.text().trim()).toBe('Label');
  });

  it('should invoke callback on change', () => {
    const onRadioChange = jest.fn();
    const wrapper = mountWithTheme(<Radio onChange={onRadioChange} />);
    wrapper.find('input').simulate('change');
    expect(onRadioChange).toBeCalled();
    expect(onRadioChange.mock.calls[0][0]).toBeTruthy();
  });
});
