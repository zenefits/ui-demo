import React from 'react';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import Button from './Button';

describe('Button', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Button>Hi</Button>).text()).toEqual('Hi');
  });

  it('should show spinner and hide the text when inProgress is true', () => {
    const wrapper = mountWithTheme(<Button inProgress>Hi</Button>);
    expect(wrapper.text()).toEqual('Hi');
    const children = wrapper.find('button').find('p');
    expect(children).toHaveLength(1);
    expect(children.props()).toHaveProperty('hide', true);

    const icon = wrapper.find('button').find('span');
    expect(icon).toHaveLength(1);
    expect(icon.props()).toHaveProperty('spin', true);
    expect(icon.props()).toHaveProperty('icon', 'spinner');
    expect(icon.props()).toHaveProperty('hide', false);
  });

  it('should be disabled when inProgress is true', () => {
    expect(renderWithTheme(<Button inProgress>Hi</Button>).attr('disabled')).toBeTruthy();
  });

  it('should invoke callback on change', () => {
    const onButtonClick = jest.fn();
    const wrapper = mountWithTheme(<Button onClick={onButtonClick}>Hi</Button>);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toBeCalled();
  });

  it('should not trigger onClick when disabled', () => {
    const onButtonClick = jest.fn();
    const wrapper = mountWithTheme(
      <Button onClick={onButtonClick} disabled>
        Hi
      </Button>,
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toHaveBeenCalledTimes(0);
  });
});
