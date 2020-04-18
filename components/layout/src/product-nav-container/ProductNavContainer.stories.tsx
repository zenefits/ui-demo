import React from 'react';

import ProductNavContainer from './ProductNavContainer';
import NavBar from '../nav-bar/NavBar';
import { storiesOf } from '../../.storybook/storyHelpers';

storiesOf('layout|ProductNavContainer', module).add('default', () => (
  <ProductNavContainer>
    <NavBar mode="product">
      <NavBar.RouterNavLink to="/overview" active /* force active for visual testing */>
        Overview
      </NavBar.RouterNavLink>
      <NavBar.RouterNavLink to="/benefits">Benefits</NavBar.RouterNavLink>
      <NavBar.RouterNavLink to="/profile">Company</NavBar.RouterNavLink>
      <NavBar.RouterNavLink to="/employees">Employees</NavBar.RouterNavLink>
    </NavBar>
  </ProductNavContainer>
));
