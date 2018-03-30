import React from 'react';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import Popover from './Popover';

describe('Popover', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Popover event="click" />).find('Popover')).toHaveLength(1);
  });

  it('should render the targetBody content', () => {
    const wrapper = mountWithTheme(<Popover event="click" targetBody={<h1>I am the target Body</h1>} />).find('Target');
    expect(wrapper.childAt(0).text()).toEqual('I am the target Body');
  });

  it('should render the Popover content', () => {
    const wrapper = mountWithTheme(
      <Popover event="click">
        <h1>I am the Popover</h1>
      </Popover>,
    ).find('Popover');
    wrapper.find('Target').simulate('click');
    expect(wrapper.childAt(0).text()).toEqual('I am the Popover');
  });
});
