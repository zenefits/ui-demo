import React from 'react';

import { renderWithTheme } from 'z-frontend-theme/test-utils/themeNative';

import { Icon } from './Icon';

describe('Icon component', () => {
  it('should render a Text component with icon as a child', () => {
    const iconRendered = renderWithTheme(<Icon iconName="airplane" s="xlarge" />);
    expect(iconRendered.toJSON()).toMatchSnapshot();
  });
});
