import React from 'react';
import { storiesOf } from '@storybook/react';

import { Box } from 'zbase';

import NavBar from './NavBar';

const links = [
  { url: '1url.com', text: 'link1', active: false },
  { url: '2url.com', text: 'link2', active: false },
  { url: '3url.com', text: 'link3', active: false },
  { url: '4url.com', text: 'link4', active: false },
  { url: '5url.com', text: 'link5', active: true },
  { url: '6url.com', text: 'link6', active: false },
];

storiesOf('NavBar', module).add('product and list', () => (
  <Box>
    <Box mr={3}>
      <Box mr={3}>
        <NavBar mode="list">
          {links.map((link, i) => (
            <NavBar.NavLink key={link.url} to={link.url} active={link.active}>
              {link.text}
            </NavBar.NavLink>
          ))}
        </NavBar>
        <NavBar mode="product" bg={'secondary.a'}>
          {links.map((link, i) => (
            <NavBar.NavLink key={link.url} to={link.url} active={link.active}>
              {link.text}
            </NavBar.NavLink>
          ))}
        </NavBar>
      </Box>
      <NavBar mode="side">
        {links.map((link, i) => (
          <NavBar.NavLink key={link.url} to={link.url} active={link.active}>
            {link.text}
          </NavBar.NavLink>
        ))}
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

storiesOf('NavBar', module).add('nested lists', () => (
  <Box>
    <NavBar mode="side" listType="ol">
      <NavBar.NavLink>Tab 1</NavBar.NavLink>
      <NavBar.NavLink>Tab 2</NavBar.NavLink>
      <NavBar mode="side" listType="ol">
        <NavBar.NavLink>Nested Tab 1</NavBar.NavLink>
        <NavBar.NavLink> Nested Tab 2</NavBar.NavLink>
      </NavBar>
      <NavBar.NavLink>Tab 3</NavBar.NavLink>
      <NavBar mode="side" listType="ol">
        <NavBar.NavLink active>Nested Tab 1</NavBar.NavLink>
        <NavBar.NavLink> Nested Tab 2</NavBar.NavLink>
        <NavBar mode="side" listType="ol">
          <NavBar.NavLink>Nested Tab 1</NavBar.NavLink>
          <NavBar.NavLink> Nested Tab 2</NavBar.NavLink>
        </NavBar>
      </NavBar>
      <NavBar.NavLink>Tab 4</NavBar.NavLink>
    </NavBar>
  </Box>
));

storiesOf('NavBar', module).add('lists with icon', () => (
  <Box>
    <NavBar mode="side" listType="ol" includeIcons>
      <NavBar.NavLink completed>Completed Step</NavBar.NavLink>
      <NavBar.NavLink active>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Default Step</NavBar.NavLink>
      <NavBar.NavLink>Disabled Step</NavBar.NavLink>
      <NavBar.NavLink disabled>Disabled Step</NavBar.NavLink>
    </NavBar>
  </Box>
));
