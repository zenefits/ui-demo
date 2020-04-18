import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import { Icon } from '../index';

describe('Icon', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<Icon iconName="check" />)).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithTheme(<Icon iconName="check" p={123} mt={456} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('margin-top', '456px');
  });

  it('should spin', () => {
    const withSpin = mountEnzymeWithTheme(<Icon iconName="compass" spin />);
    expect(withSpin).toHaveStyleRule('animation', /.*spin.*/);
  });
});
