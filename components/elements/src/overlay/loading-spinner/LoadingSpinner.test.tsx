import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<LoadingSpinner />)).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountWithTheme(<LoadingSpinner p={123} mt={456} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('margin-top', '456px');
  });

  it('should default to 100% height', () => {
    const mounted = mountWithTheme(<LoadingSpinner />);
    expect(mounted).toHaveStyleRule('height', '100%');
  });

  it('should vary size according to `s` prop', () => {
    const small = mountWithTheme(<LoadingSpinner s="small" />);
    const large = mountWithTheme(<LoadingSpinner s="large" />);
    const smallHeight = /^3\dpx/;
    const largeHeight = /^4\dpx/;
    expect(small).toHaveStyleRule('height', smallHeight);
    expect(large).toHaveStyleRule('height', largeHeight);
  });
});
