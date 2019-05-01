import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import Popover from './Popover';
import BasePopper from './BasePopper';

describe('Popover', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Popover event="click" targetBody={<h1>I am the target Body</h1>} />)).toHaveLength(1);
  });

  it('should render the targetBody content', () => {
    const wrapper = mountWithTheme(<Popover event="click" targetBody={<h1>I am the target Body</h1>} />).find('Target');
    expect(wrapper.childAt(0).text()).toEqual('I am the target Body');
  });

  it('should render the Popover content', () => {
    const wrapper = mountWithTheme(
      <Popover showPopover targetBody={<span className="target">Target</span>} event="click">
        <h1>I am the Popover</h1>
      </Popover>,
    ).find(BasePopper);

    expect(
      wrapper
        .childAt(0)
        .childAt(1)
        .text(),
    ).toEqual('I am the Popover');
  });
});
