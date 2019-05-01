import React from 'react';

import { Box } from 'zbase';

import { storiesOf } from '../../.storybook/storyHelpers';
import NavBar from './NavBar';
import ExampleList from './exampleList';

const links = [
  { url: '1url.com', text: 'link1', active: false },
  { url: '2url.com', text: 'link2', active: false },
  { url: '3url.com', text: 'link3', active: true },
  { url: '4url.com', text: 'link4', active: false },
];

storiesOf('layout|NavBar', module)
  .add('list', ExampleList)
  .add('side', () => (
    <NavBar mode="side">
      {links.map((link, i) => (
        <NavBar.RouterNavLink key={link.url} to={link.url} active={link.active}>
          {link.text}
        </NavBar.RouterNavLink>
      ))}
    </NavBar>
  ))
  .add('product', () => (
    <NavBar mode="product">
      {links.map((link, i) => (
        <NavBar.RouterNavLink key={link.url} to={link.url} active={link.active}>
          {link.text}
        </NavBar.RouterNavLink>
      ))}
    </NavBar>
  ))
  .add('nested lists', () => (
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
  ))
  .add('lists with icon', () => (
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
        <NavBar.NavLink disabled>Disabled Step</NavBar.NavLink>
      </NavBar>
    </Box>
  ));
