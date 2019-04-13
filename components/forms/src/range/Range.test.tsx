import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import Range from './Range';

describe('Range', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Range />)).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onRangeChange = jest.fn();
    const wrapper = mountWithTheme(<Range onChange={onRangeChange} />);
    wrapper.find('input').simulate('change');
    expect(onRangeChange).toBeCalled();
    expect(onRangeChange.mock.calls[0][0]).toBeTruthy();
  });
});
