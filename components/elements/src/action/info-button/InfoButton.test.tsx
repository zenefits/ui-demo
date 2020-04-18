import React from 'react';
import 'jest-styled-components';

import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import InfoButton from './InfoButton';

describe('InfoButton', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<InfoButton>Hi</InfoButton>).text()).toEqual('Hi');
  });

  it('should ultimately render a <button> element', () => {
    const rendered = renderEnzymeWithTheme(<InfoButton>Hi</InfoButton>);
    expect(rendered.is('button')).toBe(true);
  });

  it('should support standard button attributes', () => {
    const rendered = renderEnzymeWithTheme(
      <InfoButton id="foo" hidden disabled>
        Hi
      </InfoButton>,
    );
    expect(rendered.attr('id')).toBe('foo');
    expect(rendered.attr('hidden')).toBeTruthy();
    expect(rendered.attr('disabled')).toBeTruthy();
  });

  it('should invoke callback on change', () => {
    const onButtonClick = jest.fn();
    const wrapper = mountEnzymeWithTheme(<InfoButton onClick={onButtonClick}>Hi</InfoButton>);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toBeCalled();
  });

  it('should not trigger onClick when disabled', () => {
    const onButtonClick = jest.fn();
    const wrapper = mountEnzymeWithTheme(
      <InfoButton onClick={onButtonClick} disabled>
        Hi
      </InfoButton>,
    );
    wrapper.find('button').simulate('click');
    expect(onButtonClick).toHaveBeenCalledTimes(0);
  });
});
