import React from 'react';
import 'jest-styled-components';

import 'z-frontend-jest/modified-jest-styled-components';
import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import NavBar from './NavBar';

describe('NavBar', () => {
  it('should mount without throwing an error', () => {
    const wrapper = mountEnzymeWithTheme(
      <NavBar>
        <NavBar.NavLink> Step 1 </NavBar.NavLink>
      </NavBar>,
    );
    expect(wrapper).toHaveLength(1);
  });

  it('should respect util props', () => {
    const mounted = mountEnzymeWithTheme(
      <NavBar mt={123}>
        <NavBar.NavLink> Step 1 </NavBar.NavLink>
      </NavBar>,
    );
    expect(mounted).toHaveStyleRule('margin-top', '123px');
  });
});
