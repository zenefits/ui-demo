import React from 'react';

import { Button } from 'z-frontend-elements';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import SearchInput from './SearchInputDeprecated';

const combobox = 'input[role="combobox"]';

describe('SearchInput', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<SearchInput />)).toHaveLength(1);
  });

  it('should render input when the button is clicked', () => {
    const wrapper = mountWithTheme(<SearchInput />);
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(combobox).length).toBe(0);

    wrapper.find(Button).simulate('click');
    expect(wrapper.find(Button).length).toBe(0);
    expect(wrapper.find(combobox).length).toBe(1);
  });
});
