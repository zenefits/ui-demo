import React from 'react';

import { cleanup, render } from '@testing-library/react';

import { ThemeProvider } from 'z-frontend-theme';

import Banner from './Banner';

describe('Banner', () => {
  afterEach(() => {
    cleanup();
  });

  it('should shallow render without throwing an error', () => {
    const { container } = render(
      <ThemeProvider>
        <Banner type="info">Info!</Banner>
      </ThemeProvider>,
    );
    expect(container.textContent.trim()).toBe('Info!');
  });
});
