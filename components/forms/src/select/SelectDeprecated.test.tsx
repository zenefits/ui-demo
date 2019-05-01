import React from 'react';
import { shallow } from 'enzyme';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import SelectDeprecated, { StyledSelect } from './SelectDeprecated';

const combobox = 'input[role="combobox"]';

describe('Select', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<SelectDeprecated />).find(combobox)).toHaveLength(1);
  });

  // NOTE: would prefer to use toHaveStyleRule here, but cannot get it working for Select
  it('should mount with size specified', () => {
    const wrapper = shallow(<SelectDeprecated s="large" />);
    const componentProps = wrapper.find(StyledSelect).props();
    expect(componentProps).toHaveProperty('s', 'large');
  });

  it('should default to size medium', () => {
    const wrapper = shallow(<SelectDeprecated />);
    const componentProps = wrapper.find(StyledSelect).props();
    expect(componentProps).toHaveProperty('s', 'medium');
  });

  it('should support standard select attributes', () => {
    const wrapper = shallow(<SelectDeprecated autoComplete="off" placeholder="Placeholder" />);
    const componentProps = wrapper.find(StyledSelect).props();
    expect(componentProps).toHaveProperty('autoComplete', 'off');
    expect(componentProps).toHaveProperty('placeholder', 'Placeholder');
  });

  it('should invoke callback on change', () => {
    const onChange = jest.fn();
    // NOTE: does not work reliably with mount(), but shallow is fine
    // https://github.com/airbnb/enzyme/issues/400
    const wrapper = shallow(<SelectDeprecated onChange={onChange} />);
    wrapper.find(StyledSelect).simulate('change');
    expect(onChange).toBeCalled();
  });
});
