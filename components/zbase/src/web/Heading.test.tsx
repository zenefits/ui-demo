import React from 'react';
import { mountWithTheme, renderWithTheme } from 'z-frontend-theme/test-utils/theme';
import { Heading } from './index';

describe('Heading', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Heading level={2}>Heading</Heading>).text()).toBe('Heading');
    const rendered = renderWithTheme(<Heading level={4}>foo</Heading>);
    expect(rendered.is('h4')).toBe(true);
  });
});
