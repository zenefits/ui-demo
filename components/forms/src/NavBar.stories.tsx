import React from 'react';
import { Box } from 'rebass';
import { storiesOf } from '@storybook/react';
import NavBar from './NavBar';
storiesOf('NavBar', module).add('product and list', () => (
  <Box>
    <Box mr={3}>
      <NavBar mode="link">
        <NavBar.NavLink active>Tab 1</NavBar.NavLink>
        <NavBar.NavLink>Tab 2</NavBar.NavLink>
        <NavBar.NavLink>Tab 3</NavBar.NavLink>
      </NavBar>
      <NavBar mode="product" bg={'#123466'}>
        <NavBar.NavLink active>Tab 1</NavBar.NavLink>
        <NavBar.NavLink>Tab 2</NavBar.NavLink>
        <NavBar.NavLink>Tab 3</NavBar.NavLink>
      </NavBar>
    </Box>
    <Box>
      <p>To Link to a react-router RouterNavLink:</p>
      <pre>
        {`<NavBar mode="product">
  <NavBar.RouterNavLink to={\`/some/\${id}\`}>Go to some route</NavBar.RouteNavLink>
</NavBar>`}
      </pre>
    </Box>
  </Box>
));
