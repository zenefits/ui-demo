import React from 'react';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Tooltip event="click" />).find('Tooltip')).toHaveLength(1);
  });
});
