import React from 'react';

import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<Tooltip event="click" targetBody={<h1>Target body</h1>} />)).toHaveLength(1);
  });
});
