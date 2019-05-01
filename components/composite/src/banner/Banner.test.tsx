import React from 'react';

import { renderWithTheme } from 'z-frontend-theme/test-utils/theme';

import Banner from './Banner';

describe('Banner', () => {
  it('should shallow render without throwing an error', () => {
    expect(renderWithTheme(<Banner type="info">Info!</Banner>).text()).toBe('Info!');
  });
});
