import React from 'react';

import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import CustomTileInput from './CustomTileInput';

describe('CustomTileInput', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<CustomTileInput />)).toHaveLength(1);
  });

  it('should invoke callback on change', () => {
    const onCustomTileInputChange = jest.fn();
    const wrapper = mountEnzymeWithTheme(<CustomTileInput onChange={onCustomTileInputChange} />);
    wrapper.find('input').simulate('change');
    expect(onCustomTileInputChange).toBeCalled();
    expect(onCustomTileInputChange.mock.calls[0][0]).toBeTruthy();
  });

  it('should support standard attributes', () => {
    const rendered = renderEnzymeWithTheme(<CustomTileInput disabled checked />);
    expect(rendered.find('[disabled]')).toHaveLength(1);
    expect(rendered.find('[checked]')).toHaveLength(1);
  });
});
