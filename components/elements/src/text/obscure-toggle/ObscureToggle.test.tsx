import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { theme } from 'z-frontend-theme';
import { TextInline } from 'zbase';

import Obscure from '../obscure/Obscure';
import ObscureToggle, { ToggleLink } from './ObscureToggle';

const text = '123456789';
const textObscured = '•'.repeat(text.length);

describe('ObscureToggle', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountEnzymeWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(wrapper).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithThemeIntl(<ObscureToggle fontStyle="paragraphs.xxl" value={text} valueType="ssn" />);
    expect(mounted).toHaveStyleRule('font-size', `${theme.fontSizes[4]}px`);
  });

  it('should obscure number of characters based on type', () => {
    const mounted = mountEnzymeWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(mounted.containsMatchingElement(<span>•••••6789</span>)).toBe(true);
  });

  it('should obscure custom number of characters if type custom', () => {
    const mounted = mountEnzymeWithThemeIntl(<ObscureToggle value={text} valueType="custom" visibleCount={1} />);
    expect(mounted.containsMatchingElement(<span>••••••••9</span>)).toBe(true);
  });

  it('should include a show link', () => {
    const wrapper = mountEnzymeWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(wrapper.find(ToggleLink).text()).toBe('Show');
  });

  it('should toggle link label on show link click', () => {
    const wrapper = mountEnzymeWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(wrapper.find(ToggleLink).text()).toBe('Show');
    wrapper.find(ToggleLink).simulate('click');
    expect(wrapper.find(ToggleLink).text()).toBe('Hide');
  });

  it('should reveal all text on show link click', () => {
    const wrapper = mountEnzymeWithThemeIntl(<ObscureToggle value={text} valueType="custom" visibleCount={0} />);
    expect(wrapper.find(ToggleLink).text()).toBe('Show');
    wrapper.find(ToggleLink).simulate('click');
    expect(wrapper.containsMatchingElement(<TextInline>{text}</TextInline>)).toBe(true);
    expect(wrapper.find(ToggleLink).text()).toBe('Hide');
  });

  it('should obscure text on hide link click', () => {
    const wrapper = mountEnzymeWithThemeIntl(<ObscureToggle value={text} valueType="custom" visibleCount={0} />);
    wrapper.setState({ isObscured: false });
    wrapper.find(ToggleLink).simulate('click');
    expect(wrapper.find(Obscure).text()).toBe(textObscured);
  });
});
