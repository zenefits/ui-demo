import React from 'react';
import 'jest-styled-components';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import { Icon } from '../index';

describe('Icon', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Icon iconName="check-all" />).find(Icon)).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountWithTheme(<Icon iconName="check-all" p={123} mt={456} />);
    expect(mounted).toHaveStyleRule('padding', '123px');
    expect(mounted).toHaveStyleRule('margin-top', '456px');
  });

  it('should spin', () => {
    const withSpin = mountWithTheme(<Icon iconName="compass" spin />);
    expect(withSpin).toHaveStyleRule('animation', /.*spin.*/);
  });
});
