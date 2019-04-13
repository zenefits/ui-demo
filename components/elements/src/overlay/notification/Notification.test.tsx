import React from 'react';
import 'jest-styled-components';

import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';

import Notification from './Notification';

// NOTE: wrapped component tests: https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/Snackbar/Snackbar.test.js

describe('Notification', () => {
  it('should mount without throwing an error', () => {
    const mounted = mountWithTheme(<Notification open={false}>Task assigned.</Notification>);
    expect(mounted).toHaveLength(1);
  });
});
