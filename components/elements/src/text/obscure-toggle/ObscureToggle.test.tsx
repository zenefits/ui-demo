import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithThemeIntl } from 'z-frontend-theme/test-utils/intl';
import { theme } from 'z-frontend-theme';
import { TextInline } from 'zbase';

import Link from '../../action/link/Link';
import Obscure from '../obscure/Obscure';
import ObscureToggle from './ObscureToggle';

const text = '123456789';
const textObscured = '•'.repeat(text.length);

describe('ObscureToggle', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(wrapper).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountWithThemeIntl(<ObscureToggle fontStyle="paragraphs.xxl" value={text} valueType="ssn" />);
    expect(mounted).toHaveStyleRule('font-size', theme.fontSizes[4] + 'px');
  });

  it('should obscure number of characters based on type', () => {
    const mounted = mountWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(mounted.containsMatchingElement(<span>•••••6789</span>)).toBe(true);
  });

  it('should obscure custom number of characters if type custom', () => {
    const mounted = mountWithThemeIntl(<ObscureToggle value={text} valueType="custom" visibleCount={1} />);
    expect(mounted.containsMatchingElement(<span>••••••••9</span>)).toBe(true);
  });

  it('should include a show link', () => {
    const wrapper = mountWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(wrapper.find(Link).text()).toBe('Show');
  });

  it('should toggle link label on show link click', () => {
    const wrapper = mountWithThemeIntl(<ObscureToggle value={text} valueType="ssn" />);
    expect(wrapper.find(Link).text()).toBe('Show');
    wrapper.find(Link).simulate('click');
    expect(wrapper.find(Link).text()).toBe('Hide');
  });

  it('should reveal all text on show link click', () => {
    const wrapper = mountWithThemeIntl(<ObscureToggle value={text} valueType="custom" visibleCount={0} />);
    expect(wrapper.find(Link).text()).toBe('Show');
    wrapper.find(Link).simulate('click');
    expect(wrapper.containsMatchingElement(<TextInline>{text}</TextInline>)).toBe(true);
    expect(wrapper.find(Link).text()).toBe('Hide');
  });

  it('should obscure text on hide link click', () => {
    const wrapper = mountWithThemeIntl(<ObscureToggle value={text} valueType="custom" visibleCount={0} />);
    wrapper.setState({ isObscured: false });
    wrapper.find(Link).simulate('click');
    expect(wrapper.find(Obscure).text()).toBe(textObscured);
  });
});
