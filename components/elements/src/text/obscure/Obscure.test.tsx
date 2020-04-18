import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme, renderEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';
import { theme } from 'z-frontend-theme';

import Obscure from './Obscure';

const text = '123456789';
const textObscured = '•'.repeat(text.length);

describe('Obscure', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountEnzymeWithTheme(<Obscure value={text} />);
    expect(wrapper).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithTheme(<Obscure value={text} fontStyle="paragraphs.xxl" />);
    expect(mounted).toHaveStyleRule('font-size', `${theme.fontSizes[4]}px`);
  });

  it('should obscure all text by default', () => {
    const rendered = renderEnzymeWithTheme(<Obscure value={text} />);
    expect(rendered.text()).toBe(textObscured);
  });

  describe('visibleCount', () => {
    it('reveals as expected', () => {
      const rendered = renderEnzymeWithTheme(<Obscure value={text} visibleCount={2} />);
      expect(rendered.text()).toBe('•••••••89');
    });

    it('will only reveal up to half of value', () => {
      const rendered = renderEnzymeWithTheme(<Obscure value={text} visibleCount={text.length * 10} />);
      expect(rendered.text()).toBe('•••••6789');
    });

    it('handles invalid visibleCount', () => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      const rendered = renderEnzymeWithTheme(<Obscure value={text} visibleCount={-1} />);
      expect(rendered.text()).toBe(textObscured);
      expect(console.error).toHaveBeenCalled();
    });
  });
});
