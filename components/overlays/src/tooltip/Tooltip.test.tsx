import React from 'react';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Tooltip event="click" targetBody={<h1>Target body</h1>} />)).toHaveLength(1);
  });
});
